# PrepMate AI - Coding Interview Preparation Platform

PrepMate AI is a collaborative coding interview preparation platform that allows users to practice coding problems together in real-time with video chat, code sharing, and execution capabilities.

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
- [Contributing](#contributing)
- [License](#license)

## Overview

PrepMate AI is designed to help software engineers prepare for technical interviews by providing a collaborative environment where they can practice coding problems with peers. The platform combines real-time video chat, shared code editing, and instant code execution to simulate a realistic interview setting.

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
- **React 18+** - JavaScript library for building user interfaces
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Component library for Tailwind CSS
- **React Router v7** - Declarative routing for React applications
- **React Query (TanStack Query)** - Data fetching and state management
- **Monaco Editor** - Code editor component (same as VS Code)
- **Stream Chat & Video SDK** - Real-time communication APIs
- **Clerk** - Authentication and user management

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
prepmate-ai/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── lib/             # Utilities and configurations
│   │   ├── middleware/      # Custom middleware functions
│   │   ├── models/          # Database models
│   │   ├── routes/          # API route definitions
│   │   └── server.js        # Main server entry point
│   ├── .env                 # Backend environment variables
│   └── package.json         # Backend dependencies
└── frontend/
    ├── src/
    │   ├── api/             # API service functions
    │   ├── components/      # Reusable UI components
    │   ├── data/            # Static data files
    │   ├── hooks/           # Custom React hooks
    │   ├── lib/             # Utility functions
    │   ├── pages/           # Page components
    │   ├── App.jsx          # Main App component
    │   └── main.jsx         # React DOM renderer
    ├── .env                 # Frontend environment variables
    └── package.json         # Frontend dependencies
```

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- npm or yarn package manager
- MongoDB database (local or cloud instance)
- Accounts for third-party services:
  - Clerk (Authentication)
  - Stream Chat & Video (Communication APIs)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/prepmate-ai.git
cd prepmate-ai
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
MONGO_URI=your_mongodb_connection_string
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

### Health Check
- `GET /test` - Check if the API is running

## Contributing

We welcome contributions to PrepMate AI! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please ensure your code follows the existing style and includes appropriate tests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

*PrepMate AI - Practice makes perfect, especially with the right partner!*