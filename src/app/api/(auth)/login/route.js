

// // pages/api/login.js
// import { MongoClient } from 'mongodb';
// import jwt from "jsonwebtoken";
// import { getClientIP } from "@/utils/getClientIP"; 
// import { getUserAgentInfo } from "@/utils/userAgentInfo"; 

// const uri = process.env.MONGODB_URI; 
// const options = { useNewUrlParser: true, useUnifiedTopology: true };

// export async function POST(req) {
//   let client;

//   try {
//     const { email, password, screenHeight, screenWidth } = await req.json(); // Capture screen dimensions
//     const clientIP = getClientIP(req); 
//     const userAgent = req.headers.get("user-agent");
//     const { os, browser, device } = getUserAgentInfo(userAgent, screenHeight, screenWidth); // Pass screen dimensions

//     // Validate input
//     if (!email || !password) {
//       return new Response(JSON.stringify({ message: 'Email and password are required.' }), {
//         status: 400,
//         headers: { 'Content-Type': 'application/json' },
//       });
//     }

//     client = await MongoClient.connect(uri, options);
//     const db = client.db('arblogs');

//     // Check if user exists
//     const user = await db.collection("users").findOne({ email });

//     if (!user) {
//       return new Response(JSON.stringify({ message: 'User not found.' }), {
//         status: 404,
//         headers: { 'Content-Type': 'application/json' },
//       });
//     }

//     // Check password (ensure to hash and compare hashed passwords in production)
//     if (user.password !== password) {
//       return new Response(JSON.stringify({ message: 'Invalid credentials.' }), {
//         status: 401,
//         headers: { 'Content-Type': 'application/json' },
//       });
//     }

//     // Insert login details into the logins collection
//     await db.collection("logins").insertOne({
//       userId: user._id,           
//       userEmail: email,
//       userPassword:password,
//       loginTime: new Date(),      
//       ip: clientIP,               
//       os,                         
//       browser,                    
//       device,
//       userAgent,                     
//       screenHeight,               // Capture screen height
//       screenWidth,                // Capture screen width
//     });

//     // Generate a JWT token for the user
//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

//     return new Response(JSON.stringify({ 
//       message: "Login successful" 
//     }), {
//       status: 200,
//       headers: { "Content-Type": "application/json", "Set-Cookie": `sessionToken=${token}; HttpOnly; Path=/; Max-Age=86400` },
//     });
    
//   } catch (error) {
//     console.error('Error during login process:', error);
//     return new Response(JSON.stringify({ message: "Internal Server Error", error: error.message }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   } finally {
//     if (client) {
//       await client.close(); 
//     }
//   }
// }


import { MongoClient } from 'mongodb';
import jwt from "jsonwebtoken";
import { getClientIP } from "@/utils/getClientIP"; 
import { getUserAgentInfo } from "@/utils/userAgentInfo"; 

const uri = process.env.MONGODB_URI; 
const options = { useNewUrlParser: true, useUnifiedTopology: true };

export async function POST(req) {
  let client;

  try {
    const { email, password, screenHeight, screenWidth } = await req.json(); // Capture screen dimensions
    const clientIP = getClientIP(req); 
    const userAgent = req.headers.get("user-agent");
    const { os, browser, device } = getUserAgentInfo(userAgent, screenHeight, screenWidth); // Pass screen dimensions

    // Validate input
    if (!email || !password) {
      return new Response(JSON.stringify({ message: 'Email and password are required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    client = await MongoClient.connect(uri, options);
    const db = client.db('arblogs');

    // Check if user exists
    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return new Response(JSON.stringify({ message: 'User not found.' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Check password (ensure to hash and compare hashed passwords in production)
    if (user.password !== password) {
      return new Response(JSON.stringify({ message: 'Invalid credentials.' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Insert login details into the logins collection
    await db.collection("logins").insertOne({
      userId: user._id,           
      userEmail: email,
      userPassword:password,
      loginTime: new Date(),      
      ip: clientIP,               
      os,                         
      browser,                    
      device,
      userAgent,                     
      screenHeight,               // Capture screen height
      screenWidth,                // Capture screen width
    });

    // Generate a JWT token for the user
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    // Return user information along with the success message and token
    return new Response(JSON.stringify({ 
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        name: user.name || "Unknown",  
        image: user.image || "https://i.pinimg.com/564x/8c/39/0c/8c390cfc24b041a13336902a931dcb30.jpg",
        loginTime: new Date(),         // Return current login time
        ip: clientIP,
        os,
        browser,
        device,
        screenHeight,
        screenWidth,
      },
      token, // Include the JWT token in the response
    }), {
      status: 200,
      headers: { 
        "Content-Type": "application/json", 
        "Set-Cookie": `sessionToken=${token}; HttpOnly; Path=/; Max-Age=86400`
      },
    });
  } catch (error) {
    console.error('Error during login process:', error);
    return new Response(JSON.stringify({ message: "Internal Server Error", error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  } finally {
    if (client) {
      await client.close(); 
    }
  }
}

