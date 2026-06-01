import { useEffect, useState } from "react";
import { socket } from "../socket";

export default function Lobby({ setRoom }) {
  const [rooms, setRooms] = useState([]);
  const [newRoom, setNewRoom] = useState("");

  useEffect(() => {
    const handleRooms = (data) => {
      setRooms(data);
    };

    socket.on("room_list", handleRooms);
    socket.emit("get_rooms");

    return () => socket.off("room_list", handleRooms);
  }, []);

  const createRoom = () => {
    if (!newRoom.trim()) return;
    socket.emit("create_room", newRoom.trim());
    setNewRoom("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>🏠 Active Rooms</h2>

      {rooms.length === 0 && <p>No rooms yet. Create one!</p>}

      {rooms.map((r, i) => (
        <div key={i} style={{ marginBottom: 8 }}>
          <span>{r}</span>
          <button onClick={() => setRoom(r)} style={{ marginLeft: 10 }}>Join</button>
        </div>
      ))}

      <hr />
      <h3>Create Room</h3>
      <input
        value={newRoom}
        onChange={(e) => setNewRoom(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && createRoom()}
        placeholder="Room name..."
      />
      <button onClick={createRoom} style={{ marginLeft: 8 }}>Create</button>
    </div>
  );
}