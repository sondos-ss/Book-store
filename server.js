const express = require('express');
const path = require('path');
const http = require('http'); 
const ws = require('ws'); 

const app = express();
const port = 8080;
app.use(express.static(__dirname));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const server = http.createServer(app);
const websocket = new ws.Server({ server });

let books = []; 

websocket.on('connection', (client) => {
  console.log('Client connected');

  client.send(JSON.stringify(books));

  client.on('message', (message) => {
    try {
      
      const receivedData = JSON.parse(message);
      books.push(receivedData);
      websocket.clients.forEach((client) => {
        if (client.readyState === ws.OPEN) {
          client.send(JSON.stringify(books));
        }
      });
    } catch (err) {
      console.error('Error processing message:', err.message);
    }
  });

  client.on('close', () => {
    console.log('Client disconnected');
  });
});


server.listen(port, () => {
  console.log(`Server is running on port${port}`);
});
