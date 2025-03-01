const express = require("express");
require("dotenv").config(); // Load environment variables
const path = require("path");
const bcrypt = require("bcrypt");
const collection = require("./config");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set EJS as the view engine
app.set("view engine", "ejs");

// Serve static files
app.use(express.static("public"));

// Routes
app.get("/", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

// ✅ Fix: Use "/signup" to match the form action
app.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    // ✅ Fix: Check if user already exists
    const existingUser = await collection.findOne({ name: username });
    if (existingUser) {
      return res.send("❌ User already exists! Try a different name.");
    }

    // ✅ Fix: Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await collection.create({
      name: username,
      password: hashedPassword,
    });

    console.log("✅ User created:", newUser);
    res.send("🎉 Signup successful! You can now log in.");
  } catch (error) {
    console.error("❌ Error inserting data:", error);
    res.status(500).send("❌ Internal Server Error");
  }
});

//login user
app.post("/login" ,async(req,res)=> {
    try{
        const check = await collection.findOne({name:req.body.username});
        if (!check) {
            res.send("user name cannot found");
        }

        //compare the hash password from the data base with the plain text
        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if(isPasswordMatch) {
            res.render("home");
        } else {
            req.send("wrong password")
        }
    } catch {
        res.send("Wrong Details")
    }
})


// Start Server
const port = 3000;
app.listen(port, () => {
  console.log(`🚀 Server running on Port: ${port}`);
});


