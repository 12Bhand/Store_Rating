///////////////////////
// MODULE IMPORTS    //
///////////////////////
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
require("dotenv").config();

///////////////////////
// APP DECLARATIONS  //
///////////////////////
const app = express();
const PORT = process.env.PORT || 3003;

///////////////////////
// MIDDLEWARE SETUP  //
///////////////////////
app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: "500mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "500mb", parameterLimit: 100000 }));

/////////////////////////
// MYSQL CONFIGURATION //
/////////////////////////
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "admin",
  database: process.env.DB_NAME || "store_db"
});

db.connect((err) => {
  if (err) {
    console.error("❌ MySQL Connection Failed:", err.stack);
    return;
  }
  console.log("✅ Connected to MySQL Database");
});

///////////////////////
// ROUTES            //
///////////////////////

// GET all stores
app.get("/strs", (req, res) => {
  const query = "SELECT * FROM stores";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching stores:", err);
      return res.status(500).json({ error: "Failed to retrieve stores" });
    }
    res.json(results);
  });
});

// POST a new store
app.post("/stores", (req, res) => {
  const { name, address, rating, userRating } = req.body;

  if (!name || !address || rating === undefined || userRating === undefined) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const sql = "INSERT INTO stores (name, address, rating, userRating) VALUES (?, ?, ?, ?)";
  const values = [name, address, rating, userRating];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error inserting store:", err);
      return res.status(500).json({ error: "Failed to insert store" });
    }
    res.status(201).json({ message: "Store added successfully", id: result.insertId });
  });
});

///////////////////////
// SERVER INIT       //
///////////////////////
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

