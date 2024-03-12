import express from "express";
import { PORT } from "./config.js";

const app = express();

app.get("/", (request, response) => {
    console.log(request);
    return response.status(234).send("Welcome to the backend")
})

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`)
})