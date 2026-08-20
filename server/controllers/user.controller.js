const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const Student = require("../models/student.model");

const registerUser = async (req, res) => {
    try {
        const {
            role,
            parentName,
            teacherName,
            contactType,
            contactValue,
            phonePrefix,
            gender,
            dateOfBirth,
            password,
            confirmPassword,
            children
        } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({
                message: "Passwords do not match"
            });
        }

        const name = role === "teacher" ? teacherName : parentName;

        let finalContactValue = contactValue;

        if (contactType === "email") {
            finalContactValue = contactValue.toLowerCase().trim();
        }

        if (contactType === "phone") {
            finalContactValue =
                phonePrefix + contactValue.replace(/\s/g, "");
        }

        const existingUser = await User.findOne({
            contactValue: finalContactValue
        });

        if (existingUser) {
            return res.status(400).json({
                message: "This email or phone number is already registered"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            role,
            contactType,
            contactValue: finalContactValue,
            phonePrefix,
            gender,
            dateOfBirth,
            password: hashedPassword
        });

        let createdChildren = [];

        if (role === "parent" && children && children.length > 0) {
            createdChildren = await Promise.all(
                children.map((child) =>
                    Student.create({
                        name: child.name,
                        parentIds: [user._id],
                        usesBus: child.usesBus === "yes"
                    })
                )
            );
        }

        res.status(201).json({
            message: "Account created successfully",
            user: {
                _id: user._id,
                name: user.name,
                role: user.role,
                contactType: user.contactType,
                contactValue: user.contactValue
            },
            children: createdChildren
        });
    } catch (error) {
        res.status(400).json(error);
    }
};

const loginUser = async (req, res) => {
    try {
        const { loginIdentifier, loginPassword } = req.body;

        const identifier = loginIdentifier.toLowerCase().trim();

        const user = await User.findOne({
            contactValue: identifier
        });

        if (!user) {
            return res.status(400).json({
                message: "Invalid email, phone number, or password"
            });
        }

        const correctPassword = await bcrypt.compare(
            loginPassword,
            user.password
        );

        if (!correctPassword) {
            return res.status(400).json({
                message: "Invalid email, phone number, or password"
            });
        }

        let children = [];

        if (user.role === "parent") {
            children = await Student.find({
                parentIds: user._id
            });
        }

        res.json({
            message: "Login successful",
            user: {
                _id: user._id,
                name: user.name,
                role: user.role,
                contactType: user.contactType,
                contactValue: user.contactValue
            },
            children
        });
    } catch (error) {
        res.status(400).json(error);
    }
};

module.exports = {
    registerUser,
    loginUser
};