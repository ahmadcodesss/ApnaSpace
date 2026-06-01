import { useState } from "react";
import UsernameScreen from "./components/UsernameScreen.jsx";
import Lobby from "./components/Lobby.jsx";
import Room from "./components/Room.jsx";
import { socket } from "./socket.js";

export default function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const handleLogin = (name) => {
    if (!name.trim()) return;
    setUsername(name);
    socket.emit("set_username", name);
  };

  if (!username) return <UsernameScreen onLogin={handleLogin} />;
  if (!room) return <Lobby setRoom={setRoom} />;
  return <Room room={room} username={username} />;
}