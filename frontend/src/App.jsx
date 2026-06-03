// import { useState } from "react";
// import UsernameScreen from "./components/UsernameScreen.jsx";
// import Lobby from "./components/Lobby.jsx";
// import Room from "./components/Room.jsx";
// import { socket } from "./socket.js";

// export default function App() {
//   const [username, setUsername] = useState("");
//   const [room, setRoom] = useState("");

//   const handleLogin = (name) => {
//     if (!name.trim()) return;
//     setUsername(name);
//     socket.emit("set_username", name);
//   };

//   if (!username) return <UsernameScreen onLogin={handleLogin} />;
//   if (!room) return <Lobby setRoom={setRoom} />;
//   return <Room room={room} username={username} />;
// } 


// import { useState } from "react";
// import UsernameScreen from "./components/UsernameScreen.jsx"; 

// import Lobby from "./components/Lobby.jsx";
// import Room from "./components/Room.jsx";
// import { socket } from "./socket.js";

// export default function App() {
//   const [username, setUsername] = useState("");
//   const [room, setRoom] = useState("");

//   const handleLogin = (name) => {
//     if (!name.trim()) return;
//     setUsername(name);
//     socket.emit("set_username", name);
//   };

//   if (!username) return <UsernameScreen onLogin={handleLogin} />;
//   if (!room) return <Lobby setRoom={setRoom} username={username} />;
//   return <Room room={room} username={username} setRoom={setRoom} />;
// }  



import { useState } from "react";
import UsernameScreen from "./components/UsernameScreen.jsx";
import Lobby from "./components/Lobby.jsx";
import Room from "./components/Room.jsx";
import Whiteboard from "./components/Whiteboard.jsx";
import { socket } from "./socket.js";

export default function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [view, setView] = useState("chat"); // "chat" | "whiteboard"

  const handleLogin = (name) => {
    if (!name.trim()) return;
    setUsername(name);
    socket.emit("set_username", name);
  };

  const handleSetRoom = (r) => {
    setRoom(r);
    setView("chat");
  };

  if (!username) return <UsernameScreen onLogin={handleLogin} />;
  if (!room) return <Lobby setRoom={handleSetRoom} username={username} />;
  if (view === "whiteboard") return <Whiteboard room={room} username={username} setRoom={handleSetRoom}   setView={setView} />;
  return <Room room={room} username={username} setRoom={handleSetRoom} setView={setView}  />;
}
