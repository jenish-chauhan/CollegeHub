const express = require("express");
const mongoose = require("mongoose");
const College = require("./models/list"); // Ensure this matches your model filename

const app = express();
const PORT = 8080;

// Database Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/collegehub")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Middleware
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Routes
app.get("/colleges", async (req, res) => {
  try {
    const clg = await College.find({}); // Fetch all documents from the 'lists' collection
    res.render("index", { clg }); // Pass the retrieved colleges to the view
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
