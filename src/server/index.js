import express from "express";
import pkg from "pg";

const app = express();
const port = process.env.PORT || 3000;

// Parse JSON bodies for this app
app.use(express.json());

// Create a new pool using your Neon database connection string
const { Pool } = pkg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });



// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});