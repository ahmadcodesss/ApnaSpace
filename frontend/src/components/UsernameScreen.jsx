
import { useState } from "react";

export default function UsernameScreen({ onLogin }) {
  const [name, setName] = useState("");

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      justifyContent: "center", background: "#0f0f10"
    }}>
      <div style={{
        background: "#1a1a1f", border: "0.5px solid #2a2a30",
        borderRadius: 16, padding: "48px 40px", width: 360,
        display: "flex", flexDirection: "column", gap: 24
      }}>
        <div>
          <div style={{ fontSize: 32, marginBottom: 8 }}>💬</div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 600, color: "#f0f0f0" }}>ApnaSpace</h1>
          <p style={{ margin: "6px 0 0", color: "#888", fontSize: 14 }}>Enter a username to get started</p>
        </div>

        <input
          autoFocus
          placeholder="Your username..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && name.trim() && onLogin(name.trim())}
          style={{
            background: "#0f0f10", border: "0.5px solid #2a2a30",
            borderRadius: 8, padding: "10px 14px", color: "#f0f0f0",
            fontSize: 15, outline: "none", width: "100%", boxSizing: "border-box"
          }}
        />

        <button
          onClick={() => name.trim() && onLogin(name.trim())}
          style={{
            background: "#5865f2", border: "none", borderRadius: 8,
            padding: "11px 0", color: "#fff", fontSize: 15,
            fontWeight: 500, cursor: "pointer", width: "100%"
          }}
        >
          Enter →
        </button>
      </div>
    </div>
  );
}