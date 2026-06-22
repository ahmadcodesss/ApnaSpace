



const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer();

const io = new Server(server, {
  cors: { origin: "*" }
});

let users = {};
let rooms = new Set();
let roomUsers = {};

io.on("connection", (socket) => {
  console.log("CONNECTED:", socket.id);

  socket.on("set_username", (name) => {
    users[socket.id] = name;
    socket.emit("room_list", Array.from(rooms));
  });

  socket.on("get_rooms", () => {
    socket.emit("room_list", Array.from(rooms));
  });

  socket.on("create_room", (room) => {
    if (!room) return;
    rooms.add(room);
    roomUsers[room] = [];
    io.emit("room_list", Array.from(rooms));
  });

  socket.on("join_room", (room) => {
    socket.join(room);
    if (!roomUsers[room]) roomUsers[room] = [];
    roomUsers[room].push(users[socket.id]);
    io.to(room).emit("users_update", roomUsers[room]);
    io.to(room).emit("system_message", `${users[socket.id]} joined ${room}`);
  });

  socket.on("send_message", ({ room, message }) => {
    io.to(room).emit("receive_message", {
      user: users[socket.id],
      message
    });
  });

  socket.on("draw", ({ room, data }) => {
    socket.to(room).emit("draw", data);
  });

  socket.on("clear_board", (room) => {
    socket.to(room).emit("clear_board");
  });

  socket.on("disconnect", () => {
    delete users[socket.id];
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`ApnaSpace running on port ${PORT}`);
});