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

function getText(value) {
    return typeof value === "string" ? value.trim() : "";
}

function normalizeContact(contactType, contactValue, phonePrefix = "+970") {
    if (contactType === "email") {
        return {
            email: contactValue.toLowerCase(),
            contactValue: contactValue.toLowerCase(),
        };
    }

    const digits = contactValue.replace(/\D/g, "");
    const normalizedPhone = `${phonePrefix}${digits.replace(/^0/, "")}`;
    return {
        email: normalizedPhone,
        contactValue: normalizedPhone,
    };
}

function normalizeLoginIdentifier(value) {
    const identifier = getText(value).toLowerCase();
    if (!identifier || identifier.includes("@")) return identifier;

    const digits = identifier.replace(/\D/g, "");
    return identifier.startsWith("+") ? `+${digits}` : `+970${digits.replace(/^0/, "")}`;
}

function readCredentials(body) {
    const identifier = normalizeLoginIdentifier(body.email || body.loginIdentifier);
    const password = typeof body.password === "string" ? body.password : body.loginPassword;

    if (!identifier || typeof password !== "string" || !password) {
        const error = new Error("Email or phone number and password are required");
        error.statusCode = 400;
        throw error;
    }

    return { identifier, password };
}

function readParentRegistration(body) {
    const displayName = getText(body.displayName || body.parentName);
    const contactType = getText(body.contactType) || "email";
    const contactValue = getText(body.contactValue || body.email);
    const phonePrefix = getText(body.phonePrefix) || "+970";
    const gender = getText(body.gender);
    const dateOfBirth = getText(body.dateOfBirth);
    const password = typeof body.password === "string" ? body.password : "";

    if (displayName.length < 2) {
        const error = new Error("Parent name must be at least 2 characters");
        error.statusCode = 400;
        throw error;
    }
    if (!["email", "phone"].includes(contactType)) {
        const error = new Error("Contact method is invalid");
        error.statusCode = 400;
        throw error;
    }
    if (contactType === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactValue)) {
        const error = new Error("Enter a valid email address");
        error.statusCode = 400;
        throw error;
    }
    if (contactType === "phone" && !/^[0-9\s]{7,}$/.test(contactValue)) {
        const error = new Error("Enter a valid phone number");
        error.statusCode = 400;
        throw error;
    }
    if (!["male", "female", "prefer-not-to-say"].includes(gender)) {
        const error = new Error("Gender is required");
        error.statusCode = 400;
        throw error;
    }
    if (!dateOfBirth || Number.isNaN(new Date(dateOfBirth).getTime())) {
        const error = new Error("Date of birth is required");
        error.statusCode = 400;
        throw error;
    }
    if (password.length < 6) {
        const error = new Error("Password must be at least 6 characters");
        error.statusCode = 400;
        throw error;
    }

    return {
        displayName,
        contactType,
        contactValue,
        phonePrefix,
        gender,
        dateOfBirth: new Date(dateOfBirth),
        password,
    };
}

async function registerParent(req, res, next) {
    try {
        const registration = readParentRegistration(req.body);
        const contact = normalizeContact(registration.contactType, registration.contactValue, registration.phonePrefix);
        const existingUser = await User.findOne({ $or: [{ email: contact.email }, { contactValue: contact.contactValue }] });

        if (existingUser) {
            return res.status(409).json({ message: "An account with this contact already exists" });
        }

        const passwordHash = await bcrypt.hash(registration.password, 10);
        const user = await User.create({
            displayName: registration.displayName,
            email: contact.email,
            contactType: registration.contactType,
            contactValue: contact.contactValue,
            phonePrefix: registration.phonePrefix,
            gender: registration.gender,
            dateOfBirth: registration.dateOfBirth,
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
        const { identifier, password } = readCredentials(req.body);
        const user = await User.findOne({
            isActive: true,
            $or: [{ email: identifier }, { contactValue: identifier }],
        }).select("+passwordHash");

        if (!user || !user.passwordHash || !(await bcrypt.compare(password, user.passwordHash))) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        return res.json({ user: publicUser(user) });
    } catch (error) {
        return next(error);
    }
}

module.exports = { registerParent, login };
