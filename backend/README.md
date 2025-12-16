# Backend API Documentation

This document provides comprehensive documentation for the PeerPrep backend API, including all available endpoints, request/response formats, and example test cases.

## Table of Contents
- [Base URL](#base-url)
- [Authentication](#authentication)
- [API Endpoints](#api-endpoints)
  - [Chat Routes](#chat-routes)
  - [Session Routes](#session-routes)
- [Data Models](#data-models)
  - [User Model](#user-model)
  - [Session Model](#session-model)
- [Test Cases](#test-cases)
  - [Chat Routes Tests](#chat-routes-tests)
  - [Session Routes Tests](#session-routes-tests)

## Base URL

All API endpoints are prefixed with `/api`. For example, the full URL for getting active sessions would be:
```
http://localhost:5000/api/sessions/active
```

## Authentication

Most endpoints require authentication using Clerk JWT tokens. Include the token in the Authorization header:

```
Authorization: Bearer <your_clerk_jwt_token>
```

## API Endpoints

### Chat Routes

#### Get Stream Token
- **Endpoint**: `GET /api/chat/token`
- **Description**: Retrieves a Stream token for chat functionality
- **Authentication**: Required
- **Response**:
  ```json
  {
    "token": "string",
    "userId": "string",
    "userName": "string",
    "userImage": "string"
  }
  ```

### Session Routes

#### Create Session
- **Endpoint**: `POST /api/sessions/`
- **Description**: Creates a new coding session
- **Authentication**: Required
- **Request Body**:
  ```json
  {
    "problem": "string",
    "difficulty": "easy|medium|hard"
  }
  ```
- **Response**:
  ```json
  {
    "session": {
      "_id": "string",
      "problem": "string",
      "difficulty": "string",
      "host": "ObjectId",
      "participant": "null|ObjectId",
      "status": "active",
      "callId": "string",
      "createdAt": "date",
      "updatedAt": "date"
    }
  }
  ```

#### Get Active Sessions
- **Endpoint**: `GET /api/sessions/active`
- **Description**: Retrieves all active sessions
- **Authentication**: Required
- **Response**:
  ```json
  {
    "sessions": [
      {
        "_id": "string",
        "problem": "string",
        "difficulty": "string",
        "host": {
          "name": "string",
          "profileImage": "string",
          "email": "string",
          "clerkId": "string"
        },
        "participant": {
          "name": "string",
          "profileImage": "string",
          "email": "string",
          "clerkId": "string"
        },
        "status": "active",
        "callId": "string",
        "createdAt": "date",
        "updatedAt": "date"
      }
    ]
  }
  ```

#### Get My Recent Sessions
- **Endpoint**: `GET /api/sessions/my-recent`
- **Description**: Retrieves recent sessions for the authenticated user (either as host or participant)
- **Authentication**: Required
- **Response**:
  ```json
  {
    "sessions": [
      {
        "_id": "string",
        "problem": "string",
        "difficulty": "string",
        "host": "ObjectId",
        "participant": "null|ObjectId",
        "status": "completed",
        "callId": "string",
        "createdAt": "date",
        "updatedAt": "date"
      }
    ]
  }
  ```

#### Get Session By ID
- **Endpoint**: `GET /api/sessions/:id`
- **Description**: Retrieves a specific session by its ID
- **Authentication**: Required
- **Parameters**:
  - `id` (path parameter): Session ID
- **Response**:
  ```json
  {
    "session": {
      "_id": "string",
      "problem": "string",
      "difficulty": "string",
      "host": {
        "name": "string",
        "email": "string",
        "profileImage": "string",
        "clerkId": "string"
      },
      "participant": {
        "name": "string",
        "email": "string",
        "profileImage": "string",
        "clerkId": "string"
      },
      "status": "active|completed",
      "callId": "string",
      "createdAt": "date",
      "updatedAt": "date"
    }
  }
  ```

#### Join Session
- **Endpoint**: `POST /api/sessions/:id/join`
- **Description**: Allows a user to join an active session as a participant
- **Authentication**: Required
- **Parameters**:
  - `id` (path parameter): Session ID
- **Response**:
  ```json
  {
    "session": {
      "_id": "string",
      "problem": "string",
      "difficulty": "string",
      "host": "ObjectId",
      "participant": "ObjectId",
      "status": "active",
      "callId": "string",
      "createdAt": "date",
      "updatedAt": "date"
    }
  }
  ```

#### End Session
- **Endpoint**: `POST /api/sessions/:id/end`
- **Description**: Ends a session (only the host can end a session)
- **Authentication**: Required
- **Parameters**:
  - `id` (path parameter): Session ID
- **Response**:
  ```json
  {
    "session": {
      "_id": "string",
      "problem": "string",
      "difficulty": "string",
      "host": "ObjectId",
      "participant": "ObjectId|null",
      "status": "completed",
      "callId": "string",
      "createdAt": "date",
      "updatedAt": "date"
    },
    "message": "Session ended successfully"
  }
  ```

## Data Models

### User Model
```javascript
{
  name: String,           // Required
  email: String,          // Required, Unique
  profileImage: String,   // Optional
  clerkId: String,        // Required, Unique
  timestamps: true        // Adds createdAt and updatedAt
}
```

### Session Model
```javascript
{
  problem: String,              // Required
  difficulty: String,           // Required, Enum: ['easy', 'medium', 'hard']
  host: ObjectId,               // Required, Reference to User
  participant: ObjectId,        // Optional, Reference to User
  status: String,               // Default: 'active', Enum: ['active', 'completed']
  callId: String,               // Stream video call ID
  timestamps: true              // Adds createdAt and updatedAt
}
```

## Test Cases

### Chat Routes Tests

#### GET /api/chat/token
- **Test Case 1**: Valid token request with authenticated user
  - Send request with valid Clerk JWT
  - Expect 200 status code
  - Expect response with token, userId, userName, and userImage
  
- **Test Case 2**: Invalid token request
  - Send request without Authorization header
  - Expect 401 status code
  - Expect error message "Missing Authorization header"
  
- **Test Case 3**: Expired token request
  - Send request with expired Clerk JWT
  - Expect 401 status code
  - Expect error message "Unauthorized"

### Session Routes Tests

#### POST /api/sessions/
- **Test Case 1**: Create session with valid data
  - Send request with valid problem and difficulty
  - Expect 201 status code
  - Expect response with session object containing _id, problem, difficulty, etc.
  
- **Test Case 2**: Create session without required fields
  - Send request missing problem or difficulty
  - Expect 400 status code
  - Expect error message "Problem and difficulty are required"
  
- **Test Case 3**: Create session without authentication
  - Send request without Authorization header
  - Expect 401 status code
  - Expect error message "Missing Authorization header"

#### GET /api/sessions/active
- **Test Case 1**: Get active sessions with authentication
  - Send request with valid Clerk JWT
  - Expect 200 status code
  - Expect response with sessions array (can be empty)
  
- **Test Case 2**: Get active sessions without authentication
  - Send request without Authorization header
  - Expect 401 status code
  - Expect error message "Missing Authorization header"

#### GET /api/sessions/my-recent
- **Test Case 1**: Get recent sessions with authentication
  - Send request with valid Clerk JWT
  - Expect 200 status code
  - Expect response with sessions array (can be empty)
  
- **Test Case 2**: Get recent sessions without authentication
  - Send request without Authorization header
  - Expect 401 status code
  - Expect error message "Missing Authorization header"

#### GET /api/sessions/:id
- **Test Case 1**: Get existing session by ID
  - Send request with valid session ID
  - Expect 200 status code
  - Expect response with session object
  
- **Test Case 2**: Get non-existent session by ID
  - Send request with invalid session ID
  - Expect 404 status code
  - Expect error message "Session not found"
  
- **Test Case 3**: Get session without authentication
  - Send request without Authorization header
  - Expect 401 status code
  - Expect error message "Missing Authorization header"

#### POST /api/sessions/:id/join
- **Test Case 1**: Join active session as participant
  - Send request with valid session ID that has no participant yet
  - Expect 200 status code
  - Expect response with updated session object showing participant
  
- **Test Case 2**: Join session that doesn't exist
  - Send request with invalid session ID
  - Expect 404 status code
  - Expect error message "Session not found"
  
- **Test Case 3**: Join completed session
  - Send request with valid session ID that has status "completed"
  - Expect 400 status code
  - Expect error message "Cannot join a completed session"
  
- **Test Case 4**: Host trying to join their own session
  - Send request with session ID where authenticated user is the host
  - Expect 400 status code
  - Expect error message "Host cannot join their own session as participant"
  
- **Test Case 5**: Join full session
  - Send request with session ID that already has a participant
  - Expect 409 status code
  - Expect error message "Session is full"

#### POST /api/sessions/:id/end
- **Test Case 1**: Host ends active session
  - Send request with valid session ID where authenticated user is the host
  - Expect 200 status code
  - Expect response with updated session object showing status "completed"
  
- **Test Case 2**: Non-host tries to end session
  - Send request with valid session ID where authenticated user is not the host
  - Expect 403 status code
  - Expect error message "Only the host can end the session"
  
- **Test Case 3**: End already completed session
  - Send request with session ID that already has status "completed"
  - Expect 400 status code
  - Expect error message "Session is already completed"
  
- **Test Case 4**: End session without authentication
  - Send request without Authorization header
  - Expect 401 status code
  - Expect error message "Missing Authorization header"