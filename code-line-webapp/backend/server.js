const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let codeLineData = [];

// Load CSV file into memory when the server starts
fs.createReadStream(path.join(__dirname, 'Code Line Data.csv'))
  .pipe(csv())
  .on('data', (row) => {
    codeLineData.push(row);
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });

app.use(express.json());

// Endpoint to retrieve clues for N'Take
app.get('/clues/:nTakeName', (req, res) => {
  const { nTakeName } = req.params;
  const clues = codeLineData.find(row => row["N'Take"] === nTakeName);

  if (clues) {
    res.status(200).json({
      clue1: clues['Clue1'],
      clue2: clues['Clue2']
    });
  } else {
    res.status(404).json({ message: 'Clues not found for this N\'Take' });
  }
});

// Endpoint to get the message for P'Take from N'Take
app.get('/messages/:nTakeName', (req, res) => {
  const { nTakeName } = req.params;
  const userData = codeLineData.find(row => row["N'Take"] === nTakeName);

  if (userData) {
    res.status(200).json({ message: userData["Message to P'Take"] });
  } else {
    res.status(404).json({ message: 'No message found for this N\'Take' });
  }
});

// Socket.IO for real-time chat
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Handle room joining based on user IDs
  socket.on('joinRoom', ({ pTakeId, nTakeId }) => {
    const roomName = `${pTakeId}-${nTakeId}`;
    socket.join(roomName);
  });

  // Handle sending and receiving messages
  socket.on('sendMessage', ({ fromUserId, toUserId, message }) => {
    const roomName = `${fromUserId}-${toUserId}`;
    io.to(roomName).emit('receiveMessage', { fromUserId, toUserId, message });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Start the server
server.listen(3000, () => {
  console.log('Server is running on port 3000');
});