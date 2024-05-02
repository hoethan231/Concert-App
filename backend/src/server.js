import express, { response } from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import cors from "cors";
import cookieParser from "cookie-parser";
import { PORT, mongoDBURL } from "./config.js";
import { createTokens, validateToken } from "./JWT.js";
import { User } from "./models/userModel.js";

const app = express();

app.use(express.json());
app.use(cors({credentials: true, origin: true, withCredentials: true }));
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.get("/", (request, response) => {
    console.log(request);
    return response.status(234).send("Welcome to the backend");
});

app.post("/login", async (request, response) => {
    try {

        const { email, password } = request.body;

        if(!email || !password) {
            return response.status(400).send({
                message: "Send all required fields: Email & Password"
            });
        }

        const user = await User.findOne({ email: email });
        
        if(!user) {
            return response.status(400).send({ message: "User not found" });
        }

        bcrypt.compare(password, user.password).then((match) => {
            if(!match) {
                return response.status(400).send({ message: "Incorrect Password"});
            }

            const accessToken = createTokens(user);
            return response.status(200).cookie("access-token", accessToken, { maxAge: 18000000 }).send({ message: "Logged in"});

        });

    }
    catch (error){
        return response.status(500).send({ message: error.message });
    }
});

app.get("/logout", async (request, response) => {
    try {
        return response
                .clearCookie("access-token", { httpOnly: true })
                .status(200)
                .send({ message: "User logged out successfully" });
    }
    catch (error) {
        return response.status(500).send({ message: error.message });
    }
});

app.post("/createUser", async (request, response) => {
    try {

        if( !request.body.first || !request.body.last || !request.body.password || !request.body.email ) {
            return response.status(400).send({
                message: "Send all required fields: First, Last, Password, Email"
            });
        }

        const hashedPass = await bcrypt.hash(request.body.password, 10);

        const newUser = {
            first: request.body.first,
            last: request.body.last,
            password: hashedPass,
            email: request.body.email,
            favorites: []
        }

        const user = await User.create(newUser);
        return response.status(200).send({ message: `${newUser.first} is now a user ` });

    } 
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


app.get("/getAllUsers", async (request, response) => {
    try {
        const users = await User.find({});
        return response.status(200).json(users);
    } catch (error) {
        console.log(error);
        return response.status(500).send({ message: error.message });
    }
});

app.delete("/deleteUsers", validateToken, async (request, response) => {
    try {

        const result = await User.findByIdAndDelete(request.userID);

        if(!result) {
            return response.status(404).send({message: "User was not found "});
        }
        return response.status(200).send({message: "User was successfully deleted "});
    }
    catch (error) {
        console.log(error);
        return response.status(500).send({ message: error.message });
    }
});

app.get("/getUser", validateToken, async (request, response) => {
    try {
        const user = await User.findOne({ _id: request.userID });
        
        if(user.length === 0) {
            return response.status(404).send("User not found");
        }

        return response.status(200).send(user);

    }
    catch (error) {
        console.log({message: error});
        return response.status(500).send({ message: error.message });
    }
});

app.put("/addFavorite", validateToken, async (request, response) => {
    try {
        if(!request.body.favorites) {
            return response.status(400).send({
                message: "Send all required fields: favorite"
            });
        }

        const result = await User.findByIdAndUpdate( request.userID,
                                                    { $addToSet: {favorites: request.body.favorites} },
                                                    { new: true });

        return response.status(200).send({ message: "Concert has been added"});
    }
    catch (error) {
        console.log(error);
        return response.status(500).send({ message: error });
    }
});

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("Connection was successful");
        app.listen(PORT, () => {
            console.log(`Server is listening on port: ${PORT}`)
        });
    })
    .catch((error) => {
        console.log(error);
    });