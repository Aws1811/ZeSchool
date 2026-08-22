const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

function publicUser(user) {
    return {
        id: user._id.toString(),
        name: user.displayName,
        email: user.email,
        role: user.role,
    };
}

function readCredentials(body) {
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const password = typeof body.password === "string" ? body.password : "";

    if (!email || !password) {
        const error = new Error("Email and password are required");
        error.statusCode = 400;
        throw error;
    }

    return { email, password };
}

async function registerParent(req, res, next) {
    try {
        const { email, password } = readCredentials(req.body);
        const displayName = typeof req.body.displayName === "string" ? req.body.displayName.trim() : "";

        if (!displayName) {
            return res.status(400).json({ message: "Parent name is required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "An account with this email already exists" });
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const user = await User.create({
            displayName,
            email,
            passwordHash,
            role: "parent",
        });

        return res.status(201).json({ user: publicUser(user) });
    } catch (error) {
        return next(error);
    }
}

async function login(req, res, next) {
    try {
        const { email, password } = readCredentials(req.body);
        const user = await User.findOne({ email, isActive: true }).select("+passwordHash");

        if (!user || !user.passwordHash || !(await bcrypt.compare(password, user.passwordHash))) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        return res.json({ user: publicUser(user) });
    } catch (error) {
        return next(error);
    }
}

module.exports = { registerParent, login };
