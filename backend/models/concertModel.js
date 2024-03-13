import mongoose from "mongoose";

export const concertSchema = mongoose.Schema(
    {
        concert: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true
    }
);