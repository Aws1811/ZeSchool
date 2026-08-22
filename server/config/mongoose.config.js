const mongoose = require("mongoose");
require("dotenv").config();

async function connectDatabase() {
    if (!process.env.URI) {
        throw new Error("URI is required in server/.env");
    }

    await mongoose.connect(process.env.URI, {
        dbName: process.env.DB || undefined,
    });

    console.log(`Connected to MongoDB database: ${mongoose.connection.name}`);
}

module.exports = { connectDatabase };
