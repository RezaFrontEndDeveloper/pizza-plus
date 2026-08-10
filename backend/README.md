# Fast Pizza API

A small, no-nonsense REST API for a pizza ordering app, built to sit behind a React + React Router + TanStack Query + React Hook Form + Axios + Tailwind frontend (inspired by Jonas Schmedtmann's Fast Pizza project).

It exists to support the frontend, not to show off backend architecture — SQLite file database, no ORM, no Docker, no cloud services. Clone it, run it, build your UI against it.

## Tech stack

- Node.js + Express
- SQLite via `better-sqlite3` (no ORM)
- JWT authentication (`jsonwebtoken`)
- Password hashing with `bcrypt`

## Project structure

```
backend/
├── server.js          # app entry point
├── database.js         # SQLite connection, table creation, seed data
├── routes/              # route definitions
├── controllers/         # request handlers / business logic
├── middleware/          # auth guard + error handler
├── db/                  # pizza.sqlite lives here (auto-created)
├── images/              # static pizza images, served at /images
├── utils/                # jwt helpers, AppError
└── package.json
```

## Installation

```bash
npm install
cp .env.example .env
npm run dev
```

The server starts on `http://localhost:8000` by default. The SQLite database is created automatically at `db/pizza.sqlite` on first run and seeded with Persian menu data — you don't need to run any separate migration or seed command.

### Environment variables (`.env`)

| Variable         | Description                        | Default              |
|------------------|-------------------------------------|-----------------------|
| `PORT`           | Port the server listens on          | `8000`                |
| `JWT_SECRET`     | Secret used to sign JWTs            | *(set your own!)*     |
| `JWT_EXPIRES_IN` | JWT lifetime                        | `7d`                  |

## Database

SQLite, single file, no external DB server needed. Four tables:

- **users** — `id, fullName, phone, password, createdAt`
- **menu** — `id, name, description, ingredients, price, imageUrl, soldOut`
- **orders** — `id, userId, customer, phone, address, latitude, longitude, priority, status, orderPrice, priorityPrice, totalPrice, createdAt`
- **order_items** — `id, orderId, pizzaId, name, quantity, unitPrice, totalPrice`

Prices are stored as integers in **Toman**. The menu is seeded with 10 Persian items (پیتزا مخصوص، پیتزا پپرونی، پیتزا مرغ و قارچ، پیتزا سبزیجات، پیتزا گوشت، پیتزا چهار فصل، سیب زمینی، سالاد، دوغ، نوشابه). Delete `db/pizza.sqlite` and restart the server to reseed from scratch.

## Authentication

Register and log in with a phone number + password. On success you get a JWT — send it as `Authorization: Bearer <token>` on any protected route. There's no refresh token, no OAuth, no roles — logout is just the frontend discarding the token.

**Protected routes** (require the `Authorization` header): `GET /api/orders`, `GET /api/profile`, `PATCH /api/profile`.

**Public routes**: menu endpoints, `POST /api/orders`, `GET /api/orders/:id`, `PATCH /api/orders/:id` — this mirrors the original Fast React Pizza app, where anyone with an order ID can view or update it (e.g. from an order-confirmation link), without needing to be logged in. If a valid token *is* sent on `POST /api/orders`, the order gets linked to that user automatically.

## API Endpoints

### Auth

| Method | Endpoint             | Auth | Description        |
|--------|-----------------------|------|---------------------|
| POST   | `/api/auth/register`  | –    | Create a new user   |
| POST   | `/api/auth/login`     | –    | Log in, get a token |

**POST `/api/auth/register`**

Request:
```json
{
  "fullName": "Ali Rezaei",
  "phone": "09120000000",
  "password": "secret123"
}
```

Response `201`:
```json
{
  "token": "eyJhbGciOi...",
  "user": {
    "id": 1,
    "fullName": "Ali Rezaei",
    "phone": "09120000000",
    "createdAt": "2026-08-07 07:52:29"
  }
}
```

**POST `/api/auth/login`**

Request:
```json
{ "phone": "09120000000", "password": "secret123" }
```

Response `200`: same shape as register.

---

### Menu

| Method | Endpoint          | Auth | Description          |
|--------|--------------------|------|-----------------------|
| GET    | `/api/menu`        | –    | List all menu items   |
| GET    | `/api/menu/:id`    | –    | Get one menu item     |

**GET `/api/menu`** → `200`
```json
[
  {
    "id": 1,
    "name": "پیتزا مخصوص",
    "description": "پیتزای مخصوص خانه با مخلوطی سخاوتمندانه از مواد تازه",
    "ingredients": "پنیر موزارلا، قارچ، فلفل دلمه‌ای، زیتون، ذرت",
    "price": 185000,
    "imageUrl": "/images/pizza-special.svg",
    "soldOut": false
  }
]
```

**GET `/api/menu/999`** (missing) → `404`
```json
{ "message": "Menu item not found" }
```

---

### Orders

| Method | Endpoint          | Auth        | Description                          |
|--------|--------------------|-------------|----------------------------------------|
| GET    | `/api/orders`      | required    | List the logged-in user's own orders  |
| GET    | `/api/orders/:id`  | –           | Get a single order by id              |
| POST   | `/api/orders`      | optional    | Place a new order                      |
| PATCH  | `/api/orders/:id`  | –           | Update `priority` and/or `status`     |

**POST `/api/orders`**

Request:
```json
{
  "customer": "Ali Rezaei",
  "phone": "09120000000",
  "address": "Tehran, Valiasr St.",
  "latitude": 35.7,
  "longitude": 51.4,
  "priority": true,
  "cart": [
    { "pizzaId": 1, "name": "پیتزا مخصوص", "quantity": 2, "unitPrice": 185000 }
  ]
}
```

Response `201`:
```json
{
  "id": 1,
  "userId": 1,
  "customer": "Ali Rezaei",
  "phone": "09120000000",
  "address": "Tehran, Valiasr St.",
  "latitude": 35.7,
  "longitude": 51.4,
  "priority": true,
  "status": "preparing",
  "orderPrice": 370000,
  "priorityPrice": 74000,
  "totalPrice": 444000,
  "createdAt": "2026-08-07 07:52:29",
  "cart": [
    { "id": 1, "orderId": 1, "pizzaId": 1, "name": "پیتزا مخصوص", "quantity": 2, "unitPrice": 185000, "totalPrice": 370000 }
  ]
}
```

`priorityPrice` is calculated server-side as 20% of `orderPrice` when `priority` is `true`, and `totalPrice = orderPrice + priorityPrice`. The frontend never needs to compute prices itself.

Empty cart → `400`:
```json
{ "message": "Cart cannot be empty" }
```

**PATCH `/api/orders/:id`** — only `priority` and `status` are accepted; anything else in the body is ignored. `status` must be `"preparing"` or `"delivered"`.

Request:
```json
{ "status": "delivered" }
```

Response `200`: the full updated order (same shape as above).

---

### Profile

| Method | Endpoint         | Auth      | Description             |
|--------|-------------------|-----------|---------------------------|
| GET    | `/api/profile`    | required  | Get the logged-in user   |
| PATCH  | `/api/profile`    | required  | Update `fullName`/`phone` |

**GET `/api/profile`** (with `Authorization: Bearer <token>`) → `200`
```json
{
  "id": 1,
  "fullName": "Ali Rezaei",
  "phone": "09120000000",
  "createdAt": "2026-08-07 07:52:29"
}
```

## Error format

Every error response, regardless of status code, has the same shape:

```json
{ "message": "Order not found" }
```

Status codes used: `200`, `201`, `400`, `401`, `404`, `500`.

## Images

Pizza images are placeholder SVGs in `images/`, served statically at `/images/<file>` (e.g. `/images/pizza-special.svg`). Swap them for real photos any time — just keep the filenames referenced in `database.js`'s seed data in sync, or update the `imageUrl` values in the `menu` table.

## Notes for the frontend dev

- All list/detail GET endpoints are safe to use directly with TanStack Query — no pagination, no wrapping envelope, just plain JSON arrays/objects.
- `POST /api/orders` and `PATCH /api/orders/:id` pair naturally with React Hook Form + a TanStack Query mutation.
- Store the JWT (e.g. in memory or localStorage) after register/login and attach it via an Axios request interceptor as `Authorization: Bearer <token>`.
- `soldOut` and `priority` are real booleans in the JSON responses (SQLite stores them as 0/1 internally, the API converts them for you).
