
# Role-Based Task Management System

A scalable and secure full-stack application built using Node.js, Express, MongoDB, and React.  
This project implements authentication, role-based access control, and full CRUD functionality.

---

## Live Demo

Frontend: https://role-based-crud-app-eight.vercel.app  
Backend: https://role-based-crud-app.onrender.com/api/v1  

---

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Token (JWT)
- Cookie-based Authentication
- bcrypt (Password Hashing)
- React (Frontend)
- Axios

---

## Features

- User registration and login
- JWT-based authentication using HTTP-only cookies
- Role-based access control (Admin and User)
- Protected routes using middleware
- CRUD APIs for task management
- Ownership-based access control
- API versioning using `/api/v1`
- Full-stack deployment using Render and Vercel

---

## Roles

### Admin
- Can access all tasks
- Can update and delete any task

### User
- Can create tasks
- Can access, update, and delete only their own tasks

---

## API Endpoints

### Authentication Routes

- POST `/api/v1/auth/register`
- POST `/api/v1/auth/login`
- GET `/api/v1/auth/me`
- POST `/api/v1/auth/logout`

### Task Routes (Protected)

- GET `/api/v1/tasks`
- POST `/api/v1/tasks`
- GET `/api/v1/tasks/:id`
- PUT `/api/v1/tasks/:id`
- DELETE `/api/v1/tasks/:id`

---

## Authentication Flow

1. User registers or logs in
2. Server generates a JWT token
3. Token is stored in an HTTP-only cookie
4. Middleware verifies the token on protected routes
5. Authenticated user is attached to `req.user`
6. Frontend calls `/auth/me` on refresh to restore session

---

## Security

- Password hashing using bcrypt
- HTTP-only cookies to prevent client-side access
- Secure and SameSite cookie configuration
- Role-based authorization
- Middleware-based route protection
- Basic input validation

---

## Scalability

This application is designed with scalability in mind:

- API versioning (`/api/v1`) ensures backward compatibility
- Stateless authentication using JWT allows horizontal scaling
- Database can be scaled using MongoDB Atlas (replication and sharding)
- Redis can be introduced for caching frequently accessed data
- Load balancers can distribute traffic across multiple instances
- Microservices architecture can be adopted as the system grows

---

## Setup Instructions

### Clone Repository

```bash
git clone https://github.com/bhaveshgunwant/role-based-crud-app.git
cd role-based-crud-app
```

---

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=3000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
ADMIN_SECRET=i_am_admin
```

Run backend:

```bash
npm run dev
```

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## API Documentation

Postman Collection:
`Backend/postman/postman_collection.json`

---

## Deployment

- Backend deployed on Render
- Frontend deployed on Vercel
- Uses HTTPS with secure cookie handling

---
