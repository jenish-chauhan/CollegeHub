require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const bcrypt = require("bcrypt");

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// Session Configuration
app.use(
  session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: true,
  })
);

// Dummy User Data (Replace with Database Later)
const users = [];

// Routes
app.get("/", (req, res) => {
  res.render("login", { error: "" });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((user) => user.username === username);

  if (user && (await bcrypt.compare(password, user.password))) {
    req.session.user = user;
    return res.redirect("/dashboard");
  }

  res.render("login", { error: "Invalid username or password" });
});

app.get("/register", (req, res) => {
  res.render("register", { error: "" });
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const existingUser = users.find((user) => user.username === username);

  if (existingUser) {
    return res.render("register", { error: "Username already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });

  res.redirect("/");
});

app.get("/dashboard", (req, res) => {
  if (!req.session.user) return res.redirect("/");
  res.render("dashboard", { username: req.session.user.username });
});

app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
