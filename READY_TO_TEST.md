# ✅ Ready to Test - Final Checklist

## Configuration Verified ✅

### Backend Configuration
- ✅ Port: 5000
- ✅ MongoDB: Connected to Atlas
- ✅ JWT Secret: Configured
- ✅ CORS: Enabled

### Frontend Configuration
- ✅ API URL: http://localhost:5000/api
- ✅ Axios: Installed and configured
- ✅ React Router: Installed
- ✅ Auth Context: Set up

## 🚀 Start the Application

### Terminal 1 - Backend
```bash
cd backend
npm start
```

**Expected Output:**
```
Server is running on port 5000
Connected to MongoDB
```

### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```

**Expected Output:**
```
VITE v8.x.x ready in xxx ms
➜  Local:   http://localhost:5173/
```

## 🧪 Test Authentication

### 1. Register New User
1. Open: `http://localhost:5173`
2. Click: **"Register"** button (top right)
3. Fill in:
   ```
   Full name: Test User
   Email: test@example.com
   Password: password123
   Confirm password: password123
   ✓ I agree to Terms
   ```
4. Click: **"Create account"**

**✅ Success Indicators:**
- Redirected to `/dashboard`
- Navbar shows: "Hi, Test User"
- "Logout" button visible
- No errors in console

**🔍 Verify in Browser:**
- Open DevTools (F12)
- Go to: Application → Local Storage → http://localhost:5173
- Should see:
  - `token`: Long string (JWT)
  - `user`: `{"id":"...","name":"Test User","email":"test@example.com"}`

### 2. Test Logout
1. Click: **"Logout"** in navbar
2. Should redirect to: `/` (home page)
3. Navbar shows: "Login" and "Register"

**🔍 Verify:**
- Local Storage should be empty (no token, no user)

### 3. Test Login
1. Click: **"Login"** in navbar
2. Enter:
   ```
   Email: test@example.com
   Password: password123
   ```
3. Click: **"Sign in"**

**✅ Success Indicators:**
- Redirected to `/dashboard`
- Navbar shows: "Hi, Test User"
- Token and user back in localStorage

### 4. Test Protected Routes
1. **While Logged Out:**
   - Try to access: `http://localhost:5173/dashboard`
   - Should redirect to: `/login`

2. **After Logging In:**
   - Access: `http://localhost:5173/dashboard`
   - Should show dashboard page

### 5. Test Page Refresh
1. Login to your account
2. Refresh the page (F5)
3. Should stay logged in
4. Navbar still shows your name

## 🐛 Troubleshooting

### Backend Not Starting
```bash
# Check if MongoDB is accessible
mongosh "mongodb+srv://abhinavch2105_db_user:Abhinav%4021@eventhive.tjtv0tr.mongodb.net/"

# Check if port 5000 is available
lsof -i :5000  # Mac/Linux
netstat -ano | findstr :5000  # Windows
```

### Frontend Not Starting
```bash
# Clear node_modules and reinstall
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### "Network Error" in Browser
1. Check backend is running: `http://localhost:5000`
2. Check browser console for CORS errors
3. Verify `.env` file has correct API URL

### "User already exists"
```bash
# Delete the test user from MongoDB
mongosh "your_mongodb_uri"
use eventhive
db.users.deleteOne({ email: "test@example.com" })
```

### Token Not Saving
1. Check browser console for errors
2. Clear localStorage manually
3. Try incognito/private window
4. Check if cookies are enabled

## 📊 API Testing (Optional)

Test backend directly with curl:

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "API Test",
    "email": "apitest@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "apitest@example.com",
    "password": "password123"
  }'
```

## ✅ Success Checklist

- [ ] Backend starts without errors
- [ ] Frontend starts without errors
- [ ] Can register new user
- [ ] Redirected to dashboard after registration
- [ ] User name appears in navbar
- [ ] Token stored in localStorage
- [ ] Can logout successfully
- [ ] Token removed from localStorage after logout
- [ ] Can login with registered credentials
- [ ] Redirected to dashboard after login
- [ ] Protected routes redirect to login when not authenticated
- [ ] Can access protected routes when authenticated
- [ ] Login persists after page refresh

## 🎉 If All Tests Pass

**Congratulations!** Your authentication system is working perfectly! 🚀

You can now:
- Register users
- Login users
- Protect routes
- Manage user sessions
- Build the rest of your application

## 📞 Need Help?

If something isn't working:
1. Check the error message in browser console
2. Check backend terminal for errors
3. Review `TESTING_AUTH.md` for detailed troubleshooting
4. Check `QUICK_START.md` for setup instructions

## 🎯 What's Next?

Now that authentication works, you can:
1. Connect events to the API
2. Build user dashboard with real data
3. Add RSVP functionality
4. Create event creation form
5. Add user profile page

See `FRONTEND_BACKEND_CONNECTION.md` for next steps!
