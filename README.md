# HireGenius AI – Smart Candidate Shortlisting Platform

A premium full-stack SaaS platform for modern HR teams to manage candidates, run AI-powered shortlisting, and generate interview-ready reports.

## Features

- Recruiter registration and login with JWT authentication
- Candidate management with resume uploads and AI score ranking
- Job requirement builder with advanced matching logic
- AI candidate ranking and interview question generation using OpenRouter
- Analytics dashboard with charts, search, filter, and shortlist management
- Responsive dark/light theme and premium dashboard UI
- MongoDB Atlas backend, Express API, and React/Vite frontend

## Project Structure

- `client/` - React frontend built with Vite and Tailwind CSS
- `server/` - Express backend with MongoDB, authentication, and OpenRouter integration

## Setup

1. Create `.env` in `server/` using `.env.example`.
2. Install backend dependencies:
   ```bash
   cd server
   npm install
   ```
3. Install frontend dependencies:
   ```bash
   cd ../client
   npm install
   ```
4. Start backend and frontend in parallel:
   ```bash
   cd ../server && npm run dev
   cd ../client && npm run dev
   ```

## Environment Variables

Create `server/.env` with:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=supersecretjwtkey
OPENROUTER_API_KEY=your_openrouter_api_key
OPENROUTER_MODEL=openai/gpt-5.2
PORT=5000
```