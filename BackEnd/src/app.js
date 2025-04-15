const express = require("express");
const aiRoutes = require("./routes/ai.routes");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/audio", express.static(path.join(__dirname, "public/audio")));

app.use(express.static(path.join(__dirname, "../public"))); // Serve static files


app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use("/ai", aiRoutes);

module.exports = app;
