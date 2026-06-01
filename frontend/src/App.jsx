import { useState } from "react";
import UsernameScreen from "./components/UsernameScreen";

function App() {
  const [username, setUsername] = useState("");

  if (!username) {
    return (
      <UsernameScreen
        onJoin={(name) => setUsername(name)}
      />
    );
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>👋 Welcome {username}</h1>
      <p>Next step: Lobby coming soon 🏠</p>
    </div>
  );
}

export default App;