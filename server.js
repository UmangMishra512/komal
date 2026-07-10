import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data.js');

const server = http.createServer((req, res) => {
  // Enable CORS so the browser can send data from the file:// protocol
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === 'POST' && req.url === '/save') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        // Parse to ensure it's valid JSON before writing
        const jsonData = JSON.parse(body);
        
        // Format the data as valid JavaScript for data.js
        const jsContent = `window.DATA = ${JSON.stringify(jsonData, null, 2)};`;
        
        fs.writeFileSync(DATA_FILE, jsContent, 'utf8');
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: 'Saved successfully!' }));
      } catch (err) {
        console.error('Error saving data:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`✅ Birthday Auto-Save Server running!`);
  console.log(`📡 Listening on http://localhost:${PORT}`);
  console.log(`\nGo back to your browser and click "Save All" in the admin panel.`);
  console.log(`Your edits will instantly and permanently rewrite app.js!`);
  console.log(`======================================================\n`);
});
