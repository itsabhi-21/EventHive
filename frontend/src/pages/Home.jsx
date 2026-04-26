import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchEvents } from '../services/ticketmaster';
import Navbar from '../components/Navbar';

const categories = ['Music', 'Sports', 'Arts & Theatre', 'Film', 'Miscellaneous'];

const categoryIcons = {
  'Music': '♪',
  'Sports': '⚽',
  'Arts & Theatre': '◎',
  'Film': '🎬',
  'Miscellaneous': '⚒'
};

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeCategory, setActiveCategory] = useState('Music');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Fetch events when category changes
  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await fetchEvents({ keyword: activeCategory, city: 'Mumbai', size: 20 });
        const withImages = data.filter(event =>
          event.images?.some(img => img.ratio === '16_9' && img.width > 500)
        );
        setEvents(withImages.slice(0, 9));
      } catch (err) {
        console.error(err);
        setError('Failed to load events. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, [activeCategory]);

  // Search handler
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    setError('');
    try {
      const data = await fetchEvents({ keyword: searchQuery, city: 'Delhi', size: 20 });
      const withImages = data.filter(event =>
        event.images?.some(img => img.ratio === '16_9' && img.width > 500)
      );
      setEvents(withImages.slice(0, 9));
    } catch (err) {
      setError('Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F]">
      <Navbar/>

      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex flex-col justify-center px-8 md:px-20 pt-16">
        
        {/* Video Background */}
        <video
          autoPlay loop muted playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 0 }}
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>

        {/* Dark Overlay */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to right, rgba(0,0,0,0.92) 45%, rgba(245,158,11,0.12) 100%)',
          zIndex: 1
        }} />

        {/* Hero Content */}
        <div className="relative max-w-2xl" style={{ zIndex: 2 }}>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-full px-4 py-2 mb-6">
            <span className="text-amber-400">✦</span>
            <span className="text-sm text-gray-300">2,400+ community events this month</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4">
            Find the nights your <br />
            <span className="text-amber-400 italic">city won't forget.</span>
          </h1>

          {/* Subtext */}
          <p className="text-gray-400 text-lg mb-8 max-w-lg">
            Discover tech meetups, music nights, workshops and more. Built for people who'd rather be out than scrolling.
          </p>

          {/* Search Bar */}
          <div className="flex gap-3 mb-4">
            <div className="flex items-center gap-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-full px-4 py-3 flex-1">
              <span className="text-gray-500">🔍</span>
              <input
                type="text"
                placeholder="Search events, venues, vibes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="bg-transparent text-white placeholder-gray-500 outline-none w-full text-sm"
              />
            </div>
            <button
              onClick={handleSearch}
              className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-6 py-3 rounded-full transition-all duration-200"
            >
              Explore Events
            </button>
          </div>

          {/* Popular Tags */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-gray-500 text-sm">Popular:</span>
            {['Music', 'Sports', 'Comedy', 'Festival'].map((tag) => (
              <button
                key={tag}
                onClick={() => setSearchQuery(tag)}
                className="border border-[#2A2A2A] text-gray-400 text-xs px-3 py-1 rounded-full hover:border-amber-500 hover:text-amber-400 transition-all"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORY FILTER */}
      <section className="sticky top-0 z-30 bg-[#0F0F0F] border-b border-[#2A2A2A] px-8 py-4">
        <div className="flex gap-3 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200
                ${activeCategory === cat
                  ? 'bg-amber-500 text-black font-bold'
                  : 'bg-[#1A1A1A] text-gray-400 border border-[#2A2A2A] hover:border-amber-500 hover:text-amber-400'
                }`}
            >
              <span>{categoryIcons[cat]}</span>
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* EVENTS SECTION */}
      <section className="px-8 md:px-16 py-12">

        {/* Section Header */}
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-3xl font-bold text-white">
            {`${activeCategory} Events`}
          </h2>
          {!loading && (
            <span className="text-sm text-gray-500 border border-[#2A2A2A] px-3 py-1 rounded-full">
              {events.length} event{events.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>
        <p className="text-gray-500 text-sm mb-8">Tap to explore. Free unless noted.</p>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl overflow-hidden animate-pulse">
                <div className="w-full h-48 bg-[#2A2A2A]" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-[#2A2A2A] rounded w-3/4" />
                  <div className="h-3 bg-[#2A2A2A] rounded w-1/2" />
                  <div className="h-3 bg-[#2A2A2A] rounded w-2/3" />
                  <div className="h-8 bg-[#2A2A2A] rounded-xl mt-4" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">😕</p>
            <p className="text-gray-400">{error}</p>
            <button
              onClick={() => setActiveCategory('All')}
              className="mt-4 border border-amber-500 text-amber-400 px-6 py-2 rounded-full text-sm hover:bg-amber-500 hover:text-black transition-all"
            >
              Try again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && events.length === 0 && (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">🎭</p>
            <p className="text-gray-400">No events found in this category.</p>
            <button
              onClick={() => setActiveCategory('All')}
              className="mt-4 border border-amber-500 text-amber-400 px-6 py-2 rounded-full text-sm hover:bg-amber-500 hover:text-black transition-all"
            >
              View all events
            </button>
          </div>
        )}

        {/* Events Grid */}
        {!loading && !error && events.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl overflow-hidden hover:border-amber-500 transition-all duration-200 cursor-pointer group"
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={
                      event.images?.find(img => img.ratio === '16_9' && img.width >= 1024)?.url ||
                      event.images?.find(img => img.ratio === '16_9' && img.width > 500)?.url ||
                      event.images?.find(img => img.ratio === '16_9')?.url ||
                      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80'
                    }
                    alt={event.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Category Badge */}
                  <span className="absolute top-3 left-3 bg-amber-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                    {event.classifications?.[0]?.segment?.name || 'EVENT'}
                  </span>
                  {/* Date Badge */}
                  <span className="absolute top-3 right-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
                    {event.dates?.start?.localDate}
                  </span>
                </div>

                {/* Info */}
                <div className="p-5">
                  <h3 className="text-white font-bold text-lg mb-3 line-clamp-2 leading-snug">
                    {event.name}
                  </h3>
                  <div className="space-y-1 mb-4">
                    <p className="text-gray-400 text-sm">
                      🕐 {event.dates?.start?.localTime?.slice(0, 5) || 'TBA'}
                    </p>
                    <p className="text-gray-400 text-sm truncate">
                      📍 {event._embedded?.venues?.[0]?.name}, {event._embedded?.venues?.[0]?.city?.name}
                    </p>
                    {event.priceRanges && (
                      <p className="text-amber-400 text-sm font-medium">
                        💰 From ₹{Math.round(event.priceRanges[0]?.min)} onwards
                      </p>
                    )}
                  </div>
                  <a
                    href={event.url}
                    target="_blank"
                    rel="noreferrer"
                    className="block w-full text-center border border-amber-500 text-amber-400 font-bold py-2 rounded-xl hover:bg-amber-500 hover:text-black transition-all duration-200 text-sm"
                  >
                    Get Tickets →
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#2A2A2A] px-8 md:px-16 py-10 mt-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🔥</span>
              <span className="text-white font-bold text-xl">
                Event<span className="text-amber-400">Hive</span>
              </span>
            </div>
            <p className="text-gray-500 text-sm">Find your people. Go do the thing.</p>
          </div>
          <div className="flex gap-8 text-gray-500 text-sm">
            {['Explore', 'Host Event', 'About', 'Contact'].map(link => (
              <a key={link} href="#" className="hover:text-amber-400 transition-colors">{link}</a>
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-[#2A2A2A]">
          <p className="text-gray-600 text-xs">© 2026 EventHive. All rights reserved.</p>
          <p className="text-gray-600 text-xs">Built for cities that never sleep.</p>
        </div>
      </footer>

    </div>
  );
};

export default Home;