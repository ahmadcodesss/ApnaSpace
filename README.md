# ApnaSpace

A full-stack real-time chat application featuring live messaging and a collaborative whiteboard. Built from scratch using React on the frontend and Node.js with Socket.IO on the backend, with WebSocket connections handling all real-time communication between clients.

This project was built to explore full-stack development and real-time systems — two areas increasingly relevant in modern web applications.

## What It Does

Users can create named chat rooms and invite others to join. Once inside a room, all connected users see messages instantly without any page refresh. The same room also has a shared whiteboard where multiple users can draw simultaneously — every stroke is broadcast and rendered on all connected clients in real time.

## Technical Highlights

- Bidirectional WebSocket communication using Socket.IO for zero-latency updates
- Room-based event broadcasting — messages and drawing strokes are scoped to the correct room only
- Canvas-based whiteboard with freehand drawing, eraser, color picker, and brush size control
- Synchronized clear board action that resets the canvas for all users in the room simultaneously
- Component-driven frontend architecture with clean separation between views (lobby, chat, whiteboard)
- State managed entirely in React without any external state management library

## Tech Stack

**Frontend:** React, Vite  
**Backend:** Node.js, Socket.IO  
**Protocol:** WebSockets

## Running Locally

### Prerequisites

- Node.js installed

### Installation

1. Clone the repo
```bash
   git clone https://github.com/yourusername/apnaspace.git
   cd apnaspace
```

2. Install server dependencies
```bash
   cd server
   npm install
```

3. Install client dependencies
```bash
   cd client
   npm install
```

### Running the App

1. Start the server
```bash
   cd server
   node server.js
```

2. Start the client
```bash
   cd client
   npm run dev
```

3. Open `http://localhost:5173` in your browser

