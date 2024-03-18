import mongoose from "mongoose"

const userSchema = mongoose.Schema(
    {
        first: {
            type: String,
            required: true
        },
        last: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        favorites: {
            type: [String],
            required: false
        }
    },
    {
        timestamps: true
    }
);

export const User = mongoose.model("User", userSchema);