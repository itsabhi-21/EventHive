# Frontend-Backend Connection Guide

## API Services Created

### 1. Base API Configuration (`frontend/src/services/api.js`)
- Axios instance configured with base URL
- Automatic token injection for authenticated requests
- Response interceptor for handling 401 errors
- Base URL: `http://localhost:5000/api`

### 2. Authentication Service (`frontend/src/services/authService.js`)
- `register(userData)` - Register new user
- `login(credentials)` - Login user
- `logout()` - Logout user
- `getCurrentUser()` - Get current user from localStorage
- `isAuthenticated()` - Check if user is logged in

### 3. Event Service (`frontend/src/services/eventService.js`)
- `getAllEvents()` - Get all events
- `getEventById(id)` - Get single event
- `createEvent(eventData)` - Create new event
- `updateEvent(id, eventData)` - Update event
- `deleteEvent(id)` - Delete event
- `rsvpEvent(id)` - RSVP to event
- `cancelRsvp(id)` - Cancel RSVP
- `addComment(id, commentData)` - Add comment to event

## Authentication Context (`frontend/src/context/AuthContext.jsx`)
- Global authentication state management
- Provides user data across the app
- Methods: `login`, `register`, `logout`, `isAuthenticated`

## Updated Components

### 1. Login Page (`frontend/src/pages/Login.jsx`)
- ✅ Connected to `/api/auth/login` endpoint
- ✅ Stores token and user data in localStorage
- ✅ Redirects to dashboard on success
- ✅ Shows error messages
- ✅ Loading state during API call

### 2. Register Page (`frontend/src/pages/Register.jsx`)
- ✅ Connected to `/api/auth/register` endpoint
- ✅ Password confirmation validation
- ✅ Terms agreement validation
- ✅ Stores token and user data in localStorage
- ✅ Redirects to dashboard on success
- ✅ Shows error messages
- ✅ Loading state during API call

### 3. App.jsx
- ✅ Wrapped with AuthProvider for global auth state

### 4. Navbar (Needs Update)
- Should show user name when logged in
- Should show Dashboard link when authenticated
- Should have logout button

## Environment Variables

### Frontend (`.env`)
```
VITE_API_URL=http://localhost:5000/api
```

## Backend API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Events
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get event by ID
- `POST /api/events` - Create event (protected)
- `PUT /api/events/:id` - Update event (protected)
- `DELETE /api/events/:id` - Delete event (protected)
- `POST /api/events/:id/rsvp` - RSVP to event (protected)
- `POST /api/events/:id/cancel-rsvp` - Cancel RSVP (protected)
- `POST /api/events/:id/comments` - Add comment (protected)

## Next Steps to Complete Integration

### 1. Update Home Page
```javascript
import { useEffect, useState } from 'react';
import { eventService } from '../services/eventService';

// In component:
useEffect(() => {
  const fetchEvents = async () => {
    try {
      const data = await eventService.getAllEvents();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };
  fetchEvents();
}, []);
```

### 2. Update Dashboard Page
- Fetch user's RSVP'd events
- Fetch past events attended
- Fetch recommended events

### 3. Update Event Detail Page
```javascript
import { useParams } from 'react-router-dom';
import { eventService } from '../services/eventService';

const { id } = useParams();

useEffect(() => {
  const fetchEvent = async () => {
    try {
      const data = await eventService.getEventById(id);
      setEvent(data);
    } catch (error) {
      console.error('Error fetching event:', error);
    }
  };
  fetchEvent();
}, [id]);
```

### 4. Update EventCard Component
- Add RSVP functionality
- Connect to event detail page with real IDs

### 5. Update Calendar Page
- Fetch user's RSVP'd events
- Display on calendar

## How to Run

### Backend
```bash
cd backend
npm install
npm start
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Testing the Connection

1. Start backend server (should run on port 5000)
2. Start frontend dev server (should run on port 5173)
3. Try registering a new user
4. Try logging in
5. Check if token is stored in localStorage
6. Check if user data appears in navbar

## CORS Configuration

Backend already has CORS enabled in `server.js`:
```javascript
app.use(cors());
```

## Token Storage

- Token stored in localStorage as 'token'
- User data stored in localStorage as 'user'
- Automatically included in API requests via interceptor

## Error Handling

- 401 errors automatically redirect to login
- Error messages displayed in forms
- Loading states prevent multiple submissions
