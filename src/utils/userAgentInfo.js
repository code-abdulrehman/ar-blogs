// src/utils/userAgentInfo.js
export function getUserAgentInfo(userAgent, screenHeight, screenWidth) {
  const os = userAgent.includes('Windows') ? 'Windows' : 
             userAgent.includes('Macintosh') ? 'Mac' : 
             userAgent.includes('Linux') ? 'Linux' : 
             'Unknown OS';

  const browser = userAgent.includes('Chrome') ? 'Chrome' : 
                  userAgent.includes('Firefox') ? 'Firefox' : 
                  userAgent.includes('Safari') ? 'Safari' : 
                  'Unknown Browser';

  const device = 'Desktop'; // Defaulting to desktop; this can be expanded for mobile, etc.

  return { os, browser, device, screenHeight, screenWidth };
}
