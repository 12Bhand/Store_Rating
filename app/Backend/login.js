const express = require("express")
const router = express.Router()
const db = require("./db") // Import the database connection

// Test route for auth endpoint
router.get("/", (req, res) => {
  res.json({ message: "Auth endpoint is working! Use POST to login." })
})

router.post("/", (req, res) => {
  console.log("Login attempt:", req.body) // Debug log

  const { email, password } = req.body

  // Validate input
  if (!email || !password) {
    return res.status(400).json({
      error: "Email and password are required",
    })
  }

  // Query the database for the user
  const query = "SELECT * FROM users WHERE email = ? AND password = ?"

  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error("Database error:", err)
      return res.status(500).json({
        error: "Internal server error",
      })
    }

    console.log("Query results:", results) // Debug log

    // Check if user exists
    if (results.length > 0) {
      const user = results[0]

      // Login successful
      res.status(200).json({
        message: "Login successful",
        redirectUrl: "/dashboard",
        user: {
          id: user.id,
          email: user.email,
          role: user.role || "user", // Default role if not specified
        },
      })
    } else {
      // Invalid credentials
      res.status(400).json({
        error: "Invalid credentials",
      })
    }
  })
})

module.exports = router