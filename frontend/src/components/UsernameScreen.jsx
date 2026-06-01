import { useState } from "react";

export default function UsernameScreen({ onJoin }) {
  const [name, setName] = useState("");

  return (
    <div style={styles.container}>
      
      <h1 style={styles.logo}>🚀 ApnaSpace</h1>
      <p style={styles.sub}>Enter your name to continue</p>

      <input
        style={styles.input}
        placeholder="Your name..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button
        style={styles.button}
        onClick={() => {
          if (name.trim() !== "") {
            onJoin(name);
          }
        }}
      >
        Join Space 🚀
      </button>

    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "#0f172a",
    color: "white",
  },
  logo: {
    fontSize: "40px",
    marginBottom: "10px",
  },
  sub: {
    marginBottom: "20px",
    color: "#94a3b8",
  },
  input: {
    padding: "10px",
    width: "250px",
    borderRadius: "8px",
    border: "none",
    marginBottom: "15px",
  },
  button: {
    padding: "10px 20px",
    background: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};