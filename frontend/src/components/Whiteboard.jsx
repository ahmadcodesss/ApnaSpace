import { useEffect, useRef, useState } from "react";
import { socket } from "../socket";

export default function Whiteboard({ room, username, setRoom , setView}) {
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);
  const lastPos = useRef(null);
  const [tool, setTool] = useState("pen");
  const [color, setColor] = useState("#f0f0f0");
  const [lineWidth, setLineWidth] = useState(3);

  const getPos = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const drawLine = (ctx, from, to, strokeColor, width) => {
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    ctx.fillStyle = "#0f0f10";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const handleRemoteDraw = (data) => {
      drawLine(ctx, data.from, data.to, data.color, data.lineWidth);
    };

    const handleClear = () => {
      ctx.fillStyle = "#0f0f10";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    socket.on("draw", handleRemoteDraw);
    socket.on("clear_board", handleClear);

    return () => {
      socket.off("draw", handleRemoteDraw);
      socket.off("clear_board", handleClear);
    };
  }, []);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    isDrawing.current = true;
    lastPos.current = getPos(e, canvas);
  };

  const draw = (e) => {
    if (!isDrawing.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const pos = getPos(e, canvas);
    const from = lastPos.current;
    const to = pos;

    const strokeColor = tool === "eraser" ? "#0f0f10" : color;
    const width = tool === "eraser" ? 24 : lineWidth;

    drawLine(ctx, from, to, strokeColor, width);

    socket.emit("draw", {
      room,
      data: { from, to, color: strokeColor, lineWidth: width },
    });

    lastPos.current = pos;
  };

  const stopDrawing = () => {
    isDrawing.current = false;
    lastPos.current = null;
  };

  const clearBoard = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#0f0f10";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    socket.emit("clear_board", room);
  };

  const btnStyle = (active) => ({
    background: active ? "#5865f2" : "transparent",
    border: `0.5px solid ${active ? "#5865f2" : "#2a2a30"}`,
    borderRadius: 6,
    padding: "7px 16px",
    color: active ? "#fff" : "#aaa",
    fontSize: 13,
    fontWeight: 500,
    cursor: "pointer",
  });

  return (
    <div style={{ minHeight: "100vh", background: "#0f0f10", display: "flex", flexDirection: "column" }}>
      <div style={{
        background: "#1a1a1f", borderBottom: "0.5px solid #2a2a30",
        padding: "12px 24px", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap"
      }}>
        <button
          onClick={() => setView("chat")}
          style={{
            background: "transparent", border: "0.5px solid #2a2a30",
            borderRadius: 6, padding: "6px 12px", color: "#888",
            fontSize: 13, cursor: "pointer"
          }}
        >← Back</button>

        <span style={{ color: "#555", fontSize: 14 }}>|</span>
        <span style={{ color: "#888", fontSize: 14 }}>#{room} · Whiteboard</span>

        <span style={{ color: "#555", fontSize: 14, marginLeft: 8 }}>|</span>

        <button style={btnStyle(tool === "pen")} onClick={() => setTool("pen")}>✏️ Pen</button>
        <button style={btnStyle(tool === "eraser")} onClick={() => setTool("eraser")}>🧹 Eraser</button>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <label style={{ color: "#666", fontSize: 13 }}>Color</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            style={{ width: 32, height: 28, border: "none", background: "none", cursor: "pointer", borderRadius: 4 }}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <label style={{ color: "#666", fontSize: 13 }}>Size</label>
          <input
            type="range"
            min={1}
            max={20}
            value={lineWidth}
            onChange={(e) => setLineWidth(Number(e.target.value))}
            style={{ width: 80 }}
          />
          <span style={{ color: "#666", fontSize: 13, minWidth: 20 }}>{lineWidth}</span>
        </div>

        <button
          onClick={clearBoard}
          style={{
            marginLeft: "auto", background: "transparent",
            border: "0.5px solid #3a2020", borderRadius: 6,
            padding: "7px 14px", color: "#e24b4a", fontSize: 13, cursor: "pointer"
          }}
        >Clear</button>
      </div>

      <canvas
        ref={canvasRef}
        style={{ flex: 1, width: "100%", cursor: tool === "eraser" ? "cell" : "crosshair", display: "block" }}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
      />
    </div>
  );
}