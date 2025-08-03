# RAG Chat Storage Microservice

A NestJS-based backend service for storing and managing chat histories in Retrieval-Augmented Generation (RAG) chatbot systems.

## Features

- Store and manage chat sessions and messages
- Session management (rename, favorite, delete)
- Secure API endpoints with API key authentication
- Rate limiting to prevent abuse
- Health check endpoints
- Swagger/OpenAPI documentation
- MongoDB integration
- CORS configuration

## Prerequisites

- Node.js (v18+ recommended)
- npm (v9+)
- MongoDB (local or cloud instance)

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/SwapnilChidrawar/rag-chat-history.git
cd rag-chat-storage 
```

### 2. Install dependencies

```bash
npm install --legacy-peer-deps
```

### 3. Environment Setup
```bash
DATABASE_URL=mongodb://localhost:27017/rag-chat
API_KEY=your-secure-api-key-here
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:3000
```
## Running the Application

### 1. Development Mode

```bash
npm run start:dev
```

## API Documentation

http://localhost:3000/api

## Health Check
http://localhost:3000/health

## API Endpoints

### Sessions

1.POST /sessions - Create new chat session

2.GET /sessions/:userId - Get all sessions for a user

3.GET /sessions/:id/:userId - Get a specific session

4.PUT /sessions/:id/rename/:userId - Rename a session

5.PUT /sessions/:id/favorite/:userId - Toggle favorite status

6.DELETE /sessions/:id/:userId - Delete a session

### Messages

1.POST /messages - Add a message to a session

2.GET /messages/:sessionId - Get all messages for a session (with pagination)

3.DELETE /messages/:sessionId - Delete all messages for a session

## Testing

### Unit Tests

```bash
npm run test
```

