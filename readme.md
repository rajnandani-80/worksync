# 🚀 Multi-User Workspace & Task Management API

A backend system built using **Node.js, Express, and MongoDB** that allows multiple users to create and manage workspaces, tasks, and comments with secure authentication and role-based access control.

Each workspace acts as an isolated collaboration space where users can work together on tasks.

---

# ⚙️ Tech Stack

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication
* Cookie-based auth
* bcrypt (password hashing)

---

# ✨ Features

## 👤 Authentication System
* User registration and login
* Password hashing using bcrypt
* JWT token generation
* Cookie-based session handling
* Protected routes using middleware

---

## 🏢 Workspace Management
* Create workspace
* Add members to workspace
* Owner-based control system
* Member-based access system

---

## ✅ Task Management
* Create tasks inside workspace
* Assign tasks to users
* Update task status (pending / in-progress / completed)
* Delete tasks
* Role-based permissions (owner / assigned user)

---

## 💬 Comments System
* Add comments to tasks
* Fetch comments for a task
* Track comment owner and timestamp

---

# 🔐 Access Control Rules

* Only logged-in users can access APIs
* Only workspace members can access workspace data
* Only workspace owner can:
  * Add members to workspace
* Only task creator or workspace owner can:
  * Update tasks
  * Delete tasks
* Only workspace members can:
  * Create and view tasks

---

# 📂 Project Structure
* models/
* controllers/
* routes/
* middleware/
* service/
* utilityFunction.js
* server.js

---

# 🧠 Key Learnings

* JWT authentication flow
* Middleware-based route protection
* Role-based access control (RBAC)
* MongoDB relationships using ObjectId
* Designing multi-user backend systems
* Real-world API structure design

---

# 📌 API Endpoints

## Auth Routes
* POST `/user/register` → Register user
* POST `/user/login` → Login user

---

## Workspace Routes
* POST `/workspace/create` → Create workspace
* POST `/workspace/add-member` → Add member to workspace
* GET `/workspace/:id` → Get workspace details

---

## Task Routes
* POST `/task` → Create task
* GET `/task/:workspaceId` → Get all tasks in workspace
* PATCH `/task/:id` → Update task
* DELETE `/task/:id` → Delete task
* POST `/task/:id/comment` → Add comment
* GET `/task/:id/comments` → Get comments

---

# 🚀 How to Run This Project
* npm install
* npm start

---

# 📌 Environment Variables (Optional Improvement)
* url=your_mongodb_url
* secret_key=your_secret_key


---

# 📸 API Testing

Use Postman to test endpoints:
* Register user
* Login and get cookie
* Create workspace
* Add members
* Create tasks
* Add comments

---

# 🔥 Future Improvements

* Refresh token system
* Pagination for tasks
* Search & filters for tasks
* Real-time notifications
* Frontend (React / React Native)
* Deployment (Render / AWS)

---

# 💡 Project Summary

This project demonstrates a **real-world backend system similar to tools like Jira or Trello**, featuring:

* Multi-user collaboration
* Secure authentication
* Role-based access control
* Scalable MongoDB schema design

