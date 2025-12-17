# PeerPrep

PeerPrep is a collaborative coding platform that combines LeetCode-style problem solving with real-time video conferencing, chat, and code sharing capabilities. It enables developers to practice coding interviews together in a shared environment with Google Meet-like collaboration features.

## Key Features

- LeetCode-style problem solving interface
- Real-time collaborative coding sessions (limited to 2 users per session)
- Public sessions (anyone can join)
- Private sessions (password protected)
- Video calling between participants
- Real-time chat
- Screen sharing
- Live reactions on shared screen
- Session creation, joining, and ending logic
- Secure access for private sessions

## Tech Stack

### Frontend

- React 18 with Vite
- Monaco Editor for code editing
- TailwindCSS with DaisyUI for styling
- Stream Video SDK for video calling
- Stream Chat SDK for real-time messaging
- Clerk for authentication
- TanStack Query for data fetching
- React Router for navigation
- Axios for HTTP requests

### Backend

- Node.js with Express.js
- MongoDB with Mongoose for data persistence
- Stream Chat Node SDK for chat functionality
- Stream Video Node SDK for video calling
- Clerk Express for authentication
- Inngest for webhook processing
- Mongoose for MongoDB object modeling

### Realtime / Video / Streaming

- Stream Chat for real-time messaging
- Stream Video for WebRTC-based video calling
- WebSockets for real-time collaboration features

## System Architecture

PeerPrep follows a client-server architecture with real-time communication capabilities:

1. **Frontend Client**: React-based single-page application that handles user interactions, code editing, and real-time UI updates.
2. **Backend API**: Express.js server that manages RESTful API endpoints, database operations, and integration with third-party services.
3. **Real-time Services**: Stream's Video and Chat SDKs handle WebRTC connections for video calling and WebSocket connections for messaging.
4. **Database**: MongoDB stores user information, session metadata, and problem data.
5. **Authentication**: Clerk handles user authentication and provides JWT tokens for secure API access.
6. **Webhooks**: Inngest processes asynchronous events from Clerk for user lifecycle management.

The frontend communicates with the backend through REST APIs and connects directly to Stream's services for real-time features.

## Folder Structure

### Frontend

```
frontend/
├── src/
│   ├── api/           # API clients and request handlers
│   ├── components/    # Reusable UI components
│   ├── data/          # Static data like problems and language configs
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utility functions and service integrations
│   ├── pages/         # Page components for routing
│   ├── App.jsx        # Main application component
│   ├── index.css      # Global styles
│   └── main.jsx       # Entry point
├── index.html         # HTML template
├── vite.config.js     # Vite configuration
└── package.json       # Dependencies and scripts
```

### Backend

```
backend/
├── src/
│   ├── controllers/   # Request handlers for routes
│   ├── lib/           # Utility functions and service integrations
│   ├── middleware/    # Express middleware functions
│   ├── models/        # Mongoose data models
│   ├── routes/        # API route definitions
│   └── server.js      # Server entry point
├── .env               # Environment variables
└── package.json       # Dependencies and scripts
```

## Environment Variables

### Frontend .env

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_API_URL=http://localhost:5000/api
VITE_STREAM_API_KEY=your_stream_api_key
```

### Backend .env

```env
PORT=5000
NODE_ENV=development
DB_URL=your_mongodb_connection_string
INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=your_inngest_signing_key
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
CLIENT_URL=http://localhost:5173
```

## Installation & Setup

### Frontend setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on the example above

4. Start the development server:
   ```bash
   npm run dev
   ```

### Backend setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on the example above

4. Start the development server:
   ```bash
   npm run dev
   ```

## Running the Application Locally

1. Ensure both frontend and backend servers are running
2. Access the application at `http://localhost:5173` (default Vite development server port)
3. Register or sign in using Clerk authentication
4. Create or join a coding session to begin collaborating

## How Sessions Work

### Public sessions

Public sessions are visible to all users on the platform. Any user can join a public session as long as there is space (sessions are limited to 2 participants). When creating a public session, no password is required, making it instantly accessible.

### Private (password-protected) sessions

Private sessions require a password to join. When creating a private session, the host sets a password that participants must enter to gain access. These sessions are not listed in the public session directory, providing a more exclusive collaboration environment.

## Real-Time Communication Flow

### Video

1. When a session is created, a unique Stream Video call ID is generated
2. Participants join the call using the session's call ID
3. Stream's WebRTC infrastructure handles peer-to-peer video connections
4. Video streams are managed through Stream's video SDK components

### Chat

1. Each session has an associated Stream Chat channel
2. When participants join a session, they are added to the channel
3. Messages are sent and received through WebSocket connections
4. Chat history is persisted by Stream's chat service

### Screen sharing

1. Screen sharing is built into Stream's video SDK
2. Participants can share their entire screen or specific applications
3. Shared content is transmitted through WebRTC data channels
4. Other participants can view the shared screen in real-time

### Reactions

1. Reactions are implemented as real-time events within the video session
2. When a user sends a reaction, it's broadcast to all session participants
3. The frontend displays animations or visual indicators for reactions
4. Reactions are ephemeral and don't persist beyond the session

## Security Considerations

- Authentication is handled by Clerk, providing secure JWT-based authentication
- All API requests require valid authentication tokens
- Password-protected sessions ensure only authorized users can join
- Stream's services handle encryption for video and chat communications
- Database connections are secured through MongoDB's authentication mechanisms
- Environment variables are used to keep sensitive keys out of the codebase

## Future Improvements

- Implement code execution environments for multiple languages
- Add session recording capabilities for video and code collaboration
- Introduce problem-solving analytics and progress tracking
- Enhance mobile responsiveness for better cross-device support
- Add support for larger group sessions
- Implement automated session matching based on skill levels
- Add integrated whiteboarding capabilities
- Introduce AI-powered code review and suggestions

## License

This project is licensed under the MIT License.