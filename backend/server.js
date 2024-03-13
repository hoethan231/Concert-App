import express, { response } from "express";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";
import { User } from "./models/userModel.js";

const app = express();

app.use(express.json());

app.get("/", (request, response) => {
    console.log(request);
    return response.status(234).send("Welcome to the backend")
})

app.post("/createUser", async (request, response) => {
    try {

        if( !request.body.user || !request.body.password ) {
            return response.status(400).send({
                message: "Send all required fields: User & Password"
            });
        }

        const newUser = {
            user: request.body.user,
            password: request.body.password,
            email: request.body.email,
            favorites: []
        }

        const user = await User.create(newUser);
        return response.status(200).send({ message: `${newUser.user} is now a user ` });

    } 
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

app.get("/getAllUsers", async (request, response) => {
    try {
        const users = await User.find({}).select("-__v"); // Exclude the __v field
        return response.status(200).json(users);
    } catch (error) {
        console.log(error);
        return response.status(500).send({ message: error.message });
    }
});


app.get("/getFavorites/:user/:password", async (request, response) => {
    try {
        try {
            const users = await User.find({ user: request.params.user, password: request.params.password }).select("favorites");
            
            if(users.length === 0) {
                return response.status(404).send("User not found");
            }
            
            return response.status(200).send(users[0].favorites);
        }
        catch (error) {
            return response.status(500).send({ message: error.message });
        }

    }
    catch (error) {
        console.log({message: error});
    }
})

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