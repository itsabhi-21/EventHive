import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import API from '../services/api';

const EventDetail = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [event, setEvent] = useState(state?.eventData || null);
  const [loading, setLoading] = useState(!state?.eventData);
  const [hasRsvp, setHasRsvp] = useState(false);
  const [rsvpLoading, setRsvpLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // If no state data, try fetching from backend
    if (!state?.eventData) {
      fetchFromBackend();
    }
  }, [id]);

  useEffect(() => {
    if (user && event?.attendees) {
      setHasRsvp(event.attendees.some(a =>
        a._id === user._id || a === user._id
      ));
    }
  }, [event, user]);

  const fetchFromBackend = async () => {
    try {
      const { data } = await API.get(`/events/${id}`);
      setEvent(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRsvp = async () => {
    if (!user) { navigate('/login'); return; }
    setRsvpLoading(true);
    try {
      if (hasRsvp) {
        await API.delete(`/events/${id}/rsvp`);
        setHasRsvp(false);
        setMessage('RSVP cancelled successfully');
      } else {
        await API.post(`/events/${id}/rsvp`);
        setHasRsvp(true);
        setMessage('RSVP confirmed! See you there 🎉');
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'Something went wrong');
    } finally {
      setRsvpLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center">
        <div className="text-amber-400 text-xl animate-pulse">Loading event...</div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center">
        <div className="text-center">
          <p className="text-5xl mb-4">😕</p>
          <p className="text-gray-400 text-lg">Event not found</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 bg-amber-500 text-black font-bold px-6 py-2 rounded-full"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const isExternal = event.isExternal;
  const spotsLeft = event.capacity
    ? event.capacity - (event.attendees?.length || 0)
    : null;
  const isFull = spotsLeft !== null && spotsLeft <= 0;

  return (
    <div className="min-h-screen bg-[#0F0F0F]">
      <Navbar />

      {/* Hero Image */}
      <div className="relative h-[55vh] mt-24">
        <img
          src={event.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&q=80'}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-black/40 to-transparent" />

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-8 flex items-center gap-2 bg-black/50 hover:bg-black/70 text-white px-4 py-2 rounded-full text-sm transition-all"
        >
          ← Back
        </button>

        {/* Category badge */}
        <div className="absolute bottom-6 left-8 flex items-center gap-3">
          <span className="bg-amber-500 text-black text-xs font-bold px-4 py-1.5 rounded-full uppercase">
            {event.category}
          </span>
          {isExternal && (
            <span className="bg-black/60 text-amber-400 text-xs px-3 py-1.5 rounded-full border border-amber-500/30">
              via Ticketmaster
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-8 py-10 -mt-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Left — Main Info */}
          <div className="md:col-span-2 space-y-6">

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
              {event.title}
            </h1>

            {/* Date & Time */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl px-4 py-2">
                <span>📅</span>
                <span className="text-gray-300 text-sm">
                  {event.date
                    ? new Date(event.date).toLocaleDateString('en-US', {
                        weekday: 'long', year: 'numeric',
                        month: 'long', day: 'numeric'
                      })
                    : 'Date TBA'}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl px-4 py-2">
                <span>🕐</span>
                <span className="text-gray-300 text-sm">{event.time || 'TBA'}</span>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2">
              <span>📍</span>
              <span className="text-gray-300">
                {event.location?.address || 'Location TBA'}
              </span>
            </div>

            {/* About */}
            <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6">
              <h2 className="text-white font-bold text-lg mb-3">About this event</h2>
              <p className="text-gray-400 leading-relaxed">
                {event.description || 'No description available for this event.'}
              </p>
            </div>

            {/* Organizer — only for backend events */}
            {!isExternal && event.organizer && (
              <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6">
                <h2 className="text-white font-bold text-lg mb-3">Organized by</h2>
                <div className="flex items-center gap-3">
                  <img
                    src={`https://ui-avatars.com/api/?name=${event.organizer?.name}&background=f59e0b&color=000`}
                    alt={event.organizer?.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="text-white font-medium">{event.organizer?.name}</p>
                    <p className="text-gray-500 text-sm">{event.organizer?.email}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right — Action Card */}
          <div className="md:col-span-1">
            <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6 sticky top-24 space-y-4">
              <h3 className="text-white font-bold text-lg">
                {isExternal ? 'Get your tickets' : 'Reserve your spot'}
              </h3>

              {/* Spots bar — only for backend events */}
              {!isExternal && spotsLeft !== null && (
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Spots filled</span>
                    <span className="text-white font-medium">
                      {event.attendees?.length || 0} / {event.capacity}
                    </span>
                  </div>
                  <div className="w-full bg-[#2A2A2A] rounded-full h-2">
                    <div
                      className="bg-amber-500 h-2 rounded-full transition-all"
                      style={{
                        width: `${Math.min(((event.attendees?.length || 0) / event.capacity) * 100, 100)}%`
                      }}
                    />
                  </div>
                  <p className={`text-xs mt-2 ${isFull ? 'text-red-400' : 'text-amber-400'}`}>
                    {isFull ? 'Event is full!' : `${spotsLeft} spots remaining`}
                  </p>
                </div>
              )}

              {/* Date reminder */}
              <div className="bg-[#0F0F0F] rounded-xl p-4 border border-[#2A2A2A]">
                <p className="text-gray-500 text-xs mb-1">Date & Time</p>
                <p className="text-white text-sm font-medium">
                  {event.date
                    ? new Date(event.date).toLocaleDateString('en-US', {
                        month: 'long', day: 'numeric', year: 'numeric'
                      })
                    : 'TBA'}
                </p>
                <p className="text-gray-400 text-sm">{event.time || 'TBA'}</p>
              </div>

              {/* Message */}
              {message && (
                <div className={`text-sm px-4 py-3 rounded-xl ${
                  message.includes('cancelled')
                    ? 'bg-red-500/10 border border-red-500/30 text-red-400'
                    : 'bg-green-500/10 border border-green-500/30 text-green-400'
                }`}>
                  {message}
                </div>
              )}

              {/* ACTION BUTTON */}
              {isExternal ? (
                // External Ticketmaster event — open link
                <a
                  href={event.url}
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full text-center bg-amber-500 hover:bg-amber-400 text-black font-bold py-3 rounded-xl transition-all text-sm"
                >
                  🎟️ Get Tickets
                </a>
              ) : (
                // Internal backend event — RSVP
                <button
                  onClick={handleRsvp}
                  disabled={rsvpLoading || (isFull && !hasRsvp)}
                  className={`w-full font-bold py-3 rounded-xl transition-all text-sm disabled:opacity-50
                    ${hasRsvp
                      ? 'border border-red-500 text-red-400 hover:bg-red-500/10'
                      : 'bg-amber-500 hover:bg-amber-400 text-black'
                    }`}
                >
                  {rsvpLoading
                    ? 'Processing...'
                    : hasRsvp
                      ? 'Cancel RSVP'
                      : isFull
                        ? 'Event Full'
                        : 'RSVP Now 🎟️'}
                </button>
              )}

              {!user && !isExternal && (
                <p className="text-gray-500 text-xs text-center">
                  <span
                    onClick={() => navigate('/login')}
                    className="text-amber-400 cursor-pointer hover:underline"
                  >
                    Login
                  </span>{' '}
                  to RSVP for this event
                </p>
              )}
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EventDetail;