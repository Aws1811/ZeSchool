const mongoose = require("mongoose");

const childSchema = new mongoose.Schema(
    {
        displayName: {
            type: String,
            required: true,
            trim: true,
        },
        dateOfBirth: Date,
        schoolId: {
            type: String,
            trim: true,
        },
        gradeLevel: {
            type: String,
            trim: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model("Child", childSchema);
