# Task Management Backend API

A scalable and secure REST API built using Node.js, Express, and MongoDB.  
This project implements authentication, role-based access control, and full CRUD functionality.

---

## Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Cookie-based Auth
- bcrypt (Password Hashing)

---

## Features

- User Registration & Login
- JWT-based Authentication
- Role-Based Access Control (Admin & User)
- Secure Cookie Handling
- CRUD APIs for Task Management
- Protected Routes using Middleware
- Ownership-based Access Control

---

## Roles

- **Admin**
  - Can access all tasks
  - Can update/delete any task

- **User**
  - Can create tasks
  - Can only access/update/delete their own tasks

---

## API Endpoints

### Auth Routes

- POST `/api/auth/register`
- POST `/api/auth/login`
- POST `/api/auth/logout`

### Task Routes (Protected)

- POST `/api/tasks`
- GET `/api/tasks`
- GET `/api/tasks/:id`
- PUT `/api/tasks/:id`
- DELETE `/api/tasks/:id`

---

## Authentication Flow

- JWT token is generated on login/register
- Stored in HTTP-only cookies
- Middleware verifies token and attaches user to request

---

## Security

- Password hashing using bcrypt
- HTTP-only cookies
- Role-based authorization
- Input validation (basic)

---

## Setup Instructions

```bash
git clone <repo-link>
cd backend
npm install