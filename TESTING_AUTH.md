# Testing Authentication - Step by Step Guide

## Prerequisites

1. **MongoDB** must be running
2. **Backend** must be running on port 5000
3. **Frontend** must be running on port 5173

## Step 1: Start the Backend

```bash
cd backend
npm install  # if not already done
npm start
```

You should see:
```
Server is running on port 5000
Connected to MongoDB
```

## Step 2: Start the Frontend

```bash
cd frontend
npm install  # if not already done
npm run dev
```

You should see:
```
VITE v8.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

## Step 3: Test Registration

1. Open browser to `http://localhost:5173`
2. Click "Register" button in navbar
3. Fill in the form:
   - Full name: `Test User`
   - Email: `test@example.com`
   - Password: `password123`
   - Confirm password: `password123`
   - Check "I agree to Terms"
4. Click "Create account"

**Expected Result:**
- You should be redirected to `/dashboard`
- Navbar should show "Hi, Test User"
- "Logout" button should appear

**Check Browser Console:**
- Open DevTools (F12)
- Go to Application > Local Storage > http://localhost:5173
- You should see:
  - `token`: JWT token string
  - `user`: JSON object with id, name, email

## Step 4: Test Logout

1. Click "Logout" in navbar
2. You should be redirected to home page
3. Navbar should show "Login" and "Register" buttons again

**Check Local Storage:**
- `token` and `user` should be removed

## Step 5: Test Login

1. Click "Login" in navbar
2. Enter credentials:
   - Email: `test@example.com`
   - Password: `password123`
3. Click "Sign in"

**Expected Result:**
- Redirected to `/dashboard`
- Navbar shows "Hi, Test User"
- Token and user data in localStorage

## Troubleshooting

### Error: "Network Error" or "Failed to fetch"

**Problem:** Backend not running or CORS issue

**Solution:**
1. Check backend is running: `http://localhost:5000`
2. Check backend console for errors
3. Verify CORS is enabled in `backend/server.js`

### Error: "User already exists"

**Problem:** Email already registered

**Solution:**
1. Use a different email
2. Or delete user from MongoDB:
   ```bash
   mongosh
   use eventhive  # or your database name
   db.users.deleteOne({ email: "test@example.com" })
   ```

### Error: "Invalid credentials"

**Problem:** Wrong email or password

**Solution:**
- Double-check email and password
- Passwords are case-sensitive

### Error: "Cannot read properties of undefined"

**Problem:** AuthContext not properly set up

**Solution:**
1. Check `App.jsx` is wrapped with `<AuthProvider>`
2. Restart frontend dev server

### Token not persisting after refresh

**Problem:** localStorage not being read on mount

**Solution:**
- Check browser console for errors
- Clear localStorage and try again
- Check AuthContext useEffect is running

## API Endpoints Being Used

### Register
```
POST http://localhost:5000/api/auth/register
Body: {
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}
Response: {
  "_id": "...",
  "name": "Test User",
  "email": "test@example.com",
  "token": "eyJhbGc..."
}
```

### Login
```
POST http://localhost:5000/api/auth/login
Body: {
  "email": "test@example.com",
  "password": "password123"
}
Response: {
  "_id": "...",
  "name": "Test User",
  "email": "test@example.com",
  "token": "eyJhbGc..."
}
```

## Testing with Postman/Thunder Client

You can also test the API directly:

1. **Register:**
   - Method: POST
   - URL: `http://localhost:5000/api/auth/register`
   - Headers: `Content-Type: application/json`
   - Body (raw JSON):
     ```json
     {
       "name": "API Test User",
       "email": "apitest@example.com",
       "password": "password123"
     }
     ```

2. **Login:**
   - Method: POST
   - URL: `http://localhost:5000/api/auth/login`
   - Headers: `Content-Type: application/json`
   - Body (raw JSON):
     ```json
     {
       "email": "apitest@example.com",
       "password": "password123"
     }
     ```

## Success Checklist

- [ ] Backend running on port 5000
- [ ] Frontend running on port 5173
- [ ] Can register new user
- [ ] Redirected to dashboard after registration
- [ ] User name appears in navbar
- [ ] Token stored in localStorage
- [ ] Can logout successfully
- [ ] Can login with registered credentials
- [ ] Token persists after page refresh
- [ ] Dashboard shows user info

## Next Steps

Once authentication is working:
1. Protect dashboard route (redirect to login if not authenticated)
2. Fetch user's events in dashboard
3. Connect event RSVP functionality
4. Add profile page
