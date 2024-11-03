// Initialize socket.io client
const socket = io();

// Select DOM elements
const messageInput = document.getElementById('messageInput');
const chatBox = document.getElementById('chat-box');
const sendButton = document.getElementById('sendButton');

// Listen for the "Send" button click
sendButton.addEventListener('click', () => {
  const message = messageInput.value;
  
  // Get the username from local storage or prompt the user
  const username = localStorage.getItem('username') || prompt('Enter your username:');
  localStorage.setItem('username', username);

  // Emit the message to the server
  socket.emit('sendMessage', { username, text: message });
  
  // Clear the input field
  messageInput.value = '';
});

// Listen for incoming messages
socket.on('receiveMessage', (messageData) => {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.textContent = `${messageData.username}: ${messageData.text}`;
  chatBox.appendChild(messageElement);

  // Scroll to the bottom of the chat
  chatBox.scrollTop = chatBox.scrollHeight;
});
