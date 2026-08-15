# 🍕 Fast Pizza

A modern pizza ordering web application built with React and a RESTful backend API.

Fast Pizza is a practical pizza ordering application where users can browse the menu, manage their cart, place orders, authenticate with the application, and access protected features.

The main focus of this project was building and structuring the frontend application with React and integrating it with a REST API.

---

## 🚀 Project Overview

Fast Pizza was built as a practical frontend development project to work with a real REST API and understand how different parts of a modern React application work together.

The application includes:

- Pizza and menu browsing
- Shopping cart management
- Order creation
- Order tracking
- User registration
- User login
- JWT-based authentication
- Protected routes
- Persistent authentication
- Form handling
- API integration
- Loading and error states
- Client-side state management
- Server-state management
- Responsive UI

---

## 📸 Screenshots

> Screenshots will be added here.

### Home

![Home Screenshot](./screenshots/home.png)

### Menu

![Menu Screenshot](./screenshots/menu.png)

### Cart

![Cart Screenshot](./screenshots/cart.png)

### Login

![Login Screenshot](./screenshots/login.png)

### Order

![Order Screenshot](./screenshots/order.png)

---

# ✨ Features

## 🛒 Menu

Users can:

- Browse all available menu items
- View pizza information
- View ingredients and prices
- See sold-out items
- Access individual menu items

---

## 🛍️ Shopping Cart

The shopping cart allows users to:

- Add pizzas
- Remove pizzas
- Increase item quantity
- Decrease item quantity
- View the total number of items
- Calculate the cart total
- Prepare cart data for order creation

---

## 📦 Orders

Users can:

- Create new orders
- Enter customer information
- Submit their cart
- Choose priority delivery
- View individual orders
- Track order status
- Update order information where supported

The backend calculates order prices, including the priority fee.

The frontend sends the cart and order information to the API rather than calculating the final order price itself.

---

# 🔐 Authentication

The application implements JWT-based authentication.

Users can:

- Register
- Login
- Stay authenticated after refreshing the browser
- Access protected routes
- Retrieve their authenticated profile
- Logout

The authentication flow is:

```text
Register / Login
       ↓
    REST API
       ↓
   JWT + User
       ↓
Token → localStorage
User  → Zustand
       ↓
AuthInitializer
       ↓
GET /api/profile
       ↓
Restore authenticated user
       ↓
Protected Routes
```

---

# 🔑 Authentication Flow

## 1. Registration

The user submits their information:

```json
{
  "fullName": "Ali Rezaei",
  "phone": "09120000000",
  "password": "secret123"
}
```

The frontend sends:

```http
POST /api/auth/register
```

The backend creates the user and returns:

```json
{
  "token": "JWT_TOKEN",
  "user": {
    "id": 1,
    "fullName": "Ali Rezaei",
    "phone": "09120000000"
  }
}
```

---

## 2. Login

The user submits their phone number and password.

```http
POST /api/auth/login
```

Request:

```json
{
  "phone": "09120000000",
  "password": "secret123"
}
```

The backend returns:

```json
{
  "token": "JWT_TOKEN",
  "user": {
    "id": 1,
    "fullName": "Ali Rezaei",
    "phone": "09120000000"
  }
}
```

The frontend then stores:

```text
JWT
↓
localStorage
```

and:

```text
User
↓
Zustand
```

---

# 🔄 Authentication Persistence

One of the important parts of the project is restoring authentication after a browser refresh.

Zustand stores state in memory. Therefore, after a page refresh:

```text
user = null
```

However, the JWT is still available in localStorage.

The application uses an `AuthInitializer` to restore the authenticated user.

```text
Browser Refresh
       ↓
AuthInitializer
       ↓
Read token from localStorage
       ↓
Is there a token?
   ↙           ↘
 No             Yes
 ↓               ↓
Finish       GET /api/profile
                 ↓
          Backend verifies JWT
                 ↓
            User returned
                 ↓
            setUser(user)
                 ↓
       Authentication restored
```

---

# 🛡️ Protected Routes

Protected pages are handled through a custom `ProtectedRoute` component.

The application first checks whether authentication initialization is still running.

```text
Application starts
       ↓
AuthInitializer
       ↓
isLoading = true
       ↓
Authentication check
       ↓
isLoading = false
       ↓
ProtectedRoute
       ↓
     User?
   ↙       ↘
 Yes        No
 ↓           ↓
Render     /login
```

This prevents an authenticated user from being incorrectly redirected to the login page during the initial authentication check.

---

# 🧠 Client State vs Server State

The application separates client-side state from server-side data.

## Client State

Zustand is used for application state such as:

- Authenticated user
- Authentication state
- Logout state

