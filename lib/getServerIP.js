// lib/getServerIP.js
import os from 'os';

export function getServerIP() {
  const interfaces = os.networkInterfaces();
  let serverIP = 'localhost'; // Fallback to localhost

  for (let name of Object.keys(interfaces)) {
    for (let iface of interfaces[name]) {
      // Skip over internal (i.e. 127.0.0.1) and non-IPv4 addresses
      if (iface.family === 'IPv4' && !iface.internal) {
        serverIP = iface.address;
      }
    }
  }
  return serverIP;
}
