import { useState } from "react";

export default function Lobby({ username, onJoinRoom }) {
  const [rooms, setRooms] = useState(["Room A", "Room B"]);
  const [newRoom, setNewRoom] = useState("");

  const createRoom = () => {
    if (newRoom.trim() === "") return;
    setRooms([...rooms, newRoom]);
    setNewRoom("");
  };

  return (
    <div style={styles.container}>
      
      <h1>🚀 ApnaSpace</h1>
      <h3>👋 Hi, {username}</h3>

      {/* CREATE ROOM */}
      <div style={styles.createBox}>
        <input
          placeholder="Create room..."
          value={newRoom}
          onChange={(e) => setNewRoom(e.target.value)}
          style={styles.input}
        />
        <button onClick={createRoom} style={styles.button}>
          ➕ Create
        </button>
      </div>

      {/* ACTIVE ROOMS */}
      <h2>🏠 Active Rooms</h2>

      <div style={styles.roomList}>
        {rooms.map((room, index) => (
          <div key={index} style={styles.roomCard}>
            <span>📌 {room}</span>
            <button
              style={styles.joinBtn}
              onClick={() => onJoinRoom(room)}
            >
              Join 🚀
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
  },
  createBox: {
    margin: "20px 0",
  },
  input: {
    padding: "8px",
    marginRight: "10px",
  },
  button: {
    padding: "8px 12px",
  },
  roomList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginTop: "20px",
    alignItems: "center",
  },
  roomCard: {
    width: "250px",
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "8px",
  },
  joinBtn: {
    padding: "5px 10px",
    cursor: "pointer",
  },
};