## Server State

TanStack Query is used for data received from the backend, such as:

- Menu data
- Orders
- API loading states
- API errors
- Mutations
- Server-side cache

This separation makes responsibilities clearer and keeps the application easier to maintain.

---

# 🧰 Tech Stack

## Frontend

| Technology      | Purpose                      |
| --------------- | ---------------------------- |
| React           | Building the user interface  |
| React Router    | Client-side routing          |
| Zustand         | Client-side state management |
| TanStack Query  | Server-state management      |
| React Hook Form | Form handling and validation |
| Tailwind CSS    | Styling and responsive UI    |
| Fetch API       | HTTP requests                |
| React Icons     | Icons                        |

## Backend

The frontend communicates with a REST API built with:

| Technology     | Purpose            |
| -------------- | ------------------ |
| Node.js        | Runtime            |
| Express        | REST API           |
| SQLite         | Database           |
| better-sqlite3 | SQLite integration |
| JWT            | Authentication     |
| bcrypt         | Password hashing   |

> The backend API was provided for this project. My main focus was designing and implementing the React frontend, integrating the REST API, implementing authentication, managing application state, handling forms, and building the user interface.

---

# 🏗️ Frontend Architecture

The frontend is organized around separation of concerns between UI components, pages, state management, API services, hooks, and routing.

```text
frontend/
│
├── src/
│   │
│   ├── components/
│   │   ├── ui/
│   │   └── ...
│   │
│   ├── pages/
│   │   ├── Home/
│   │   ├── Menu/
│   │   ├── Cart/
│   │   ├── Login/
│   │   ├── Register/
│   │   ├── Order/
│   │   └── ...
│   │
│   ├── layouts/
│   │
│   ├── hooks/
│   │
│   ├── services/
│   │   └── auth.js
│   │
│   ├── stores/
│   │   └── authStore.js
│   │
│   └── App.jsx
│
└── package.json
```

---

# 🔄 Application Data Flow

The general data flow is:

```text
User Interaction
       ↓
React Component
       ↓
Hook / Service
       ↓
REST API
       ↓
Backend
       ↓
JSON Response
       ↓
State / TanStack Query
       ↓
UI Update
```

This structure helps keep API communication separate from presentation components.

---

# 🌐 API Integration

The frontend communicates with the backend through REST API endpoints.

## Authentication

```http
POST /api/auth/register
POST /api/auth/login
```

## Menu

```http
GET /api/menu
GET /api/menu/:id
```

## Orders

```http
GET /api/orders
GET /api/orders/:id
POST /api/orders
PATCH /api/orders/:id
```

## Profile

```http
GET /api/profile
PATCH /api/profile
```

Protected requests use:

```http
Authorization: Bearer <token>
```

---

# 👤 Profile

Authenticated users can retrieve their profile:

```http
GET /api/profile
```

with:

```http
Authorization: Bearer <token>
```

The backend returns the current authenticated user.

Example:

```json
{
  "id": 1,
  "fullName": "Ali Rezaei",
  "phone": "09120000000",
  "createdAt": "2026-08-07 07:52:29"
}
```

---

# 📝 Form Handling

Forms are implemented using React Hook Form.

The application uses React Hook Form for:

- Login
- Registration
- Order creation
- Customer information

Example:

```jsx
const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm();
```

Form validation is handled before sending requests to the backend.

---

# ⏳ Loading & Error Handling

Asynchronous operations are handled with loading and error states.

For example, during login:

```text
Submit
  ↓
Loading
  ↓
API Request
  ↓
 ┌───────────────┐
 ↓               ↓
Success         Error
 ↓               ↓
Save token      Show error
 ↓
Set user
 ↓
Navigate
```

A loading state prevents duplicate submissions while the request is in progress.

Errors returned from the API are displayed to the user.

---

# 🔎 API Debugging

During development, API requests were inspected using browser DevTools and API testing tools.

Important information to inspect includes:

- Request URL
- HTTP method
- Request body
- Request headers
- Authorization header
- Response status
- Response body
- Network errors

For authenticated requests:

```http
GET /api/profile

Authorization: Bearer eyJhbGciOi...
```

Common status codes used by the API include:

| Status | Meaning            |
| ------ | ------------------ |
| 200    | Successful request |
| 201    | Resource created   |
| 400    | Bad request        |
| 401    | Unauthorized       |
| 404    | Resource not found |
| 500    | Server error       |

---

# 📱 Responsive Design

The interface is built with Tailwind CSS and designed to work across different screen sizes.

The UI supports:

- Desktop
- Tablet
- Mobile

The goal was to keep the ordering experience simple, clear, and responsive.

---

