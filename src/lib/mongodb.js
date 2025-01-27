// lib/mongodb.js
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;  // Ensure this is set in your .env file
const options = { useNewUrlParser: true, useUnifiedTopology: true };

let client;
let clientPromise;

// Create a new client if it does not exist
if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so we don't create a new connection
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, create a new connection for each request
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
