# EventHive

A modern, full-stack event discovery and management platform. Browse trending events, RSVP, create your own, and connect with a vibrant community — all in a sleek dark-themed UI.

![Tech Stack](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Node](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-06B6D4?logo=tailwindcss&logoColor=white)

---

## ✨ Features

- **🔍 Explore Events** — Browse real-time events via Ticketmaster API integration with category filters and search
- **📅 Event Management** — Create, edit, delete, and RSVP to events
- **🔐 Authentication** — Email/password registration & login with JWT tokens
- **🔑 Google OAuth** — One-click sign in/sign up with Google
- **👤 User Profiles** — View and edit your profile, bio, location, and avatar
- **💬 Comments** — Add comments on event pages
- **📆 Calendar View** — See your upcoming events in a calendar layout
- **📊 Dashboard** — Personalized dashboard with your created and joined events
- **🌙 Dark Theme** — Premium dark UI with amber accent colors throughout

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React 19** | UI framework |
| **React Router 7** | Client-side routing |
| **Vite 8** | Build tool & dev server |
| **TailwindCSS 3** | Utility-first styling |
| **Axios** | HTTP client |

### Backend
| Technology | Purpose |
|---|---|
| **Node.js + Express 5** | REST API server |
| **MongoDB + Mongoose 9** | Database & ODM |
| **Passport.js** | Google OAuth 2.0 strategy |
| **JWT** | Token-based authentication |
| **bcryptjs** | Password hashing |

---

## 📁 Project Structure

```
EventHive/
├── backend/
│   ├── config/
│   │   └── passport.js          # Google OAuth strategy
│   ├── controllers/
│   │   ├── authcontroller.js    # Register, login, profile
│   │   └── eventcontroller.js   # CRUD + RSVP + comments
│   ├── middleware/
│   │   └── authMiddleware.js    # JWT protect middleware
│   ├── models/
│   │   ├── User.js              # User schema
│   │   └── Events.js            # Event + comment schemas
│   ├── routes/
│   │   ├── authRoutes.js        # Auth endpoints
│   │   ├── eventRoutes.js       # Event endpoints
│   │   └── googleAuth.js        # Google OAuth flow
│   ├── server.js                # Express app entry point
│   └── .env                     # Environment variables
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── EventCard.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx  # Global auth state
│   │   ├── pages/
│   │   │   ├── Home.jsx         # Landing page
│   │   │   ├── Explore.jsx      # Browse events
│   │   │   ├── Login.jsx        # Sign in
│   │   │   ├── Register.jsx     # Sign up
│   │   │   ├── Dashboard.jsx    # User dashboard
│   │   │   ├── Profile.jsx      # User profile
│   │   │   ├── Calendar.jsx     # Calendar view
│   │   │   ├── EventDetails.jsx # Single event page
│   │   │   └── AuthSuccess.jsx  # Google OAuth callback handler
│   │   ├── services/
│   │   │   ├── api.js           # Axios instance
│   │   │   ├── authService.js   # Auth API calls
│   │   │   └── ticketmaster.js  # Ticketmaster API integration
│   │   └── App.jsx              # Root component + routes
│   ├── vercel.json              # Vercel SPA rewrite config
│   └── .env                     # Frontend environment variables
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+
- **MongoDB** (Atlas or local)
- **Google Cloud Console** project with OAuth 2.0 credentials
- **Ticketmaster API** key ([get one here](https://developer.ticketmaster.com/))

### 1. Clone the repository

```bash
git clone https://github.com/your-username/EventHive.git
cd EventHive
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in `/backend`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
FRONTEND_URL=http://localhost:5173
BACKEND_URL=http://localhost:5000
```

Start the server:

```bash
npm run dev    # with nodemon (development)
npm start      # without nodemon (production)
```

### 3. Setup Frontend

```bash
cd frontend
npm install
```

Create a `.env` file in `/frontend`:

```env
VITE_API_URL=http://localhost:5000/api
VITE_BACKEND_URL=http://localhost:5000
VITE_TICKETMASTER_KEY=your_ticketmaster_api_key
```

Start the dev server:

```bash
npm run dev
```

The app will be available at **http://localhost:5173**

### 4. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a project (or select existing)
3. Navigate to **APIs & Services → Credentials**
4. Create an **OAuth 2.0 Client ID** (Web application)
5. Add these **Authorized redirect URIs**:
   - `http://localhost:5000/api/auth/google/callback` (local dev)
   - `https://your-backend.onrender.com/api/auth/google/callback` (production)
6. Copy the Client ID and Client Secret to your backend `.env`

---

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/auth/register` | Register new user | ✗ |
| `POST` | `/api/auth/login` | Login with email/password | ✗ |
| `GET` | `/api/auth/profile` | Get current user profile | ✓ |
| `PUT` | `/api/auth/profile` | Update user profile | ✓ |
| `PUT` | `/api/auth/password` | Change password | ✓ |
| `GET` | `/api/auth/google` | Initiate Google OAuth | ✗ |
| `GET` | `/api/auth/google/callback` | Google OAuth callback | ✗ |

### Events
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/events` | Get all events | ✗ |
| `GET` | `/api/events/:id` | Get event by ID | ✗ |
| `POST` | `/api/events` | Create new event | ✓ |
| `PUT` | `/api/events/:id` | Update event | ✓ |
| `DELETE` | `/api/events/:id` | Delete event | ✓ |
| `POST` | `/api/events/:id/rsvp` | RSVP to event | ✓ |
| `POST` | `/api/events/:id/cancel-rsvp` | Cancel RSVP | ✓ |
| `POST` | `/api/events/:id/comments` | Add comment | ✓ |

---

## 🌐 Deployment

### Frontend → Vercel

1. Push your code to GitHub
2. Import the **frontend** folder on [Vercel](https://vercel.com)
3. Set environment variables in Vercel dashboard:
   - `VITE_API_URL` = `https://your-backend.onrender.com/api`
   - `VITE_BACKEND_URL` = `https://your-backend.onrender.com`
   - `VITE_TICKETMASTER_KEY` = your key
4. The `vercel.json` handles SPA routing automatically

### Backend → Render

1. Import the **backend** folder on [Render](https://render.com)
2. Set environment variables:
   - `FRONTEND_URL` = `https://your-app.vercel.app`
   - `BACKEND_URL` = `https://your-backend.onrender.com`
   - All other `.env` values (MONGO_URI, JWT_SECRET, Google credentials)
3. Set **Build Command**: `npm install`
4. Set **Start Command**: `npm start`

---

## 🔑 Environment Variables Reference

### Backend (`.env`)
| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://...` |
| `JWT_SECRET` | JWT signing secret | `mysecretkey` |
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID | `1234...apps.googleusercontent.com` |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Client Secret | `GOCSPX-...` |
| `FRONTEND_URL` | Frontend URL (for redirects & CORS) | `http://localhost:5173` |
| `BACKEND_URL` | Backend URL (for OAuth callback) | `http://localhost:5000` |

### Frontend (`.env`)
| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:5000/api` |
| `VITE_BACKEND_URL` | Backend root URL (for Google OAuth) | `http://localhost:5000` |
| `VITE_TICKETMASTER_KEY` | Ticketmaster API key | `SUZk8zy...` |

---

## 👤 Author

**Abhinav Choudhary**
