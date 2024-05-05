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
        favorites: [{
            name: String,
            id: String,
            imageUrl: String,
            localDate: String,
            localTime: String,
            venueName: String
        }]
    },
    {
        timestamps: true
    }
);

export const User = mongoose.model("User", userSchema);