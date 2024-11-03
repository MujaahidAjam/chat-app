// Import required modules
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { Sequelize } = require('sequelize');  // Sequelize import
const Message = require('./models/Message');  // Message model

// Initialize Express and HTTP server
const app = express();
const server = http.createServer(app);
const io = socketIo(server);  // Initialize Socket.io on the HTTP server

// Other necessary middlewares and routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sample home route
app.get('/', (req, res) => {
  res.send('Chat Application is running');
});

// Socket.io communication setup
io.on('connection', (socket) => {
  console.log('New user connected');

  // Listen for chat messages
  socket.on('chat message', async (msg) => {
    const { senderId, receiverId, content } = msg;

    try {
      // Save the message in the database using Sequelize
      const message = await Message.create({
        content,
        senderId,
        receiverId,
      });

      // Emit the message to the receiver
      io.to(receiverId).emit('chat message', message);
    } catch (error) {
      console.error('Error saving message:', error);
    }
  });

  // Handle user disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start the server
const PORT = pro
