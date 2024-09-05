const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
require('dotenv').config();
require('module-alias/register');

const server = http.createServer(app);
const configureSocket = require('@wn-config/socket');
const loadListeners = require('@/listeners');
const listenerChatting = require('@/listeners/chatting');
const io = configureSocket(server);
const configureExpress = require('@wn-config/express');
const addMessage = require('@/events/chat/addMessage');
configureExpress(app);
module.exports = { io };
loadListeners();

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.post('/listener/chatting', (req, res) => {
  listenerChatting(req.body);
  res.send();
});

app.post('/event/chat/add-message', (req, res) => {
  addMessage(req.body);
  res.send();
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log('Server started on port', PORT);
});
