// utils/getClientIP.js
export function getClientIP(req) {
  // Check if 'x-forwarded-for' header exists, which is typically set by proxies
  const forwarded = req.headers.get('x-forwarded-for');
  
  if (forwarded) {
    // 'x-forwarded-for' can contain multiple IPs, take the first one
    return forwarded.split(',')[0].trim();
  }

  // If no 'x-forwarded-for' header, fallback to Node's `remoteAddress`
  const remoteAddress = req.socket.remoteAddress || req.connection.remoteAddress;

  // Handle local development where "::1" is the loopback address in IPv6
  if (remoteAddress === '::1' || remoteAddress === '127.0.0.1') {
    return '127.0.0.1'; // For local dev, we consider this as the "client" IP
  }

  return remoteAddress;
}
