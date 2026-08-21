const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            minlength: [2, "Name must be at least 2 characters"]
        },

        role: {
            type: String,
            required: [true, "Role is required"],
            enum: ["parent", "teacher"]
        },

        contactType: {
            type: String,
            required: [true, "Contact type is required"],
            enum: ["email", "phone"]
        },

        contactValue: {
            type: String,
            required: [true, "Email or phone number is required"],
            unique: true
        },

        phonePrefix: {
            type: String,
            default: "+970"
        },

        gender: {
            type: String,
            required: [true, "Gender is required"],
            enum: ["male", "female", "prefer-not-to-say"]
        },

        dateOfBirth: {
            type: Date,
            required: [true, "Date of birth is required"]
        },

        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Password must be at least 6 characters"]
        }
    },
    { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;