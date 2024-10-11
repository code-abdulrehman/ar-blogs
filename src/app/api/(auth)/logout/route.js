// pages/api/logout.js
export async function POST(req, res) {
    // Clear the session cookie by setting its Max-Age to 0
    return new Response(JSON.stringify({
      message: "Logout successful",
    }), {
      status: 200,
      headers: {
        'Set-Cookie': `sessionToken=; HttpOnly; Path=/; Max-Age=0`, // Expire the cookie
        'Content-Type': 'application/json',
      },
    });
  }
  