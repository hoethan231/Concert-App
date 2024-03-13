import mongoose from "mongoose"
import { concertSchema } from "./concertModel.js"

const userSchema = mongoose.Schema(
    {
        user: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: false
        },
        favorites: {
            type: [concertSchema],
            required: false
        }
    },
    {
        timestamps: true
    }
);

export const User = mongoose.model("User", { userSchema });