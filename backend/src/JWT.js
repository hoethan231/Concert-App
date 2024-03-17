import jwt from "jsonwebtoken";
import { JWTSecret } from "./config.js"

export const createTokens = (user) => {
    const accessToken = jwt.sign({ id: user.id }, JWTSecret);
    return accessToken;
}

export const validateToken = (request, response, next) => {
    const accessToken = request.cookies["access-token"];
    if (!accessToken) {
        return response.status(400).send({ error: "User is not authenticated" });
    }

    try {
        const decoded = jwt.verify(accessToken, JWTSecret);
        request.userID = decoded.id;
        next();
    } catch (error) {
        return response.status(400).send({ error: "Failed to authenticate" });
    }
};
