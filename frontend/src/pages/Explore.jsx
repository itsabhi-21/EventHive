import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import api from '../services/api';

const categories = ['All', 'Tech', 'Music', 'Sports', 'Education', 'Art', 'Other'];

const categoryMeta = {
  All:              { icon: '✦', accent: '#F59E0B' },
  Tech:             { icon: '💻', accent: '#3B82F6' },
  Music:            { icon: '♪', accent: '#EC4899' },
  Sports:           { icon: '⚽', accent: '#22C55E' },
  Education:        { icon: '📚', accent: '#8B5CF6' },
  Art:              { icon: '🎨', accent: '#A855F7' },
  Other:            { icon: '⚒', accent: '#6B7280' },
};

const categoryBadgeColor = {
  Tech:             'bg-blue-500',
  Music:            'bg-pink-500',
  Sports:           'bg-green-500',
  Education:        'bg-violet-500',
  Art:              'bg-purple-500',
  Other:            'bg-gray-500',
};

const FALLBACK_IMG =
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80';

/* ── tiny hook: staggered mount animation ── */
function useStagger(list) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(false);
    const t = setTimeout(() => setVisible(true), 30);
    return () => clearTimeout(t);
  }, [list]);
  return visible;
}

const Explore = () => {
  const [events, setEvents]               = useState([]);
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch]               = useState('');
  const visible = useStagger(events);

  useEffect(() => {
    fetchEvents();
  }, []);

  /* Map a Ticketmaster category name to our local categories */
  const mapTmCategory = (segmentName) => {
    const map = { Music: 'Music', Sports: 'Sports', Arts: 'Art', Film: 'Art', Miscellaneous: 'Other' };
    return map[segmentName] || 'Other';
  };

  const fetchEvents = async () => {
    setLoading(true);
    setError('');
    try {
      /* Fetch backend events + Ticketmaster events in parallel */
      const API_KEY = import.meta.env.VITE_TICKETMASTER_KEY;

      const [backendRes, tmRes] = await Promise.allSettled([
        api.get('/events'),
        API_KEY
          ? fetch(
              `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${API_KEY}&keyword=india&size=12&sort=date,asc`
            ).then((r) => r.json())
          : Promise.resolve(null),
      ]);

      /* Backend events */
      let backendEvents = [];
      if (backendRes.status === 'fulfilled') {
        const d = backendRes.value.data;
        backendEvents = Array.isArray(d) ? d : (d.events ?? []);
      }

      /* Ticketmaster events — normalise into the same shape */
      let tmEvents = [];
      if (tmRes.status === 'fulfilled' && tmRes.value?._embedded?.events) {
        tmEvents = tmRes.value._embedded.events
          .filter((e) => e.dates?.start?.localDate)
          .map((e) => ({
            _id: `tm-${e.id}`,
            title: e.name,
            category: mapTmCategory(
              e.classifications?.[0]?.segment?.name ?? ''
            ),
            date: e.dates.start.localDate,
            time: e.dates.start.localTime?.slice(0, 5) || 'TBA',
            location: {
              address:
                [
                  e._embedded?.venues?.[0]?.name,
                  e._embedded?.venues?.[0]?.city?.name,
                ].filter(Boolean).join(', ') || 'Online Event',
            },
            image:
              e.images?.find((img) => img.ratio === '16_9' && img.width > 500)
                ?.url ||
              e.images?.[0]?.url ||
              '',
            capacity: 100,
            attendees: [],
            url: e.url,
            isExternal: true,
          }));
      }

      setEvents([...backendEvents, ...tmEvents]);
    } catch (err) {
      console.error(err);
      setError('Failed to load events. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  /* client-side category & search filter */
  const filtered = events.filter((e) => {
    const matchesCategory = activeCategory === 'All' || e.category === activeCategory;
    const matchesSearch = search.trim() === '' ||
      e.title?.toLowerCase().includes(search.toLowerCase()) ||
      e.location?.address?.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const accentColor = categoryMeta[activeCategory]?.accent ?? '#F59E0B';

  return (
    <div style={{ fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif" }}
         className="min-h-screen bg-[#0A0A0A] text-white">

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Syne:wght@700;800&display=swap');

        .explore-card {
          transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
        }
        .explore-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.5);
        }
        .cat-btn {
          transition: all 0.18s ease;
          position: relative;
          overflow: hidden;
        }
        .cat-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: currentColor;
          opacity: 0;
          transition: opacity 0.18s;
        }
        .cat-btn:hover::after { opacity: 0.07; }
        .card-img img {
          transition: transform 0.38s ease;
        }
        .explore-card:hover .card-img img {
          transform: scale(1.07);
        }
        .stagger-in {
          opacity: 0;
          transform: translateY(18px);
          animation: fadeUp 0.42s ease forwards;
        }
        @keyframes fadeUp {
          to { opacity: 1; transform: translateY(0); }
        }
        .search-bar:focus {
          outline: none;
          box-shadow: 0 0 0 2px var(--accent);
        }
        .pill-active {
          color: #000;
          font-weight: 700;
        }
      `}</style>

      <Navbar />

      <main className="mt-20 px-6 md:px-14 xl:px-24 py-14">

        {/* ── Hero row ── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p style={{ fontFamily: "'Syne', sans-serif", color: accentColor }}
               className="text-xs font-bold uppercase tracking-widest mb-2 transition-colors duration-300">
              Discover · Explore · Attend
            </p>
            <h1 style={{ fontFamily: "'Syne', sans-serif" }}
                className="text-5xl md:text-6xl font-extrabold leading-none">
              What's<br />
              <span style={{ color: accentColor }} className="transition-colors duration-300">
                Happening
              </span>
            </h1>
          </div>

          {/* Search */}
          <div className="relative max-w-xs w-full">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">⌕</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search events or places…"
              className="search-bar w-full bg-[#161616] border border-[#2A2A2A] rounded-xl pl-9 pr-4 py-3 text-sm text-white placeholder-gray-600"
              style={{ '--accent': accentColor }}
            />
          </div>
        </div>

        {/* ── Category pills ── */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((cat) => {
            const meta = categoryMeta[cat];
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="cat-btn flex items-center gap-2 px-5 py-2 rounded-full text-sm border"
                style={{
                  background:   isActive ? accentColor       : '#161616',
                  borderColor:  isActive ? accentColor       : '#2A2A2A',
                  color:        isActive ? '#000'            : '#9CA3AF',
                }}
              >
                <span>{meta.icon}</span>
                <span className={isActive ? 'font-bold' : 'font-medium'}>{cat}</span>
              </button>
            );
          })}
        </div>

        {/* ── Results count ── */}
        {!loading && !error && (
          <p className="text-gray-600 text-xs mb-6 tracking-wide uppercase">
            {filtered.length} event{filtered.length !== 1 ? 's' : ''} found
          </p>
        )}

        {/* ── Loading skeleton ── */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-[#161616] rounded-2xl overflow-hidden animate-pulse">
                <div className="h-44 bg-[#222]" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-[#222] rounded w-3/4" />
                  <div className="h-3 bg-[#222] rounded w-1/2" />
                  <div className="h-3 bg-[#222] rounded w-2/3" />
                  <div className="h-8 bg-[#222] rounded mt-4" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Error state ── */}
        {error && !loading && (
          <div className="flex flex-col items-center justify-center py-28 gap-4">
            <span className="text-5xl">😕</span>
            <p className="text-gray-400 text-sm">{error}</p>
            <button
              onClick={fetchEvents}
              style={{ borderColor: accentColor, color: accentColor }}
              className="border px-6 py-2 rounded-full text-sm hover:opacity-80 transition-opacity"
            >
              Try again
            </button>
          </div>
        )}

        {/* ── Empty state ── */}
        {!loading && !error && filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-28 gap-3">
            <span className="text-5xl">🎭</span>
            <p className="text-gray-500 text-sm">
              {search ? `No results for "${search}"` : 'No events in this category yet.'}
            </p>
            {search && (
              <button onClick={() => setSearch('')}
                      className="text-xs text-gray-600 underline underline-offset-2">
                Clear search
              </button>
            )}
          </div>
        )}

        {/* ── Events grid ── */}
        {!loading && !error && filtered.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((event, idx) => {
              const badgeColor = categoryBadgeColor[event.category] ?? 'bg-amber-500';
              const spotsLeft  = (event.capacity ?? 0) - (event.attendees?.length ?? 0);
              const isSoldOut  = spotsLeft <= 0;
              const dateStr    = event.date
                ? new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                : 'TBA';

              return (
                <div
                  key={event._id}
                  className="explore-card bg-[#141414] border border-[#222] rounded-2xl overflow-hidden"
                  style={
                    visible
                      ? { animation: `fadeUp 0.42s ease ${idx * 0.05}s forwards`, opacity: 0 }
                      : {}
                  }
                >
                  {/* Image */}
                  <div className="card-img relative overflow-hidden h-44">
                    <img
                      src={event.image || FALLBACK_IMG}
                      alt={event.title}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.src = FALLBACK_IMG; }}
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Top badges */}
                    <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                      <span className={`${badgeColor} text-white text-[10px] font-bold px-2.5 py-1 rounded-full`}>
                        {event.category}
                      </span>
                      <span className="bg-black/70 backdrop-blur text-white text-[10px] px-2.5 py-1 rounded-full">
                        {dateStr}
                      </span>
                    </div>

                    {/* Sold out ribbon */}
                    {isSoldOut && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white font-bold text-sm tracking-widest uppercase border border-white/40 px-4 py-1 rounded">
                          Sold Out
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-4">
                    <h3 className="text-white font-bold text-sm leading-snug mb-3 line-clamp-2 min-h-[2.5rem]"
                        style={{ fontFamily: "'Syne', sans-serif" }}>
                      {event.title}
                    </h3>

                    <div className="space-y-1 mb-4">
                      <p className="text-gray-500 text-xs flex items-center gap-1.5">
                        <span>🕐</span>{event.time || 'TBA'}
                      </p>
                      <p className="text-gray-500 text-xs flex items-center gap-1.5 truncate">
                        <span>📍</span>
                        <span className="truncate">{event.location?.address || 'Location TBA'}</span>
                      </p>
                      <p className="text-xs flex items-center gap-1.5"
                         style={{ color: isSoldOut ? '#EF4444' : accentColor }}>
                        <span>👥</span>
                        {isSoldOut
                          ? 'No spots left'
                          : `${spotsLeft} spot${spotsLeft !== 1 ? 's' : ''} left`}
                      </p>
                    </div>

                    {event.isExternal ? (
                      <a
                        href={event.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          background: accentColor,
                          color: '#000',
                        }}
                        className="block w-full text-center font-bold py-2.5 rounded-xl text-xs transition-opacity hover:opacity-85"
                      >
                        View on Ticketmaster ↗
                      </a>
                    ) : (
                      <Link
                        to={`/events/${event._id}`}
                        state={{ eventData: event }}
                        style={{
                          background: isSoldOut ? '#1F1F1F' : accentColor,
                          color:      isSoldOut ? '#555'    : '#000',
                          cursor:     isSoldOut ? 'not-allowed' : 'pointer',
                        }}
                        className="block w-full text-center font-bold py-2.5 rounded-xl text-xs transition-opacity hover:opacity-85"
                        onClick={(e) => isSoldOut && e.preventDefault()}
                      >
                        {isSoldOut ? 'Unavailable' : 'View Details →'}
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Explore;