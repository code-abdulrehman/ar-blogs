require('dotenv').config(); // Load environment variables

const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI; 
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("Connected to the database successfully!");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
