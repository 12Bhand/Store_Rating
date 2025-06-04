const mysql = require("mysql2")

// Create a connection to the database
const connection = mysql.createConnection({
  host: "localhost", // MySQL host
  user: "root", // MySQL user
  password: "admin", // MySQL password
  database: "mydb", // Your database name
})

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err.stack)
    return
  }
  console.log("Connected to MySQL as id " + connection.threadId)
})

module.exports = connection