# 🧪 Testing Authentication

The authentication flow can be tested with the following checklist:

- [ ] Register with valid information
- [ ] Register with invalid information
- [ ] Login with valid credentials
- [ ] Login with incorrect credentials
- [ ] Verify the JWT in localStorage
- [ ] Verify the authenticated user in Zustand
- [ ] Refresh the browser
- [ ] Verify that authentication is restored
- [ ] Access a protected route while authenticated
- [ ] Try accessing a protected route while logged out
- [ ] Logout
- [ ] Refresh after logout
- [ ] Test an invalid token
- [ ] Test expired authentication

---

# 🛠️ Getting Started

## Prerequisites

Make sure you have installed:

- Node.js
- npm

---

## Clone the Repository

```bash
git clone YOUR_REPOSITORY_URL
```

```bash
cd fast-pizza
```

---

# Frontend Setup

Navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

---

# Backend Setup

Open another terminal and navigate to the backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create the environment file:

```bash
cp .env.example .env
```

Configure:

```env
PORT=8000
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
```

Start the backend:

```bash
npm run dev
```

The backend runs on:

```text
http://localhost:8000
```

---

# 🗄️ Database

The backend uses SQLite.

The database is automatically created when the backend starts.

The database contains:

- Users
- Menu items
- Orders
- Order items

No external database server is required for local development.

---

# 📂 Repository Structure

The repository can be organized as:

```text
fast-pizza/
│
├── README.md
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── README.md
│
└── backend/
    ├── server.js
    ├── database.js
    ├── routes/
    ├── controllers/
    ├── middleware/
    ├── utils/
    ├── db/
    ├── images/
    ├── package.json
    └── README.md
```

The root README provides an overview of the complete project.

The frontend README can contain frontend-specific technical documentation.

The backend README contains detailed API documentation.

---

# 📚 What I Learned

This project was built as a practical frontend development project focused on working with a real REST API and building a complete React application around it.

During development, I practiced:

- Building reusable React components
- React Router
- Nested routes
- Protected routes
- React Hook Form
- REST API integration
- Fetch API
- Async JavaScript
- JWT authentication
- Authentication persistence
- Zustand
- TanStack Query
- Loading states
- Error handling
- API debugging
- Client state vs server state
- Responsive UI development
- Frontend architecture

One of the most important parts of the project was understanding the authentication lifecycle instead of treating login as simply a form submission.

---

# 🧠 Authentication Mental Model

The authentication architecture can be summarized as:

```text
LOGIN
  ↓
JWT
  ↓
localStorage
  ↓
Authenticated Request
  ↓
Authorization: Bearer <token>
  ↓
Backend
  ↓
Current User
  ↓
Zustand
  ↓
React UI
  ↓
ProtectedRoute
  ↓
Allow / Redirect
```

After a browser refresh:

```text
Browser Refresh
       ↓
Zustand resets
       ↓
Token remains in localStorage
       ↓
AuthInitializer
       ↓
GET /api/profile
       ↓
Backend validates JWT
       ↓
User returned
       ↓
Zustand restored
       ↓
Protected application
```

---

# 🔮 Future Improvements

Possible improvements for future versions include:

- Refresh token strategy
- HttpOnly cookie-based authentication
- Improved authentication security
- Centralized API error handling
- Axios interceptors
- Advanced form validation
- Unit tests
- Integration tests
- End-to-end testing
- Improved accessibility
- Production deployment
- Better API caching strategies
- More advanced authorization

---

# 🎯 Project Goals

The main goal of this project was not only to build a working pizza ordering application, but also to understand how a modern frontend communicates with a backend API.

The project helped me practice the complete flow:

```text
UI
↓
Form
↓
API Request
↓
Backend
↓
Response
↓
State Management
↓
UI Update
```

And for authentication:

```text
Login
↓
JWT
↓
Token Storage
↓
Authenticated Request
↓
User Restoration
↓
Protected Routes
```

---

# 👨‍💻 About This Project

Fast Pizza is a practical React frontend project focused on building a real-world user experience around a REST API.

The project focuses on:

**React + REST APIs + JWT Authentication + State Management + Routing + Forms + Responsive UI**

The backend API was provided as the service layer for the application, while the frontend was designed and implemented as the main focus of this project.

The goal was to move beyond isolated React exercises and practice building a complete frontend application that communicates with a real backend.

---

## ⭐ Key Technologies

```text
React
React Router
TanStack Query
React Hook Form
Zustand
Tailwind CSS
Fetch API
REST API
JWT Authentication
```

---

## 📌 Status

🚧 **Project Status: Completed for learning and portfolio purposes**

Future improvements and production-level features may be added over time.
