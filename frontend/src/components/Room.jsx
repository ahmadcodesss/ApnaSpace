import { useEffect, useState } from "react";
import { socket } from "../socket";

export default function Room({ room, username }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    socket.emit("join_room", room);

    const handleMessage = (data) => {
      setMessages((prev) => [...prev, data]);
    };

    const handleSystem = (msg) => {
      setMessages((prev) => [...prev, { user: "system", message: msg }]);
    };

    socket.on("receive_message", handleMessage);
    socket.on("system_message", handleSystem);

    return () => {
      socket.off("receive_message", handleMessage);
      socket.off("system_message", handleSystem);
    };
  }, [room]);

  const sendMessage = () => {
    if (!text.trim()) return;
    socket.emit("send_message", { room, message: text });
    setText("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>🏠 Room: {room}</h2>

      <div style={{ height: 300, overflow: "auto", border: "1px solid #ccc", padding: 10 }}>
        {messages.map((m, i) => (
          <div key={i}>
            <b>{m.user}:</b> {m.message}
          </div>
        ))}
      </div>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        placeholder="Type a message..."
        style={{ marginTop: 10 }}
      />
      <button onClick={sendMessage} style={{ marginLeft: 8 }}>Send</button>
    </div>
  );
}