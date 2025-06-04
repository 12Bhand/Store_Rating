const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const port = 3003; // Ensure this matches your frontend's fetch request

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cors());

// Create a MySQL connection pool
const db = mysql.createPool({
  host: "localhost", 
  user: "root", 
  password: "admin", 
  database: "users", 
});

// Function to handle SQL queries
const query = (sql, params) => {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

// Register API endpoint
app.put("/api/register", async (req, res) => {
  const { name, email, password, confirmPassword, address } = req.body;

  // Simple validation for required fields
  if (!name || !email || !password || !confirmPassword || !address) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  // Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Passwords do not match",
    });
  }

  // Check if the email already exists in the database
  try {
    const existingUser = await query("SELECT * FROM users WHERE email = ?", [email]);

    if (existingUser.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Email already in use",
      });
    }

    // Insert the new user into the database
    const hashedPassword = password; // Ideally, hash the password before storing it
    await query("INSERT INTO users (name, email, password, address) VALUES (?, ?, ?, ?)", [
      name,
      email,
      hashedPassword,
      address,
    ]);

    // Respond with success
    res.status(200).json({
      success: true,
      message: "User registered successfully!",
    });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({
      success: false,
      message: "There was an error registering the user.",
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
