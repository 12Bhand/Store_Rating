const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const authRouter = require("./login") // Import the authentication routes

const app = express()

// Enhanced CORS configuration
app.use(
  cors({
    origin: "*", // Allow all origins for testing
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
)

// Middleware
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))

// Log all incoming requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`)
  next()
})

// Test route to verify server is running
app.get("/", (req, res) => {
  res.json({ message: "Server is running!" })
})

// Test route for API
app.get("/api", (req, res) => {
  res.json({ message: "API is working!" })
})

// Authentication routes
app.use("/api/auth", authRouter)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Server error:", err.stack)
  res.status(500).json({ error: "Something went wrong!" })
})

// 404 handler
app.use("*", (req, res) => {
  console.log(`Route not found: ${req.originalUrl}`)
  res.status(404).json({ error: `Route ${req.originalUrl} not found` })
})

const PORT = process.env.PORT || 3001 // Changed to 3001 to avoid conflict with Next.js
app.listen(PORT, () => {
  console.log(`
  ======================================
  🚀 Server running on http://localhost:${PORT}
  ======================================
  Test endpoints:
  - http://localhost:${PORT}
  - http://localhost:${PORT}/api
  - http://localhost:${PORT}/api/auth
  ======================================
  `)
})