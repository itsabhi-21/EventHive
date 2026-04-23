import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const categories = ['All', 'Tech', 'Music', 'Sports', 'Art', 'Food', 'Workshops', 'Gaming', 'Wellness'];

const categoryIcons = {
  All: '✦', Tech: '</>',  Music: '♪', Sports: '⚽',
  Art: '◎', Food: '🍴', Workshops: '⚒', Gaming: '🎮', Wellness: '❋'
};

const Home = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0F0F0F]">
      <Navbar/>

      {/* HERO SECTION */}
      <section
        className="relative min-h-[90vh] flex flex-col justify-center px-8 md:px-20 pt-16"
      >
        {/* VIDEO BACKGROUND */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 0 }}
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay */}
        <div className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, rgba(0,0,0,0.92) 45%, rgba(245,158,11,0.12) 100%)'
          }}
        />

        {/* Hero Content */}
        <div className="relative z-10 max-w-2xl">

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
                className="bg-transparent text-white placeholder-gray-500 outline-none w-full text-sm"
              />
            </div>
            <button
              onClick={() => navigate('/events')}
              className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-6 py-3 rounded-full transition-all duration-200"
            >
              Explore Events
            </button>
          </div>

          {/* Popular Tags */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-gray-500 text-sm">Popular:</span>
            {['Tech meetup', 'DJ night', '5K run', 'Ramen crawl'].map((tag) => (
              <button
                key={tag}
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
        <div className="flex gap-3 overflow-x-auto scrollbar-hide">
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
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-3xl font-bold text-white">Happening near you</h2>
          <span className="text-sm text-gray-500 border border-[#2A2A2A] px-3 py-1 rounded-full">
            10 events
          </span>
        </div>
        <p className="text-gray-500 text-sm mb-8">Tap RSVP to lock your spot. Free unless noted.</p>

        {/* Events Grid — placeholder for now */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3].map((i) => (
            <div key={i} className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl overflow-hidden hover:border-amber-500 transition-all duration-200 cursor-pointer">
              <div className="relative">
                <img
                  src={`https://images.unsplash.com/photo-${i === 1 ? '1540575467063-178a50c2df87' : i === 2 ? '1511795409834-ef04bbd61622' : '1461896836934-ffe607ba8211'}?w=600&q=80`}
                  alt="event"
                  className="w-full h-48 object-cover"
                />
                <span className="absolute top-3 left-3 bg-amber-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                  {i === 1 ? 'TECH' : i === 2 ? 'MUSIC' : 'SPORTS'}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-white font-bold text-lg mb-3">
                  {i === 1 ? 'AI Builders Night' : i === 2 ? 'Neon Pulse — DJ Set' : 'Sunset 5K Run'}
                </h3>
                <div className="space-y-1 mb-4">
                  <p className="text-gray-400 text-sm">📅 Thu 18 Dec &nbsp; 🕐 18:30</p>
                  <p className="text-gray-400 text-sm">📍 Connaught Place, Delhi</p>
                  <p className="text-gray-400 text-sm">👥 12 / 50 spots left</p>
                </div>
                <button className="w-full border border-amber-500 text-amber-400 font-bold py-2 rounded-xl hover:bg-amber-500 hover:text-black transition-all duration-200">
                  RSVP
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#2A2A2A] px-8 md:px-16 py-10 mt-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🔥</span>
              <span className="text-white font-bold text-xl">Event<span className="text-amber-400">Hive</span></span>
            </div>
            <p className="text-gray-500 text-sm">Find your people. Go do the thing.</p>
          </div>
          <div className="flex gap-8 text-gray-500 text-sm">
            <a href="#" className="hover:text-amber-400 transition-colors">Explore</a>
            <a href="#" className="hover:text-amber-400 transition-colors">Host Event</a>
            <a href="#" className="hover:text-amber-400 transition-colors">About</a>
            <a href="#" className="hover:text-amber-400 transition-colors">Contact</a>
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