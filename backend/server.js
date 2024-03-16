import express, { response } from "express";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";
import { User } from "./models/userModel.js";

const app = express();

app.use(express.json());

app.get("/", (request, response) => {
    console.log(request);
    return response.status(234).send("Welcome to the backend");
});

app.post("/createUser", async (request, response) => {
    try {

        if( !request.body.first || !request.body.last || !request.body.password || !request.body.email ) {
            return response.status(400).send({
                message: "Send all required fields: First, Last, Password, Email"
            });
        }

        const newUser = {
            first: request.body.first,
            last: request.body.last,
            password: request.body.password,
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

app.delete("/deleteUsers/:email/:password", async (request, response) => {
    try {
        const result = await User.deleteOne({ email: request.params.email, password: request.params.password });
        console.log(result);

        if(result.deletedCount === 0) {
            return response.status(404).send({message: "User was not found "});
        }
        return response.status(200).send({message: "User was successfully deleted "});
    }
    catch (error) {
        console.log(error);
        return response.status(500).send({ message: error.message });
    }
});

app.get("/getFavorites/:email/:password", async (request, response) => {
    try {
        const user = await User.find({ email: request.params.email, password: request.params.password }).select("favorites");
        
        if(user.length === 0) {
            return response.status(404).send("User not found");
        }
        
        return response.status(200).send(user[0].favorites);
    }
    catch (error) {
        console.log({message: error});
        return response.status(500).send({ message: error.message });
    }
});

app.put("/addFavorite/:email/:password", async (request, response) => {
    try {
        if( !request.body.favorites) {
            return response.status(400).send({
                message: "Send all required fields: favorite"
            });
        }

        const result = await User.findOneAndUpdate({ email: request.params.email,password: request.params.password },
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