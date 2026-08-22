const mongoose = require("mongoose");
require("dotenv").config();

async function connectDatabase() {
    const uri = process.env.URI || process.env.MONGODB_URI;

    if (!uri) {
        throw new Error("URI is required in server/.env");
    }

    await mongoose.connect(uri, {
        dbName: process.env.DB || undefined,
    });

    console.log(`Connected to MongoDB database: ${mongoose.connection.name}`);
}

module.exports = { connectDatabase };
