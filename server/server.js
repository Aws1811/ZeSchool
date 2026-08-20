const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectToDatabase = require("./config/mongoose.config");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectToDatabase();

require("./routes/user.routes")(app);

app.get("/", (req, res) => {
    res.json({ message: "ZeSchool server is running" });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});