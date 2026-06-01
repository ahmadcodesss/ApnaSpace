import { useState } from "react";
import UsernameScreen from "./components/UsernameScreen";
import Lobby from "./components/Lobby";

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  // STEP 1: Username screen
  if (!username) {
    return <UsernameScreen onJoin={(name) => setUsername(name)} />;
  }

  // STEP 2: Lobby screen
  if (!room) {
    return (
      <Lobby
        username={username}
        onJoinRoom={(roomName) => setRoom(roomName)}
      />
    );
  }

  // STEP 3: TEMP ROOM SCREEN
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1> Room: {room}</h1>
      <p>Next step: Chat + Whiteboard </p>
    </div>
  );
}

export default App;