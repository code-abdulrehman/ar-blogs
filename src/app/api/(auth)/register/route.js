// pages/api/register.js
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI; 

const options = { useNewUrlParser: true, useUnifiedTopology: true };

// Named export for POST method
export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return new Response(JSON.stringify({ message: 'Email and password are required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const client = await MongoClient.connect(uri, options);
    const db = client.db('arblogs'); // Replace with your database name

    // Insert user logic here
    await db.collection('users').insertOne({ email, password });

    client.close();
    return new Response(JSON.stringify({ message: 'User registered successfully!' }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error connecting to the database', error);
    return new Response(JSON.stringify({ message: 'Error connecting to the database' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}