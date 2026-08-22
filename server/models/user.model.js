const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        displayName: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
        },
        contactType: {
            type: String,
            enum: ["email", "phone"],
        },
        contactValue: {
            type: String,
            trim: true,
        },
        phonePrefix: {
            type: String,
            trim: true,
        },
        gender: {
            type: String,
            enum: ["male", "female", "prefer-not-to-say"],
        },
        dateOfBirth: {
            type: Date,
        },
        passwordHash: {
            type: String,
            select: false,
        },
        role: {
            type: String,
            enum: ["parent", "teacher"],
            required: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
