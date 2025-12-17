# PeerPrep

PeerPrep is a **LeetCode-style coding practice platform** focused on **collaborative learning and consistency**, especially for beginners who struggle to stay regular when solving problems alone.

Instead of solving problems in isolation, PeerPrep allows **two users to join a shared session**, attempt the **same coding problem independently**, and interact in real time through video, chat, and optional screen sharing.

PeerPrep is **not an interview platform** and does **not support shared code editing**. Each participant writes code locally in their own editor. Collaboration happens through discussion, explanation, and peer support.

---

## Why PeerPrep Exists

Many beginners quit problem-solving midway because they get stuck and lose motivation.  
PeerPrep solves this by introducing **peer accountability and discussion**, making problem-solving more engaging and consistent.

Users can:
- Discuss approaches
- Ask doubts when stuck
- Explain logic via screen sharing
- Learn from another person’s perspective

---

## Key Features

- LeetCode-style problem solving interface
- Session-based problem solving (2 users per session)
- Both users attempt **the same problem**
- Independent code editors (no shared code state)
- Optional screen sharing to explain code or logic
- Real-time video calling
- Real-time chat for discussion and code snippets
- Public sessions (open to anyone)
- Private sessions (password protected)
- Secure authentication and session management

---

## Tech Stack

### Frontend

- React 18 with Vite
- Monaco Editor for code editing
- TailwindCSS with DaisyUI
- Stream Video SDK for video calls and screen sharing
- Stream Chat SDK for real-time messaging
- Clerk for authentication
- TanStack Query for data fetching
- React Router for navigation
- Axios for HTTP requests

### Backend

- Node.js with Express.js
- MongoDB with Mongoose
- Stream Video Node SDK
- Stream Chat Node SDK
- Clerk Express middleware
- Inngest for webhook processing
- REST-based API architecture

### Realtime Communication

- Stream Video (WebRTC-based video & screen sharing)
- Stream Chat (WebSocket-based real-time messaging)

---

## How Sessions Work

### Session Rules

- Each session supports **exactly two users**
- Both users must attempt the **same problem**
- Code is written locally by each user
- Code sharing happens **only via optional screen sharing**

---

### Public Sessions

Public sessions are visible to all users.  
Any user can join a public session as long as there is an available slot.

---

### Private Sessions

Private sessions are protected by a password.  
They are not listed publicly and can only be joined by users who know the password.

---

## Interaction Model

- **Video Call**: Optional, for face-to-face discussion
- **Chat**: Used for casual discussion, sharing snippets, or explanations
- **Screen Sharing**: Optional, used when one user wants to explain their approach or code visually
- **No Shared Editor**: Each user controls their own code environment

---

## Security Considerations

- Authentication handled by Clerk (JWT-based)
- Private sessions protected by passwords
- Secure API access for all backend routes
- Stream handles encrypted video and chat communication
- Environment variables used for all sensitive credentials

---

## Target Users

- Beginners struggling with coding consistency
- Learners who want peer-based problem solving
- Developers who prefer discussion over isolated practice

---

## Future Improvements

- Code execution and judging support
- Progress tracking and streaks
- Skill-based session matching
- Problem difficulty recommendations
- Optional group sessions
- Lightweight analytics for learning patterns

---

## License

MIT License
