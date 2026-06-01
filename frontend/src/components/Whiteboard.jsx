import { useEffect, useRef } from "react";
import { socket } from "../socket";

export default function Whiteboard({ room }) {
  const canvasRef = useRef(null);
  const drawing = useRef(false);
  const prev = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 400;
    canvas.height = 300;

    const ctx = canvas.getContext("2d");

    socket.on("draw", (data) => {
      ctx.beginPath();
      ctx.moveTo(data.x0, data.y0);
      ctx.lineTo(data.x1, data.y1);
      ctx.stroke();
    });

    return () => socket.off("draw");
  }, []);

  const getPos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const start = (e) => {
    drawing.current = true;
    prev.current = getPos(e);
  };

  const stop = () => {
    drawing.current = false;
    prev.current = null;
  };

  const draw = (e) => {
    if (!drawing.current) return;

    const curr = getPos(e);

    socket.emit("draw", {
      room,
      x0: prev.current.x,
      y0: prev.current.y,
      x1: curr.x,
      y1: curr.y,
    });

    const ctx = canvasRef.current.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(prev.current.x, prev.current.y);
    ctx.lineTo(curr.x, curr.y);
    ctx.stroke();

    prev.current = curr;
  };

  return (
    <canvas
      ref={canvasRef}
      style={{ border: "2px solid black" }}
      onMouseDown={start}
      onMouseUp={stop}
      onMouseMove={draw}
    />
  );
}