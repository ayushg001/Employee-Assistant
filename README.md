# PulseAI — Modern Workplace Copilot & Dashboard

A comprehensive workplace dashboard with an integrated assistant, employee directory, team analytics, and complete Round 2 backend services.

The codebase is split into distinct `client/` (React/Vite) and `server/` (Node.js/Express) directories with root orchestration.

---

## Project Structure

```
SocialWavez Assignment/
├── client/                     # React 19 Frontend (Vite)
│   ├── public/                 # Static assets
│   ├── src/                    # Components, pages, context, services
│   ├── index.html              # HTML entry point
│   ├── vite.config.js          # Vite config with /api proxy
│   ├── tailwind.config.js      # Tailwind CSS styling
│   ├── postcss.config.js       # PostCSS plugins
│   ├── .env                    # Frontend environment (VITE_GEMINI_API_KEY)
│   ├── .env.example
│   └── package.json            # Frontend dependencies
│
├── server/                     # Express 5 Backend (MVC Architecture)
│   ├── config/                 # Database connection (Mongoose)
│   ├── middleware/             # JWT auth & admin guard
│   ├── models/                 # User, Contact, Newsletter, Quote schemas
│   ├── controllers/            # Auth, Contact, Admin, Newsletter, Quote controllers
│   ├── routes/                 # Clean route definitions delegating to controllers
│   ├── index.js                # Server entry point
│   ├── seed.js                 # Admin seed script
│   ├── .env                    # Backend environment (PORT, MONGODB_URI, JWT_SECRET)
│   ├── .env.example
│   └── package.json            # Backend dependencies
│
├── package.json                # Root orchestration scripts
└── README.md
```

---

## Round 2 Backend & Platform Features

### 1. Functional Contact Form
- **Endpoint**: `POST /api/contact`
- Server-side validation for all required fields (`name`, `email`, `phone`, `subject`, `message`).
- User feedback with success / error messages on `/contact`.

### 2. User Authentication System (JWT + Bcrypt)
- **Endpoints**:
  - `POST /api/auth/register` — register with name, email, password.
  - `POST /api/auth/login` — login returning 7-day JWT token.
  - `GET /api/auth/profile` — protected route returning user profile.
- Passwords safely hashed using `bcryptjs`.
- Frontend `/login` and `/register` pages with auto-fill test buttons.
- Logged-in user's name displayed in the Navbar.
- Logout button clearing token from `localStorage`.

### 3. Admin Panel & Management
- **Endpoints** (All protected, returns 401 if unauthorized):
  - `GET /api/admin/contacts` — view all contact inquiries.
  - `DELETE /api/admin/contacts/:id` — delete a contact inquiry.
  - `GET /api/admin/users` — view registered users.
  - `GET /api/admin/quotes` — view quote requests.
- Frontend `/admin` page featuring 3 tabbed tables (Contacts, Users, Quotes), search filtering, refresh, and contact deletion.

### 4. Newsletter Subscription
- **Endpoint**: `POST /api/newsletter/subscribe`
- Email format validation.
- If email is already subscribed, returns: `"You are already subscribed"`.
- Live feedback displayed in the Footer.

### 5. Get a Free Quote Modal
- Homepage "Get a Free Quote" modal with fields: Name, Email, Phone, Service Required (dropdown), Budget (dropdown), Message.
- **Endpoint**: `POST /api/quote` — saves to database and displays confirmation.
- Submissions viewable in the Admin Panel under the Quotes tab.

---

## Database Collections (MongoDB)

1. **Users**: `id`, `name`, `email` (unique), `password` (bcrypt), `role` (`user` | `admin`), `createdAt`
2. **Contacts**: `id`, `name`, `email`, `phone`, `subject`, `message`, `createdAt`
3. **Newsletter**: `id`, `email` (unique), `subscribedAt`
4. **Quotes**: `id`, `name`, `email`, `phone`, `serviceRequired`, `budget`, `message`, `createdAt`

---

## Administrator Credentials (Seeded)

Run the database seed script to populate the admin account and sample records:

```bash
npm run seed
```

### Credentials:
- **Email**: `admin@pulseai.com`
- **Password**: `AdminPassword123!`
- **Role**: `admin`

---

## Getting Started

### 1. Install Dependencies
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 2. Environment Variables
- **Backend** (`server/.env`):
  ```env
  PORT=5000
  MONGODB_URI=mongodb://127.0.0.1:27017/pulseai
  JWT_SECRET=pulseai_super_secret_jwt_key_2026
  ```
- **Frontend** (`client/.env`):
  ```env
  VITE_GEMINI_API_KEY=your_gemini_api_key_here
  ```

### 3. Seed Database (Admin Credentials)
```bash
cd server
npm run seed
```

### 4. Run Development Servers
Open two terminal windows:

- **Terminal 1 — Backend API** (runs on port 5000):
  ```bash
  cd server
  npm run dev
  ```

- **Terminal 2 — Frontend App** (runs on port 5173 with proxy to port 5000):
  ```bash
  cd client
  npm run dev
  ```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Tech Stack
- **Frontend**: React 19, Vite, Tailwind CSS, Framer Motion, Lucide React, Recharts
- **Backend**: Node.js, Express 5, Mongoose 9, JWT (`jsonwebtoken`), `bcryptjs`, `cors`, `dotenv`
- **Database**: MongoDB
