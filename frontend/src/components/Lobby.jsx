
import { useEffect, useState } from "react";
import { socket } from "../socket";

export default function Lobby({ setRoom, username }) {
  const [rooms, setRooms] = useState([]);
  const [newRoom, setNewRoom] = useState("");

  useEffect(() => {
    socket.on("room_list", setRooms);
    socket.emit("get_rooms");
    return () => socket.off("room_list", setRooms);
  }, []);

  const createRoom = () => {
    if (!newRoom.trim()) return;
    socket.emit("create_room", newRoom.trim());
    setNewRoom("");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0f0f10", display: "flex" }}>
      <div style={{
        width: 260, background: "#1a1a1f", borderRight: "0.5px solid #2a2a30",
        display: "flex", flexDirection: "column", padding: "24px 0"
      }}>
        <div style={{ padding: "0 20px 20px", borderBottom: "0.5px solid #2a2a30" }}>
          <h1 style={{ margin: 0, fontSize: 18, fontWeight: 600, color: "#f0f0f0" }}>💬 ApnaSpace</h1>
          <p style={{ margin: "4px 0 0", fontSize: 13, color: "#666" }}>@{username}</p>
        </div>

        <div style={{ padding: "16px 20px 8px" }}>
          <p style={{ margin: 0, fontSize: 11, fontWeight: 600, color: "#555", textTransform: "uppercase", letterSpacing: 1 }}>Rooms</p>
        </div>

        <div style={{ flex: 1, overflowY: "auto" }}>
          {rooms.length === 0 && (
            <p style={{ padding: "0 20px", color: "#555", fontSize: 14 }}>No rooms yet</p>
          )}
          {rooms.map((r, i) => (
            <div
              key={i}
              onClick={() => setRoom(r)}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "9px 20px", cursor: "pointer", color: "#aaa",
                fontSize: 14, borderRadius: 0, transition: "background 0.15s"
              }}
              onMouseEnter={e => e.currentTarget.style.background = "#22222a"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              <span style={{ color: "#555", fontSize: 16 }}>#</span>
              <span>{r}</span>
            </div>
          ))}
        </div>

        <div style={{ padding: "16px 20px 0", borderTop: "0.5px solid #2a2a30" }}>
          <p style={{ margin: "0 0 8px", fontSize: 12, color: "#555" }}>Create a room</p>
          <div style={{ display: "flex", gap: 6 }}>
            <input
              value={newRoom}
              onChange={(e) => setNewRoom(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && createRoom()}
              placeholder="room-name"
              style={{
                flex: 1, background: "#0f0f10", border: "0.5px solid #2a2a30",
                borderRadius: 6, padding: "8px 10px", color: "#f0f0f0",
                fontSize: 13, outline: "none", minWidth: 0
              }}
            />
            <button
              onClick={createRoom}
              style={{
                background: "#5865f2", border: "none", borderRadius: 6,
                padding: "8px 12px", color: "#fff", fontSize: 18,
                cursor: "pointer", lineHeight: 1
              }}
            >+</button>
          </div>
        </div>
      </div>

      <div style={{
        flex: 1, display: "flex", alignItems: "center",
        justifyContent: "center", flexDirection: "column", gap: 12
      }}>
        <p style={{ fontSize: 40 }}>👈</p>
        <p style={{ color: "#555", fontSize: 16 }}>Pick a room to start chatting</p>
      </div>
    </div>
  );
}