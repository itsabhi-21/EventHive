import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Dashboard = () => {
  const user = {
    name: "Abhinav",
    avatar: "/avatar.jpg",
    memberSince: "April 2026",
    eventsAttended: 5,
    rsvpCount: 2
  };

  const upcomingEvents = [
    {
      id: 1,
      title: "AI Builders Night: Ship Your First Agent",
      category: "tech",
      date: "Thu 18 Dec",
      time: "18:30",
      location: "The Hatchery, Brooklyn NY",
      spotsLeft: "12 / 50 spots left",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&fit=crop"
    },
    {
      id: 2,
      title: "Neon Pulse — Underground DJ Set",
      category: "music",
      date: "Sat 20 Dec",
      time: "22:00",
      location: "Warehouse 9, Bushwick",
      spotsLeft: "22 / 120 spots left",
      image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&h=400&fit=crop"
    }
  ];

  const pastEvents = [
    {
      id: 3,
      title: "Sunset 5K — Community Run",
      date: "Sun 21 Nov",
      time: "17:00",
      location: "Riverside Park, Pier 4",
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&h=400&fit=crop"
    },
    {
      id: 4,
      title: "Risograph Zine Workshop",
      date: "Mon 22 Nov",
      time: "14:00",
      location: "Ink & Fold Studio, SoHo"
    }
  ];

  const recommendedEvents = [
    {
      id: 7,
      title: "Retro Arcade Tournament",
      category: "gaming",
      date: "Sun 28 Dec",
      time: "20:00",
      location: "Pixel Bar, LES",
      spotsLeft: "13 / 64 spots left",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&h=400&fit=crop"
    },
    {
      id: 9,
      title: "Indie Game Dev Showcase",
      category: "tech",
      date: "Sun 4 Jan",
      time: "17:00",
      location: "Brooklyn Commons",
      spotsLeft: "45 / 80 spots left",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=400&fit=crop"
    }
  ];

  const getCategoryColor = (category) => {
    const colors = {
      tech: 'bg-[#f59e0b]',
      music: 'bg-[#ec4899]',
      gaming: 'bg-[#f59e0b]'
    };
    return colors[category] || 'bg-[#f59e0b]';
  };

  return (
    <div className="min-h-screen bg-[#000000]">
      <Navbar />

      <div className="max-w-[1400px] mx-auto px-12 py-12 mt-10">
        {/* User Profile Section */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <img 
              src={user.avatar} 
              alt={user.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-[#2a2a2a]"
              onError={(e) => {
                e.target.src = 'https://ui-avatars.com/api/?name=' + user.name + '&background=f59e0b&color=000';
              }}
            />
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                👋 Hey, {user.name}! 👋
              </h1>
              <p className="text-[#888] text-sm">Member since {user.memberSince}</p>
            </div>
          </div>

          <div className="flex gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{user.eventsAttended}</div>
              <div className="text-[#888] text-xs uppercase">Events Attended</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{user.rsvpCount}</div>
              <div className="text-[#888] text-xs uppercase">RSVPs Pending</div>
            </div>
          </div>
        </div>

        {/* Upcoming Events (RSVPs) */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              📅 Upcoming Events (RSVPs)
            </h2>
            <Link to="/calendar" className="text-[#f59e0b] text-sm hover:text-[#d97706] transition">
              View calendar →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingEvents.map(event => (
              <div key={event.id} className="bg-[#0f0f0f] rounded-xl overflow-hidden border border-[#1f1f1f]">
                {event.image && (
                  <div className="relative h-[180px]">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <span className={`absolute top-3 left-3 ${getCategoryColor(event.category)} text-black text-[11px] font-bold px-3 py-1.5 rounded-md uppercase tracking-wide`}>
                      {event.category}
                    </span>
                  </div>
                )}
                
                <div className="p-5">
                  <h3 className="text-white font-bold text-[17px] mb-3 leading-tight">{event.title}</h3>
                  
                  <div className="space-y-2 text-[13px] text-[#888] mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[#f59e0b]">📅</span>
                      <span>{event.date}</span>
                      <span className="text-[#f59e0b] ml-2">🕐</span>
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#f59e0b]">📍</span>
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#f59e0b]">👥</span>
                      <span>{event.spotsLeft}</span>
                    </div>
                  </div>

                  <button className="w-full bg-[#1a1a1a] hover:bg-[#252525] text-white border border-[#2a2a2a] font-semibold py-2.5 rounded-lg transition text-[13px]">
                    Cancel RSVP
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Past Events I Attended */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2 mb-6">
            ✅ Past Events I Attended
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pastEvents.map(event => (
              <div key={event.id} className="bg-[#0f0f0f] rounded-xl overflow-hidden border border-[#1f1f1f]">
                {event.image && (
                  <div className="relative h-[180px]">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div className="p-5">
                  <h3 className="text-white font-bold text-[17px] mb-3 leading-tight">{event.title}</h3>
                  
                  <div className="space-y-2 text-[13px] text-[#888] mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[#f59e0b]">📅</span>
                      <span>{event.date}</span>
                      <span className="text-[#f59e0b] ml-2">🕐</span>
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#f59e0b]">📍</span>
                      <span>{event.location}</span>
                    </div>
                  </div>

                  <button className="w-full bg-[#1a1a1a] hover:bg-[#252525] text-white border border-[#2a2a2a] font-semibold py-2.5 rounded-lg transition text-[13px]">
                    View Memories
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended For You */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              💡 Recommended For You
            </h2>
            <Link to="/explore" className="text-[#f59e0b] text-sm hover:text-[#d97706] transition">
              View all →
            </Link>
          </div>

          <p className="text-[#888] text-sm mb-6">Based on categories you've joined</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendedEvents.map(event => (
              <div key={event.id} className="bg-[#0f0f0f] rounded-xl overflow-hidden border border-[#1f1f1f]">
                {event.image && (
                  <div className="relative h-[180px]">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <span className={`absolute top-3 left-3 ${getCategoryColor(event.category)} text-black text-[11px] font-bold px-3 py-1.5 rounded-md uppercase tracking-wide`}>
                      {event.category}
                    </span>
                  </div>
                )}
                
                <div className="p-5">
                  <h3 className="text-white font-bold text-[17px] mb-3 leading-tight">{event.title}</h3>
                  
                  <div className="space-y-2 text-[13px] text-[#888] mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[#f59e0b]">📅</span>
                      <span>{event.date}</span>
                      <span className="text-[#f59e0b] ml-2">🕐</span>
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#f59e0b]">📍</span>
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#f59e0b]">👥</span>
                      <span>{event.spotsLeft}</span>
                    </div>
                  </div>

                  <button className="w-full bg-[#f59e0b] hover:bg-[#d97706] text-black font-bold py-2.5 rounded-lg transition text-[13px]">
                    RSVP
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
