import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";
dotenv.config();


// Create a single pool instance
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});


// Function to test DB connection on server start
export const connectDB = async () => {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log("✅ Connected to DB at:", result.rows[0].now);
  } catch (error) {
    console.error("❌ Failed to connect to DB", error);
    process.exit(1);
  }
};


// Reusable query function
export async function query(text, params) {
  try {
    const result = await pool.query(text, params); // ✔ correct
    return result;
  } catch (error) {
    console.error("❌ DB Query Error:", error);
    throw error;
  }
}


export default connectDB;
