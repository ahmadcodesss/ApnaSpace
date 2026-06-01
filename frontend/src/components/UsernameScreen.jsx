import { useState } from "react";

export default function Username({ onLogin }) {
  const [name, setName] = useState("");

  return (
    <div style={{ padding: 20 }}>
      <h1>🚀 ApnaSpace</h1>

      <input
        placeholder="Enter username"
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={() => onLogin(name)}>
        Enter
      </button>
    </div>
  );
}