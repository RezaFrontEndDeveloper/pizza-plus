# 🍕 Pizza Plus

A full-stack pizza ordering application built with **React, Vite, Tailwind CSS, Node.js, Express, SQLite, and JWT authentication**.

Pizza Plus is a production-style food ordering application where users can browse the menu, create orders, authenticate with a phone number and password, and manage their profile and orders.

The project is split into a React frontend and a RESTful Express backend and is deployed online using Render.

---

## 🚀 Live Demo

### Frontend

[Pizza Plus — Live Demo](https://pizza-plus-frontend.onrender.com)

### Backend API

[Pizza Plus API](https://pizza-plus-1.onrender.com)

> **Note:** Render may not be directly accessible from some networks or regions. If the live application is unavailable, try accessing it through a different network or VPN.

---

## ✨ Features

- 🍕 Browse pizza and food menu
- 🔎 View individual menu items
- 🛒 Add products to cart
- 📦 Create and manage orders
- 👤 User registration
- 🔐 User login
- 🔑 JWT-based authentication
- 🛡️ Protected API routes
- 👤 User profile management
- 📋 View authenticated user's orders
- ⚡ Fast client-side navigation with React Router
- 📱 Responsive user interface
- 🎨 Modern UI built with Tailwind CSS
- 🌐 REST API architecture
- 💾 SQLite database
- 🚀 Frontend and backend deployment on Render

---

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- React Router
- Tailwind CSS
- JavaScript
- Fetch API
- React Hook Form
- Zustand
- TanStack Query

### Backend

- Node.js
- Express.js
- SQLite
- better-sqlite3
- JWT
- bcrypt
- REST API
- CORS

### Development & Deployment

- Git
- GitHub
- Postman
- Render

---

## 🏗️ Project Architecture

The project follows a simple full-stack architecture:

```text
                    ┌───────────────────┐
                    │      Client       │
                    │   React + Vite    │
                    └─────────┬─────────┘
                              │
                              │ HTTP / REST API
                              ▼
                    ┌───────────────────┐
                    │      Backend      │
                    │ Node.js + Express │
                    └─────────┬─────────┘
                              │
                              ▼
                    ┌───────────────────┐
                    │      SQLite       │
                    │     Database      │
                    └───────────────────┘
```

The frontend communicates with the backend through REST API endpoints.

Authentication is handled using JWT tokens.

---

## 📁 Project Structure

```text
pizza-plus/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── features/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── stores/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── ...
│
├── backend/
│   ├── controllers/
│   ├── db/
│   ├── images/
│   ├── middleware/
│   ├── routes/
│   ├── utils/
│   ├── database.js
│   ├── server.js
│   ├── package.json
│   └── ...
│
└── README.md
```

---

# 🔐 Authentication

Pizza Plus uses **JWT-based authentication**.

### Registration

Users can create an account using:

- Full name
- Phone number
- Password

```http
POST /api/auth/register
```

Example request:

```json
{
  "fullName": "Ali Rezaei",
  "phone": "09120000000",
  "password": "secret123"
}
```

The server returns a JWT token and user information.

---

### Login

```http
POST /api/auth/login
```

Example:

```json
{
  "phone": "09120000000",
  "password": "secret123"
}
```

After successful authentication, the API returns a JWT token.

The frontend stores the authentication token and sends it with protected requests using:

```http
Authorization: Bearer <token>
```

---

## 🛡️ Protected Routes

The following API routes require authentication:

```http
GET /api/orders
GET /api/profile
PATCH /api/profile
```

Public endpoints include menu operations and order operations that are intentionally exposed by the backend API.

---

# 📡 API

## Authentication

| Method | Endpoint             | Authentication | Description           |
| ------ | -------------------- | -------------- | --------------------- |
| POST   | `/api/auth/register` | No             | Register a new user   |
| POST   | `/api/auth/login`    | No             | Login and receive JWT |

---

## Menu

| Method | Endpoint        | Authentication | Description            |
| ------ | --------------- | -------------- | ---------------------- |
| GET    | `/api/menu`     | No             | Get all menu items     |
| GET    | `/api/menu/:id` | No             | Get a single menu item |

---

## Orders

| Method | Endpoint          | Authentication | Description                  |
| ------ | ----------------- | -------------- | ---------------------------- |
| GET    | `/api/orders`     | Yes            | Get current user's orders    |
| GET    | `/api/orders/:id` | No             | Get a specific order         |
| POST   | `/api/orders`     | Optional       | Create a new order           |
| PATCH  | `/api/orders/:id` | No             | Update order status/priority |

---

## Profile

| Method | Endpoint       | Authentication | Description         |
| ------ | -------------- | -------------- | ------------------- |
| GET    | `/api/profile` | Yes            | Get user profile    |
| PATCH  | `/api/profile` | Yes            | Update user profile |

---

# 💾 Database

The backend uses **SQLite** with `better-sqlite3`.

The database is automatically created when the backend starts.

Main tables include:

```text
users
menu
orders
order_items
```

The database is seeded with pizza and food menu data when initialized.

No external database server is required for local development.

---

# ⚙️ Local Development

## 1. Clone the repository

```bash
git clone https://github.com/RezaFrontEndDeveloper/pizza-plus.git
```

```bash
cd pizza-plus
```

---

# 🖥️ Run the Backend

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create your environment file:

```bash
cp .env.example .env
```

On Windows PowerShell you can use:

```powershell
Copy-Item .env.example .env
```

Configure your environment variables:

```env
PORT=8000
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
```

Start the development server:

```bash
npm run dev
```

The API will be available at:

```text
http://localhost:8000
```

You can verify the API by visiting:

```text
http://localhost:8000/api
```

---

# 🌐 Run the Frontend

Open another terminal and navigate to:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

# 🔗 Frontend API Configuration

The frontend communicates with the backend through a shared API base URL.

The current production API URL is:

```text
https://pizza-plus.onrender.com
```

API requests are built from this base URL.

For example:

```text
https://pizza-plus.onrender.com/api/menu
```

and:

```text
https://pizza-plus.onrender.com/api/auth/login
```

---

# 🚀 Deployment

The project is deployed using Render.

### Backend

The backend runs as a Node.js web service.

Production configuration:

```text
Build Command:
npm install
```

```text
Start Command:
npm start
```

The server uses:

```js
process.env.PORT || 8000;
```

and listens on:

```text
0.0.0.0
```

so it can receive external requests in the production environment.

### Frontend

The frontend is deployed as a static site.

```text
Root Directory:
frontend
```

```text
Build Command:
npm install && npm run build
```

```text
Publish Directory:
dist
```

The frontend is built using Vite and served as a production static application.

---

# 🧪 Testing the API

Postman can be used to test the REST API independently from the frontend.

Example registration request:

```http
POST /api/auth/register
Content-Type: application/json
```

```json
{
  "fullName": "Ali Rezaei",
  "phone": "09120000000",
  "password": "secret123"
}
```

Example login request:

```http
POST /api/auth/login
Content-Type: application/json
```

```json
{
  "phone": "09120000000",
  "password": "secret123"
}
```

The returned JWT can then be used to test protected endpoints.

---

# 🔒 Security Notes

This project implements basic authentication using:

- JWT for authentication
- bcrypt for password hashing
- Authorization headers for protected requests
- Environment variables for server configuration

The project is intended as a learning and portfolio project and is not designed as a production banking or enterprise-grade security system.

---

# 📚 What I Learned

Building Pizza Plus helped me practice several real-world frontend and full-stack concepts:

- Building a complete React application
- React component architecture
- React Router
- Client-side state management
- Server state management
- Form handling and validation
- REST API integration
- Authentication and authorization
- JWT authentication
- Protected routes
- Working with backend APIs
- Debugging API requests with Postman
- Git and GitHub workflows
- Production builds with Vite
- Deploying frontend applications
- Deploying Node.js APIs
- Debugging production deployment issues
- Connecting a deployed frontend to a deployed backend

---

# 🐛 Debugging & Deployment Experience

During deployment, the application required several production-specific fixes.

One of the important issues was the backend server binding.

The server initially listened on:

```text
localhost
```

which prevented external requests from reaching the API.

The server was updated to listen on:

```text
0.0.0.0
```

and use the port supplied by the hosting platform:

```js
const PORT = process.env.PORT || 8000;

app.listen(PORT, "0.0.0.0");
```

Another deployment issue was caused by filename case sensitivity.

The application worked locally on Windows but failed during the Linux-based production build because Linux treats filenames with different capitalization as different files.

For example:

```text
OrderInformations.jsx
```

and:

```text
orderInformations.jsx
```

must be referenced consistently.

These issues provided practical experience with the differences between local development environments and production environments.

---

# 🎯 Project Goals

The main goal of Pizza Plus was to build a realistic food ordering application while practicing modern frontend development and learning how frontend applications communicate with backend services.

The project also provided practical experience with deploying a full-stack application and debugging issues that only appear in production environments.

---

# 👨‍💻 Author

**Reza**

Frontend Developer focused on building modern web applications with React and JavaScript.

### GitHub

[RezaFrontEndDeveloper](https://github.com/RezaFrontEndDeveloper)

---

## ⭐ If you like this project

Feel free to explore the code, open an issue, or use the project as a learning reference.

Built with ❤️ and React.
