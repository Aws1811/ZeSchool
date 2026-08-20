const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Student name is required"],
            minlength: [2, "Student name must be at least 2 characters"]
        },

        parentIds: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],

        teacherIds: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],

        className: {
            type: String,
            default: ""
        },

        usesBus: {
            type: Boolean,
            default: false
        },

        busId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Bus",
            default: null
        }
    },
    { timestamps: true }
);

const Student = mongoose.model("Student", StudentSchema);

module.exports = Student;