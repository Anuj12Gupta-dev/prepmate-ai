# PeerPrep - Coding Interview Preparation Platform

PeerPrep is a collaborative coding interview preparation platform that allows users to practice coding problems together in real-time with video chat, code sharing, and execution capabilities.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Application](#running-the-application)
- [Usage Guide](#usage-guide)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Authentication Flow](#authentication-flow)
- [Real-time Communication](#real-time-communication)
- [Code Execution](#code-execation)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Overview

PeerPrep AI is designed to help software engineers prepare for technical interviews by providing a collaborative environment where they can practice coding problems with peers. The platform combines real-time video chat, shared code editing, and instant code execution to simulate a realistic interview setting.

## Features

### Core Features
- **Real-time Video Chat**: Connect with peers for face-to-face interview practice
- **Collaborative Code Editor**: Write and edit code together in real-time with syntax highlighting
- **Multi-language Support**: Practice in various programming languages (JavaScript, Python, Java, etc.)
- **Instant Code Execution**: Run your code and see results instantly without leaving the platform
- **Coding Problem Library**: Access a curated collection of common interview problems
- **Session Management**: Create, join, and manage practice sessions
- **User Authentication**: Secure sign-up and login using Clerk authentication

### Additional Features
- **Problem Difficulty Levels**: Problems categorized by difficulty (Easy, Medium, Hard)
- **Session History**: Track your past practice sessions
- **Active Sessions Discovery**: Browse and join ongoing sessions hosted by others
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Technology Stack

### Frontend
- **React 19+** - JavaScript library for building user interfaces
- **Vite 7+** - Fast build tool and development server
- **Tailwind CSS 4+** - Utility-first CSS framework
- **DaisyUI 5+** - Component library for Tailwind CSS
- **React Router v7** - Declarative routing for React applications
- **React Query (TanStack Query) 5+** - Data fetching and state management
- **Monaco Editor** - Code editor component (same as VS Code)
- **Stream Chat & Video SDK** - Real-time communication APIs
- **Clerk** - Authentication and user management
- **Axios** - HTTP client for API requests

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js v5** - Web application framework
- **MongoDB with Mongoose** - NoSQL database and ODM
- **Inngest** - Event-driven background job processing
- **Stream Chat & Video API** - Real-time communication infrastructure
- **Clerk Express Middleware** - Authentication middleware

## Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend       │    │   Services      │
│   (React)       │    │   (Node/Express) │    │                 │
├─────────────────┤    ├──────────────────┤    ├─────────────────┤
│                 │    │                  │    │                 │
│  React Router   │    │   Controllers    │    │   MongoDB       │
│  React Query    │◄──►│   Middleware     │◄──►│   (Sessions)    │
│  Monaco Editor  │    │   Routes         │    │                 │
│  Stream SDK     │    │   Models         │    │   Stream API    │
│  Clerk Auth     │    │   Lib (Utils)    │    │   (Chat/Video)  │
│                 │    │                  │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## Project Structure

```
PeerPrep-ai/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   │   ├── chatController.js
│   │   │   └── sessionController.js
│   │   ├── lib/             # Utilities and configurations
│   │   │   ├── db.js
│   │   │   ├── env.js
│   │   │   ├── inngest.js
│   │   │   └── stream.js
│   │   ├── middleware/      # Custom middleware functions
│   │   │   └── protectRoute.js
│   │   ├── models/          # Database models
│   │   │   ├── Session.js
│   │   │   └── User.js
│   │   ├── routes/          # API route definitions
│   │   │   ├── chatRoutes.js
│   │   │   └── sessionRoute.js
│   │   └── server.js        # Main server entry point
│   ├── .env                 # Backend environment variables
│   └── package.json         # Backend dependencies
└── frontend/
    ├── src/
    │   ├── api/             # API service functions
    │   │   └── sessions.js
    │   ├── components/      # Reusable UI components
    │   │   ├── ActiveSessions.jsx
    │   │   ├── CodeEditorPanel.jsx
    │   │   ├── CreateSessionModal.jsx
    │   │   ├── Navbar.jsx
    │   │   ├── OutputPanel.jsx
    │   │   ├── ProblemDescription.jsx
    │   │   ├── RecentSessions.jsx
    │   │   ├── StatsCards.jsx
    │   │   ├── VideoCallUI.jsx
    │   │   └── WelcomeSection.jsx
    │   ├── data/            # Static data files
    │   │   └── problems.js
    │   ├── hooks/           # Custom React hooks
    │   │   ├── useSessions.js
    │   │   └── useStreamClient.js
    │   ├── lib/             # Utility functions
    │   │   ├── axios.js
    │   │   ├── piston.js
    │   │   ├── stream.js
    │   │   └── utils.js
    │   ├── pages/           # Page components
    │   │   ├── DashboardPage.jsx
    │   │   ├── HomePage.jsx
    │   │   ├── ProblemPage.jsx
    │   │   ├── ProblemsPage.jsx
    │   │   └── SessionPage.jsx
    │   ├── App.jsx          # Main App component
    │   └── main.jsx         # React DOM renderer
    ├── .env                 # Frontend environment variables
    └── package.json         # Frontend dependencies
```

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm or yarn package manager
- MongoDB database (local or cloud instance)
- Accounts for third-party services:
  - Clerk (Authentication)
  - Stream Chat & Video (Communication APIs)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/PeerPrep-ai.git
cd PeerPrep-ai
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

### Environment Variables

#### Backend (.env)
Create a `.env` file in the `backend/` directory with the following variables:
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
MONGO_URL=your_mongodb_connection_string
CLERK_SECRET_KEY=your_clerk_secret_key
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
INNGEST_SIGNING_KEY=your_inngest_signing_key
INNGEST_EVENT_KEY=your_inngest_event_key
```

#### Frontend (.env)
Create a `.env` file in the `frontend/` directory with the following variables:
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_STREAM_API_KEY=your_stream_api_key
VITE_BACKEND_URL=http://localhost:5000
```

### Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. Start the frontend development server:
```bash
cd frontend
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Usage Guide

### Creating an Account
1. Visit the homepage and click "Sign Up"
2. Complete the registration process using email or social login
3. Verify your email if required

### Starting a Practice Session
1. After logging in, you'll be redirected to the dashboard
2. Click "Create Session" to start a new practice session
3. Select a coding problem and difficulty level
4. Share the session link with a peer or wait for someone to join

### Joining a Session
1. From the dashboard, browse active sessions
2. Click "Join" on any available session
3. You'll be redirected to the session page

### Using the Collaborative Editor
1. The left panel displays the problem description and examples
2. The middle panel contains the code editor:
   - Select your preferred programming language
   - Write and edit code collaboratively
   - Click "Run Code" to execute your solution
3. The bottom panel shows the output of your code execution

### Video Chat
1. The right panel displays the video chat interface
2. Camera and microphone permissions will be requested
3. Built-in chat functionality for text communication

## API Endpoints

### Session Management
- `POST /api/sessions` - Create a new session
- `GET /api/sessions/active` - Get all active sessions
- `GET /api/sessions/my-recent` - Get user's recent sessions
- `GET /api/sessions/:id` - Get session by ID
- `POST /api/sessions/:id/join` - Join a session
- `POST /api/sessions/:id/end` - End a session

### Chat
- `GET /api/chat/token` - Get Stream Chat token

### Health Check
- `GET /` - Check if the API is running

## Database Schema

### User Model
```javascript
{
  name: String,          // Required
  email: String,         // Required, Unique
  profileImage: String,  // Optional
  clerkId: String        // Required, Unique
}
```

### Session Model
```javascript
{
  problem: String,               // Required
  difficulty: String,            // Enum: ["easy", "medium", "hard"]
  host: ObjectId (ref: User),    // Required
  participant: ObjectId (ref: User), // Optional
  status: String,                // Enum: ["active", "completed"], Default: "active"
  callId: String                 // Stream video call ID
}
```

## Authentication Flow

PeerPrep uses Clerk for authentication:
1. Users sign up/log in through Clerk's authentication system
2. Clerk provides a JWT token to the frontend
3. The frontend includes this token in the Authorization header for all API requests
4. The backend verifies the token using Clerk's verification middleware
5. If valid, the request proceeds; otherwise, a 401 Unauthorized response is sent

## Real-time Communication

The platform uses Stream's Chat and Video SDKs for real-time communication:
- **Video Calls**: Implemented using Stream Video SDK for peer-to-peer video communication
- **Text Chat**: Implemented using Stream Chat SDK for messaging within sessions
- **Session Synchronization**: Real-time updates for session status and participant information

## Code Execution

The platform supports code execution through integration with the Piston API:
- Multiple programming languages supported
- Secure code execution in isolated environments
- Real-time output streaming
- Error handling and timeout management

## Deployment

### Backend Deployment
1. Set up a MongoDB database (MongoDB Atlas recommended)
2. Deploy the Express server to a cloud provider (Vercel, Render, Heroku, etc.)
3. Configure environment variables in your deployment platform

### Frontend Deployment
1. Build the production version:
```bash
cd frontend
npm run build
```
2. Deploy the contents of the `dist/` folder to a static hosting service (Vercel, Netlify, etc.)

### Environment Configuration for Production
Ensure all environment variables are properly configured in your production environment, especially:
- `CLIENT_URL` should point to your frontend URL
- `MONGO_URI` should point to your production MongoDB instance
- All Clerk and Stream API keys should be production keys

## Contributing

We welcome contributions to PeerPrep! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please ensure your code follows the existing style and includes appropriate tests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---