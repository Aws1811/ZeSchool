const mongoose = require("mongoose");

const parentChildLinkSchema = new mongoose.Schema(
    {
        parentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        childId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Child",
            required: true,
        },
        relationship: {
            type: String,
            default: "parent",
            trim: true,
        },
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active",
        },
    },
    { timestamps: true },
);

const teacherAssignmentSchema = new mongoose.Schema(
    {
        teacherId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        childId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Child",
            required: true,
        },
        subject: {
            type: String,
            required: true,
            trim: true,
        },
        className: {
            type: String,
            trim: true,
        },
        academicYear: {
            type: String,
            trim: true,
        },
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active",
        },
    },
    { timestamps: true },
);

parentChildLinkSchema.index({ parentId: 1, childId: 1 }, { unique: true });
teacherAssignmentSchema.index({ teacherId: 1, childId: 1 }, { unique: true });

const ParentChildLink = mongoose.model("ParentChildLink", parentChildLinkSchema);
const TeacherAssignment = mongoose.model("TeacherAssignment", teacherAssignmentSchema);

module.exports = { ParentChildLink, TeacherAssignment };
