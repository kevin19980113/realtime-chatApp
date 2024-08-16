# Real-Time Chat Application

<a href="https://realtime-chatapp-dprz.onrender.com" target="_blank">
  <img src="/Thumbnail.png" alt="Twitter Clone Preview">
</a>

## Project Overview

This project is a full-stack real-time chat application.
It demonstrates core concepts in both frontend and backend development, with a focus on real-time communication.

## Features

- Secure user authentication and authorization using JWT with access and refresh tokens.
- Real-time messaging functionality powered by Socket.io, enabling instant communication between users.
- A responsive and intuitive user interface built with React and styled using Tailwind CSS and DaisyUI.
- Robust backend architecture using Express.js and PostgreSQL with Prisma ORM for efficient data management.
- Frontend state management combining React Query for server state and Zustand for client state.
- Comprehensive form handling and validation using react-hook-form and Zod.
- Custom error handling to provide a smooth user experience.

## Tech Stack

### Frontend

- React with TypeScript
- Vite as build tool
- React Router for navigation
- React Query for data fetching and managing cache
- Zustand for global state management
- React-hook-form for form handling
- Zod for schema validation
- Sonner for toast notifications
- Tailwind CSS and DaisyUI for styling

### Backend

- Node.js
- Express.js
- PostgreSQL with Prisma ORM
- Socket.io for real-time communication
- JWT for authentication

## Project Structure

The project is divided into two main parts:

1. Backend (/backend)

   - Controllers: Manage application logic and request handling
   - Routes: Define API endpoints
   - Middleware: Handle authentication, request processing, protect routes
   - Prisma: Database schema and operations

2. Frontend (/frontend)
   - Components: Reusable UI components
   - Pages: Main views of the application
   - Hooks: Custom React hooks
   - Context: React context for global state
   - Types: TypeScript type definitions

## Key Features Explained

- **Real-time Communication**: Utilizes Socket.io to enable instant messaging between users.
- **User Authentication**: Implements JWT-based authentication with access and refresh tokens for secure user sessions.
- **Database Integration**: Uses Prisma ORM with PostgreSQL for efficient data management.
- **Frontend State Management**: Combines React Query for server state and Zustand for client state management.
- **Form Handling and Validation**: Leverages react-hook-form with Zod for robust form management and validation.
- **Responsive Design**: Implements a mobile-first approach using Tailwind CSS and DaisyUI for a smooth user experience across devices.

## Future Enhancements

- Implement group chat functionality
- Add file sharing capabilities

## Link

- <a href="https://realtime-chatapp-dprz.onrender.com" target="_blank">Live Demo</a>
