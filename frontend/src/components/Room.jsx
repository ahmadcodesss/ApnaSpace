
import { useEffect, useState, useRef } from "react";
import { socket } from "../socket";

export default function Room({ room, username, setRoom, setView}) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    socket.emit("join_room", room);

    const handleMessage = (data) => setMessages((prev) => [...prev, { ...data, type: "user" }]);
    const handleSystem = (msg) => setMessages((prev) => [...prev, { user: "system", message: msg, type: "system" }]);

    socket.on("receive_message", handleMessage);
    socket.on("system_message", handleSystem);

    return () => {
      socket.off("receive_message", handleMessage);
      socket.off("system_message", handleSystem);
    };
  }, [room]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!text.trim()) return;
    socket.emit("send_message", { room, message: text });
    setText("");
  };

  const getInitials = (name) => name?.slice(0, 2).toUpperCase() || "??";
  const colors = ["#5865f2", "#3ba55c", "#eb459e", "#faa81a", "#ed4245"];
  const getColor = (name) => colors[(name?.charCodeAt(0) || 0) % colors.length];

  return (
    <div style={{ minHeight: "100vh", background: "#0f0f10", display: "flex", flexDirection: "column" }}>
      <div style={{
        background: "#1a1a1f", borderBottom: "0.5px solid #2a2a30",
        padding: "14px 24px", display: "flex", alignItems: "center", gap: 12
      }}>
        <button
          onClick={() => setRoom("")}
          style={{
            background: "transparent", border: "0.5px solid #2a2a30",
            borderRadius: 6, padding: "5px 10px", color: "#888",
            fontSize: 13, cursor: "pointer"
          }}
        >← Back</button>


            {/* ADD THIS */}
  <button
    onClick={() => setView("whiteboard")}
    style={{
      background: "transparent", border: "0.5px solid #2a2a30",
      borderRadius: 6, padding: "5px 10px", color: "#888",
      fontSize: 13, cursor: "pointer"
    }}
  >🖼️ Whiteboard</button>






        <span style={{ color: "#555", fontSize: 20 }}>#</span>
        <span style={{ color: "#f0f0f0", fontSize: 16, fontWeight: 500 }}>{room}</span>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px", display: "flex", flexDirection: "column", gap: 4 }}>
        {messages.map((m, i) => {
          if (m.type === "system") {
            return (
              <div key={i} style={{ textAlign: "center", color: "#444", fontSize: 12, padding: "6px 0" }}>
                {m.message}
              </div>
            );
          }
          const isMe = m.user === username;
          return (
            <div key={i} style={{
              display: "flex", gap: 10, alignItems: "flex-start",
              flexDirection: isMe ? "row-reverse" : "row",
              marginTop: 8
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
                background: getColor(m.user), display: "flex",
                alignItems: "center", justifyContent: "center",
                fontSize: 12, fontWeight: 600, color: "#fff"
              }}>
                {getInitials(m.user)}
              </div>
              <div style={{ maxWidth: "65%" }}>
                <p style={{
                  margin: "0 0 3px", fontSize: 12, color: "#555",
                  textAlign: isMe ? "right" : "left"
                }}>{m.user}</p>
                <div style={{
                  background: isMe ? "#5865f2" : "#22222a",
                  borderRadius: isMe ? "12px 12px 4px 12px" : "12px 12px 12px 4px",
                  padding: "9px 13px", color: "#f0f0f0", fontSize: 14, lineHeight: 1.5
                }}>
                  {m.message}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      <div style={{
        background: "#1a1a1f", borderTop: "0.5px solid #2a2a30",
        padding: "16px 24px", display: "flex", gap: 10
      }}>
        <input
          autoFocus
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder={`Message #${room}...`}
          style={{
            flex: 1, background: "#0f0f10", border: "0.5px solid #2a2a30",
            borderRadius: 8, padding: "11px 14px", color: "#f0f0f0",
            fontSize: 14, outline: "none"
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            background: "#5865f2", border: "none", borderRadius: 8,
            padding: "11px 18px", color: "#fff", fontSize: 14,
            fontWeight: 500, cursor: "pointer"
          }}
        >Send</button>
      </div>
    </div>
  );
}