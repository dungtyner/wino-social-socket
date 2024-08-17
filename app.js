const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
require('dotenv').config();

const server = http.createServer(app);
const configureSocket = require('./config/socket');
const io = configureSocket(server);

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

module.exports = { io };

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log('Server started on port', PORT);
});
