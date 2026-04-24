# Quick Start Guide - EventHive

## ✅ What's Been Connected

- ✅ Frontend authentication (Login/Register)
- ✅ Backend API endpoints
- ✅ JWT token management
- ✅ Protected routes (Dashboard, Calendar)
- ✅ User context across the app
- ✅ Automatic token injection in API calls

## 🚀 How to Run

### 1. Start MongoDB
Make sure MongoDB is running on your system.

### 2. Start Backend
```bash
cd backend
npm install
npm start
```

Expected output:
```
Server is running on port 5000
Connected to MongoDB
```

### 3. Start Frontend
```bash
cd frontend
npm install
npm run dev
```

Expected output:
```
VITE ready in xxx ms
➜  Local:   http://localhost:5173/
```

### 4. Open Browser
Navigate to: `http://localhost:5173`

## 🧪 Test the Connection

### Register a New User
1. Click "Register" in navbar
2. Fill in:
   - Full name: Your Name
   - Email: your@email.com
   - Password: yourpassword
   - Confirm password: yourpassword
   - Check "I agree to Terms"
3. Click "Create account"
4. You'll be redirected to Dashboard
5. Navbar will show "Hi, Your Name"

### Login
1. Click "Logout" (if logged in)
2. Click "Login"
3. Enter your email and password
4. Click "Sign in"
5. You'll be redirected to Dashboard

### Test Protected Routes
1. Try accessing `/dashboard` without logging in
2. You'll be redirected to `/login`
3. After logging in, you can access Dashboard and Calendar

## 📁 Key Files

### Frontend
- `frontend/src/services/api.js` - Axios configuration
- `frontend/src/services/authService.js` - Auth API calls
- `frontend/src/context/AuthContext.jsx` - Global auth state
- `frontend/src/pages/Login.jsx` - Login page
- `frontend/src/pages/Register.jsx` - Register page
- `frontend/src/components/Navbar.jsx` - Shows user info
- `frontend/src/components/ProtectedRoute.jsx` - Route protection
- `frontend/.env` - API URL configuration

### Backend
- `backend/controllers/authcontroller.js` - Auth logic
- `backend/routes/authRoutes.js` - Auth endpoints
- `backend/middleware/authMiddleware.js` - JWT verification
- `backend/server.js` - Express server

## 🔑 How It Works

### Registration Flow
1. User fills registration form
2. Frontend sends POST to `/api/auth/register`
3. Backend creates user with hashed password
4. Backend returns user data + JWT token
5. Frontend stores token in localStorage
6. Frontend updates auth context
7. User redirected to dashboard

### Login Flow
1. User enters credentials
2. Frontend sends POST to `/api/auth/login`
3. Backend verifies credentials
4. Backend returns user data + JWT token
5. Frontend stores token in localStorage
6. Frontend updates auth context
7. User redirected to dashboard

### Protected Routes
1. User tries to access `/dashboard`
2. ProtectedRoute checks if user is authenticated
3. If not authenticated → redirect to `/login`
4. If authenticated → show dashboard

### API Calls with Token
1. User makes API request (e.g., create event)
2. Axios interceptor adds token to headers
3. Backend middleware verifies token
4. If valid → process request
5. If invalid → return 401 error
6. Frontend intercepts 401 → redirect to login

## 🐛 Common Issues

### "Network Error"
- Backend not running
- Check: `http://localhost:5000`

### "User already exists"
- Email already registered
- Use different email or delete from MongoDB

### "Invalid credentials"
- Wrong email/password
- Check spelling and case

### Token not persisting
- Clear localStorage
- Restart frontend dev server

### CORS errors
- Check `app.use(cors())` in backend/server.js
- Restart backend

## 📝 Environment Variables

### Frontend `.env`
```
VITE_API_URL=http://localhost:5000/api
```

### Backend `.env`
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

## ✨ Features Working

- ✅ User registration
- ✅ User login
- ✅ User logout
- ✅ Token storage
- ✅ Protected routes
- ✅ User info in navbar
- ✅ Automatic token refresh
- ✅ Error handling
- ✅ Loading states

## 🎯 Next Steps

To complete the integration:

1. **Fetch Events** - Connect Home page to event API
2. **User Dashboard** - Show user's RSVP'd events
3. **RSVP Functionality** - Connect RSVP buttons
4. **Create Event** - Build create event form
5. **Event Details** - Fetch real event data
6. **Calendar** - Show user's events on calendar

See `FRONTEND_BACKEND_CONNECTION.md` for detailed integration guide.
