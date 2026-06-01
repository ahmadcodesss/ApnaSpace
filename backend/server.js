const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());

const server = http.createServer(app);

// Socket server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", 
    methods: ["GET", "POST"]
  }
});

// Test route
app.get("/", (req, res) => {
  res.send("ApnaSpace Backend Running ");
});

// ROOM STORAGE (in-memory)
const rooms = {};

// Socket connection
io.on("connection", (socket) => {
  console.log(" User connected:", socket.id);

  socket.emit("welcome", " Welcome to ApnaSpace!");

  socket.on("disconnect", () => {
    console.log(" User disconnected:", socket.id);
  });


  // JOIN ROOM
  socket.on("join_room", (roomId, username) => {
    socket.join(roomId);

    if (!rooms[roomId]) {
      rooms[roomId] = { users: [] };
    }

    rooms[roomId].users.push({ id: socket.id, username });

    io.to(roomId).emit("room_users", rooms[roomId].users);
  });

  // CHAT MESSAGE
  socket.on("send_message", (data) => {
    // data = { roomId, message, username }
    io.to(data.roomId).emit("receive_message", data);
  });

  // WHITEBOARD DRAWING
  socket.on("draw", (data) => {
    // data = { roomId, x, y, type, username }
    socket.to(data.roomId).emit("draw", data);
  });

  // DISCONNECT
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);

    // remove user from rooms
    for (let roomId in rooms) {
      rooms[roomId].users = rooms[roomId].users.filter(
        (u) => u.id !== socket.id
      );

      // delete room if empty
      if (rooms[roomId].users.length === 0) {
        delete rooms[roomId];
      }
    }
  });
});

// START SERVER
server.listen(3000, () => {
  console.log("Backend running on http://localhost:3000");
});