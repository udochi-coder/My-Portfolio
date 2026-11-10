<div align="center">

# 🍔 FoodDash

### A real-time restaurant ordering system — because "refresh to check your order" is not a feature.

[![Go](https://img.shields.io/badge/Go-1.21-00ADD8?style=flat&logo=go&logoColor=white)](https://golang.org)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-336791?style=flat&logo=postgresql&logoColor=white)](https://postgresql.org)
[![Docker](https://img.shields.io/badge/Docker-ready-2496ED?style=flat&logo=docker&logoColor=white)](https://docker.com)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat)](LICENSE)

**[🚀 Live Demo](https://your-app.vercel.app)** · **[📡 API](https://your-api.onrender.com/api/v1/menu)** · **[🐛 Report a Bug](https://github.com/odiliemmanuel/FoodDash/issues)**

</div>

---

## 📸 Screenshots

> *(Add screenshots here once the UI is built — menu page, cart, order tracker, staff dashboard)*

---

## 👥 Team

| Role | Name |
|------|------|
| 🔧 Backend Engineer | Odili Emmanuel |
| 🎨 Frontend Engineer | Udochi Peace |

---

## 🧠 Why We Built It This Way

These are the engineering decisions that shaped the project — not just *what* we built, but *why*.

- **Go over Node.js for the backend** — Go's concurrency model handles WebSocket connections and simultaneous order updates far more efficiently. A Goroutine per client is cheap; a Node thread is not.

- **WebSockets over polling** — The order tracker page opens a persistent WebSocket connection (`/ws/orders/:id`). When staff advance an order, the customer's screen updates in under 100ms — no polling loop, no wasted requests.

- **Database transactions for order placement** — `PlaceOrder` wraps order creation and cart clearing in a single GORM transaction. If anything fails mid-way, neither the order nor the cart change. No ghost orders, no stuck carts.

- **Server-side cart** — The cart lives in the database, not `localStorage`. A customer can add items on their phone and check out on a laptop. It also means cart state survives page refresh and logout.

- **FSM for order status** — Order transitions follow a strict finite state machine enforced on the backend. A `RECEIVED` order cannot jump to `DELIVERED`. Invalid transitions return `422` with the allowed next states in the response body — making the frontend and API contract explicit.

- **Docker multi-stage build** — The production image compiles the Go binary in one stage and copies only the static binary into a minimal Alpine image. Final image size is under 20MB.

---

## ✨ Features

**Customers**
- JWT-authenticated register and login
- Browse menu by category (unavailable items hidden automatically)
- Server-side cart — persists across devices and sessions
- Place delivery or pickup orders
- Real-time order status tracking via WebSocket
- Full order history

**Staff**
- View today's orders filtered by status
- Advance orders: `RECEIVED → PREPARING → READY → DELIVERED / PICKED_UP`
- Cancel orders at any valid stage
- Add, edit, and toggle menu items and categories from a live dashboard

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | Go 1.21, Gin, GORM |
| Database | PostgreSQL |
| Auth | JWT (golang-jwt/jwt v5) + bcrypt |
| Real-time | WebSockets (gorilla/websocket) |
| Frontend | React 18, Vite, Tailwind CSS, Axios, React Router v6 |
| DevOps | Docker (multi-stage), Docker Compose |
| Deployment | Render (API) · Vercel (UI) |

---

## 📁 Project Structure

```
FoodDash/
├── fooddash-api/               # Go backend
│   ├── config/                 # Env config loader
│   ├── db/                     # GORM connection & AutoMigrate
│   ├── handlers/               # auth, menu, cart, order, staff, websocket
│   ├── middleware/             # JWT auth, role guard, CORS
│   ├── models/                 # User, Category, MenuItem, Cart, Order
│   ├── routes/                 # Route registration
│   ├── ws/                     # WebSocket hub (gorilla)
│   ├── cmd/seed/               # DB seed script
│   ├── Dockerfile
│   ├── docker-compose.yml
│   └── main.go
│
└── fooddash-ui/                # React frontend
    └── src/
        ├── api/                # Axios client + all endpoint functions
        ├── components/         # Navbar, ProtectedRoute
        ├── context/            # AuthContext, CartContext
        ├── hooks/              # useOrderStatus (WebSocket), useStaffOrders
        └── pages/              # MenuPage, CartPage, OrderPage, StaffDashboard…
```

---

## 🗃 Data Model

```
User ──► Cart ──► CartItem ──► MenuItem ◄── Category
                                   ▲
Order ──► OrderItem ────────────────┘
```

**Order Status FSM**
```
RECEIVED ──► PREPARING ──► READY ──► DELIVERED
                                 └──► PICKED_UP  (pickup orders)

Any status ──► CANCELLED  (staff only, or customer while RECEIVED)
```

---

## 🚀 Getting Started

### Prerequisites
- Go 1.21+
- Node.js 18+
- PostgreSQL 14+ (or Docker)

### 1. Clone
```bash
git clone https://github.com/odiliemmanuel/FoodDash.git
cd FoodDash
```

### 2. Backend

```bash
cd fooddash-api
go mod tidy
```

Create `fooddash-api/.env`:
```env
DB_HOST=localhost
DB_USER=fooddash_user
DB_PASSWORD=yourpassword
DB_NAME=fooddash
DB_PORT=5432
PORT=8080
JWT_SECRET=replace_with_long_random_secret_at_least_32_chars
```

> ⚠️ Add `.env` to `.gitignore` before your first commit.

Set up the database and start:
```bash
psql -U postgres -c "CREATE DATABASE fooddash; CREATE USER fooddash_user WITH PASSWORD 'yourpassword'; GRANT ALL PRIVILEGES ON DATABASE fooddash TO fooddash_user;"

go run main.go

# Optional: seed categories and menu items
go run cmd/seed/main.go
```

### 3. Frontend

```bash
cd ../fooddash-ui
npm install
npm run dev
# → http://localhost:5173
```

### 4. Docker (spin up everything at once)

```bash
cd fooddash-api
docker-compose up       # starts PostgreSQL + API
docker-compose down -v  # stop and wipe data
```

---

## 📡 API Reference

### Public
| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/v1/auth/register` | Register a new customer |
| POST | `/api/v1/auth/login` | Login and receive JWT |
| GET | `/api/v1/menu` | Full menu (available items only) |

### Customer (JWT required)
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/cart` | Get cart |
| POST | `/api/v1/cart/items` | Add item |
| PATCH | `/api/v1/cart/items/:id` | Update quantity |
| DELETE | `/api/v1/cart/items/:id` | Remove item |
| DELETE | `/api/v1/cart` | Clear cart |
| POST | `/api/v1/orders` | Place order (wraps cart in DB transaction) |
| GET | `/api/v1/orders` | Order history |
| GET | `/api/v1/orders/:id` | Single order |

### Staff (JWT + staff role required)
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/staff/orders?status=` | Today's orders, filterable |
| PATCH | `/api/v1/staff/orders/:id/status` | Advance order status (FSM-validated) |
| GET | `/api/v1/staff/menu` | All items including unavailable |
| POST | `/api/v1/staff/menu` | Create item |
| PUT | `/api/v1/staff/menu/:id` | Edit item |
| PATCH | `/api/v1/staff/menu/:id/availability` | Toggle on/off |
| POST | `/api/v1/staff/categories` | Create category |

### WebSocket
```
ws://localhost:8080/ws/orders/:id
```
Connect to receive live order updates. The server pushes `{ data: order }` on every status change.

---

## 🌐 Deployment

### Backend → Render
1. New Web Service → connect repo → Root Directory: `fooddash-api/` → Runtime: **Docker**
2. Add a Render PostgreSQL database, copy connection details to env vars
3. Set `GIN_MODE=release` and a strong `JWT_SECRET`
4. Add your Vercel URL to `AllowOrigins` in `middleware/cors.go` before deploying

### Frontend → Vercel
1. New Project → import repo → Root Directory: `fooddash-ui/` → Framework: **Vite**
2. Add env var: `VITE_API_URL=https://your-render-url.onrender.com/api/v1`
3. Deploy — every `git push` rebuilds both services automatically

---

## 🧪 Quick Smoke Test

```bash
# Register
curl -X POST http://localhost:8080/api/v1/auth/register \
  -H 'Content-Type: application/json' \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Browse menu (no auth needed)
curl http://localhost:8080/api/v1/menu
```

---

## 📜 License

MIT © Odili Emmanuel & Udochi Peace
