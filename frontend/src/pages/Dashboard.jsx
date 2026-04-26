import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import API from '../services/api';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchDashboardData();
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      const API_KEY = import.meta.env.VITE_TICKETMASTER_KEY;

      // Fetch user's RSVP'd events from backend
      const { data: allEvents } = await API.get('/events');
      const myRsvps = allEvents.filter(e => e.attendees?.includes(user._id));
      const now = new Date();
      const upcoming = myRsvps.filter(e => new Date(e.date) >= now);
      setUpcomingEvents(upcoming);

      // Fetch recommended from Ticketmaster
      if (!API_KEY) {
        console.warn('Ticketmaster API key not set');
        setRecommended([]);
        setLoading(false);
        return;
      }

      const res = await fetch(
        `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${API_KEY}&keyword=india&size=6&sort=date,asc`
      );

      if (!res.ok) {
        console.error('Ticketmaster API error:', res.status);
        setRecommended([]);
        setLoading(false);
        return;
      }

      const tmData = await res.json();
      const tmEvents = tmData._embedded?.events || [];

      const mapped = tmEvents
        .filter(e => e.dates?.start?.localTime !== '00:00:00')
        .map(e => ({
          _id: e.id,
          title: e.name,
          category: (e.classifications?.[0]?.segment?.name !== 'Undefined'
            ? e.classifications?.[0]?.segment?.name
            : e.classifications?.[0]?.genre?.name || 'Event'
          ),
          date: e.dates?.start?.localDate,
          time: e.dates?.start?.localTime?.slice(0, 5) || 'TBA',
          location: {
            address: [
              e._embedded?.venues?.[0]?.name,
              e._embedded?.venues?.[0]?.city?.name,
            ].filter(Boolean).join(', ') || '🌐 Online Event'
          },
          image: e.images?.find(img => img.ratio === '16_9' && img.width > 500)?.url
            || e.images?.[0]?.url
            || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80',
          url: e.url,
          description: e.info || e.pleaseNote || 'No description available.',
          isExternal: true
        }));

      setRecommended(mapped);

    } catch (err) {
      console.error('Dashboard fetch error:', err);
      setRecommended([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelRsvp = async (eventId) => {
    try {
      await API.delete(`/events/${eventId}/rsvp`);
      setUpcomingEvents(prev => prev.filter(e => e._id !== eventId));
    } catch (err) {
      console.error(err);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      Music: 'bg-pink-500',
      Sports: 'bg-green-500',
      Arts: 'bg-purple-500',
      Film: 'bg-blue-500',
      Tech: 'bg-amber-500',
      Food: 'bg-red-500',
      Event: 'bg-amber-500',
    };
    return colors[category] || 'bg-amber-500';
  };

  const thisMonth = upcomingEvents.filter(e => {
    const eventDate = new Date(e.date);
    const now = new Date();
    return eventDate.getMonth() === now.getMonth() &&
      eventDate.getFullYear() === now.getFullYear();
  }).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center">
        <div className="text-amber-400 text-xl animate-pulse">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#000000]">
      <Navbar />

      <div className="max-w-[1400px] mx-auto px-12 py-12">

        {/* Profile Card */}
        <div className="mt-28 mb-12 border rounded-3xl p-10 bg-[#1a1a1a] border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src={`https://ui-avatars.com/api/?name=${user?.name}&background=f59e0b&color=000&size=80`}
                alt={user?.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-amber-500/30"
              />
              <div>
                <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                  🔥 Hey, {user?.name}! 👋
                </h1>
                <p className="text-[#888] text-sm mt-1">{user?.email}</p>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <div className="text-center bg-[#0f0f0f] px-8 py-5 rounded-2xl border border-[#2a2a2a] hover:border-amber-500/50 transition-all">
                <div className="text-3xl font-bold text-amber-400">{upcomingEvents.length}</div>
                <div className="text-[#888] text-xs uppercase mt-1 tracking-wide">Upcoming RSVPs</div>
              </div>
              <div className="text-center bg-[#0f0f0f] px-8 py-5 rounded-2xl border border-[#2a2a2a] hover:border-amber-500/50 transition-all">
                <div className="text-3xl font-bold text-amber-400">{thisMonth}</div>
                <div className="text-[#888] text-xs uppercase mt-1 tracking-wide">This Month</div>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming RSVPs */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">📅 Upcoming Events (RSVPs)</h2>
            <Link to="/explore" className="text-amber-400 text-sm hover:text-amber-300 transition">
              Explore more →
            </Link>
          </div>

          {upcomingEvents.length === 0 ? (
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-16 text-center">
              <p className="text-5xl mb-4">🎟️</p>
              <p className="text-gray-400 mb-2 text-lg font-medium">No upcoming events yet</p>
              <p className="text-gray-600 text-sm mb-6">Browse events and RSVP to see them here</p>
              <Link
                to="/explore"
                className="inline-block bg-amber-500 hover:bg-amber-400 text-black font-bold px-8 py-3 rounded-full transition-all text-sm"
              >
                Browse Events
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingEvents.map(event => (
                <div key={event._id} className="bg-[#0f0f0f] rounded-2xl overflow-hidden border border-[#1f1f1f] hover:border-amber-500 hover:shadow-lg hover:shadow-amber-500/5 transition-all group">
                  <div className="relative h-[180px] overflow-hidden">
                    <img
                      src={event.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80'}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className={`absolute top-3 left-3 ${getCategoryColor(event.category)} text-black text-[11px] font-bold px-3 py-1.5 rounded-full uppercase`}>
                      {event.category}
                    </span>
                    <span className="absolute top-3 right-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
                      {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-white font-bold text-lg mb-3 leading-tight line-clamp-2">{event.title}</h3>
                    <div className="space-y-2 text-[13px] text-[#888] mb-4">
                      <div className="flex items-center gap-2">
                        <span>🕐</span><span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>📍</span><span>{event.location?.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>👥</span>
                        <span>{event.attendees?.length} / {event.capacity} spots filled</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleCancelRsvp(event._id)}
                      className="w-full bg-transparent hover:bg-red-500/10 text-gray-400 hover:text-red-400 border border-[#2a2a2a] hover:border-red-500 font-semibold py-2.5 rounded-xl transition-all text-sm"
                    >
                      Cancel RSVP
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recommended For You */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-white">🔍 Recommended For You</h2>
            <Link to="/explore" className="text-amber-400 text-sm hover:text-amber-300 transition">
              View all →
            </Link>
          </div>
          <p className="text-[#888] text-sm mb-6">Events happening around you</p>

          {recommended.length === 0 ? (
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-16 text-center">
              <p className="text-5xl mb-4">🎭</p>
              <p className="text-gray-400 mb-2 text-lg font-medium">No recommendations yet</p>
              <p className="text-gray-600 text-sm">Check back soon for events near you</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommended.map(event => (
                <div key={event._id} className="bg-[#0f0f0f] rounded-2xl overflow-hidden border border-[#1f1f1f] hover:border-amber-500 hover:shadow-lg hover:shadow-amber-500/5 transition-all group">
                  <div className="relative h-[180px] overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className={`absolute top-3 left-3 ${getCategoryColor(event.category)} text-black text-[11px] font-bold px-3 py-1.5 rounded-full uppercase`}>
                      {event.category}
                    </span>
                    <span className="absolute top-3 right-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
                      {event.date
                        ? new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                        : 'TBA'}
                    </span>
                    {event.isExternal && (
                      <span className="absolute top-3 right-40 bg-black/70 text-amber-400 text-[10px] px-2 py-0.5 rounded-full border border-amber-500/30">
                        TM
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="text-white font-bold text-lg mb-3 leading-tight line-clamp-2">
                      {event.title}
                    </h3>
                    <div className="space-y-2 text-[13px] text-[#888] mb-4">
                      <div className="flex items-center gap-2">
                        <span>🕐</span><span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>📍</span>
                        <span className="line-clamp-1">{event.location?.address}</span>
                      </div>
                    </div>
                    <Link
                      to={`/events/${event._id}`}
                      state={{ eventData: event }}
                      className="block w-full text-center bg-amber-500 hover:bg-amber-400 text-black font-bold py-2.5 rounded-xl transition-all text-sm"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        

      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;