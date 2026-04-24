import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const EventDetail = () => {
  const { id } = useParams();
  const [isRSVPd, setIsRSVPd] = useState(false);

  // Mock event data - in real app, fetch based on id
  const event = {
    id: 1,
    title: "AI Builders Night: Ship Your First Agent",
    category: "tech",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&h=600&fit=crop",
    date: "Thursday, December 18, 2026",
    time: "18:30 - 21:00",
    location: "The Hatchery",
    address: "350 Jay Street, Brooklyn, NY 11201",
    spotsTotal: 50,
    spotsLeft: 12,
    price: "Free",
    about: `Join us for an exciting evening of AI development and networking! This hands-on workshop is designed for developers who want to dive into the world of AI agents.

During this 2.5-hour session, you'll learn how to build and deploy your first AI agent from scratch. Our expert instructors will guide you through the fundamentals of agent architecture, natural language processing, and practical implementation strategies.

Whether you're a seasoned developer or just getting started with AI, this event offers something for everyone. You'll leave with a working AI agent and the knowledge to continue building on your own.

What to bring:
• Your laptop with development environment set up
• Basic knowledge of Python
• Enthusiasm and curiosity!

Light refreshments and snacks will be provided. Don't miss this opportunity to connect with fellow AI enthusiasts and take your first step into the future of software development.`,
    organizer: {
      name: "Tech Brooklyn",
      avatar: "https://ui-avatars.com/api/?name=Tech+Brooklyn&background=f59e0b&color=000",
      bio: "Tech Brooklyn is a community-driven organization dedicated to fostering innovation and collaboration in the NYC tech scene.",
      eventsHosted: 47,
      followers: 2340
    },
    tags: ["AI", "Machine Learning", "Workshop", "Networking", "Tech"],
    attendees: [
      { name: "Sarah Chen", avatar: "https://ui-avatars.com/api/?name=Sarah+Chen&background=random" },
      { name: "Mike Johnson", avatar: "https://ui-avatars.com/api/?name=Mike+Johnson&background=random" },
      { name: "Emily Davis", avatar: "https://ui-avatars.com/api/?name=Emily+Davis&background=random" },
      { name: "Alex Kumar", avatar: "https://ui-avatars.com/api/?name=Alex+Kumar&background=random" },
      { name: "Lisa Wang", avatar: "https://ui-avatars.com/api/?name=Lisa+Wang&background=random" }
    ]
  };

  const handleRSVP = () => {
    setIsRSVPd(!isRSVPd);
  };

  return (
    <div className="min-h-screen bg-[#000000]">
      <Navbar />

      {/* Hero Image */}
      <div className="relative h-[400px] overflow-hidden">
        <img 
          src={event.image} 
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        
        {/* Category Badge */}
        <div className="absolute top-8 left-12">
          <span className="bg-[#f59e0b] text-black text-xs font-bold px-4 py-2 rounded-lg uppercase tracking-wide">
            {event.category}
          </span>
        </div>

        {/* Back Button */}
        <div className="absolute top-8 right-12">
          <Link 
            to="/"
            className="bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white px-4 py-2 rounded-lg transition text-sm flex items-center gap-2 border border-white/20"
          >
            ← Back to Events
          </Link>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Title */}
            <h1 className="text-4xl font-bold text-white mb-6">{event.title}</h1>

            {/* About Section */}
            <div className="bg-[#0f0f0f] rounded-xl border border-[#1f1f1f] p-8 mb-6">
              <h2 className="text-2xl font-bold text-white mb-4">About this event</h2>
              <div className="text-[#aaa] text-[15px] leading-relaxed whitespace-pre-line">
                {event.about}
              </div>
            </div>

            {/* Tags */}
            <div className="bg-[#0f0f0f] rounded-xl border border-[#1f1f1f] p-8 mb-6">
              <h2 className="text-xl font-bold text-white mb-4">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {event.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="bg-[#1a1a1a] text-[#f59e0b] px-4 py-2 rounded-full text-sm border border-[#2a2a2a] hover:border-[#f59e0b] transition cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Organizer */}
            <div className="bg-[#0f0f0f] rounded-xl border border-[#1f1f1f] p-8 mb-6">
              <h2 className="text-2xl font-bold text-white mb-6">Organizer</h2>
              <div className="flex items-start gap-4">
                <img 
                  src={event.organizer.avatar}
                  alt={event.organizer.name}
                  className="w-16 h-16 rounded-full"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">{event.organizer.name}</h3>
                  <p className="text-[#aaa] text-sm mb-4">{event.organizer.bio}</p>
                  <div className="flex gap-6 text-sm">
                    <div>
                      <span className="text-white font-bold">{event.organizer.eventsHosted}</span>
                      <span className="text-[#888] ml-1">Events hosted</span>
                    </div>
                    <div>
                      <span className="text-white font-bold">{event.organizer.followers}</span>
                      <span className="text-[#888] ml-1">Followers</span>
                    </div>
                  </div>
                  <button className="mt-4 bg-[#1a1a1a] hover:bg-[#252525] text-white border border-[#2a2a2a] px-6 py-2 rounded-lg transition text-sm">
                    Follow Organizer
                  </button>
                </div>
              </div>
            </div>

            {/* Attendees */}
            <div className="bg-[#0f0f0f] rounded-xl border border-[#1f1f1f] p-8">
              <h2 className="text-2xl font-bold text-white mb-6">
                Attendees ({event.spotsTotal - event.spotsLeft})
              </h2>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex -space-x-3">
                  {event.attendees.map((attendee, index) => (
                    <img 
                      key={index}
                      src={attendee.avatar}
                      alt={attendee.name}
                      title={attendee.name}
                      className="w-10 h-10 rounded-full border-2 border-[#0f0f0f]"
                    />
                  ))}
                  {event.spotsTotal - event.spotsLeft > 5 && (
                    <div className="w-10 h-10 rounded-full bg-[#1a1a1a] border-2 border-[#0f0f0f] flex items-center justify-center text-xs text-white font-bold">
                      +{event.spotsTotal - event.spotsLeft - 5}
                    </div>
                  )}
                </div>
                <span className="text-[#888] text-sm">and others are attending</span>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* RSVP Card */}
            <div className="bg-[#0f0f0f] rounded-xl border border-[#1f1f1f] p-6 mb-6 sticky top-6">
              <div className="mb-6">
                <div className="text-3xl font-bold text-white mb-2">{event.price}</div>
                <div className="text-[#888] text-sm">
                  {event.spotsLeft} / {event.spotsTotal} spots left
                </div>
                <div className="mt-2 bg-[#1a1a1a] rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-[#f59e0b] h-full rounded-full transition-all"
                    style={{ width: `${((event.spotsTotal - event.spotsLeft) / event.spotsTotal) * 100}%` }}
                  ></div>
                </div>
              </div>

              <button 
                onClick={handleRSVP}
                className={`w-full font-bold py-3.5 rounded-lg transition text-[15px] mb-4 ${
                  isRSVPd 
                    ? 'bg-[#1a1a1a] text-white border-2 border-[#f59e0b]'
                    : 'bg-[#f59e0b] hover:bg-[#d97706] text-black'
                }`}
              >
                {isRSVPd ? '✓ RSVP Confirmed' : 'RSVP Now'}
              </button>

              {isRSVPd && (
                <button className="w-full bg-[#1a1a1a] hover:bg-[#252525] text-white border border-[#2a2a2a] py-2.5 rounded-lg transition text-sm">
                  Add to Calendar
                </button>
              )}
            </div>

            {/* Date & Time */}
            <div className="bg-[#0f0f0f] rounded-xl border border-[#1f1f1f] p-6 mb-6">
              <h3 className="text-lg font-bold text-white mb-4">Date & Time</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-[#f59e0b] text-xl">📅</span>
                  <div>
                    <div className="text-white font-medium">{event.date}</div>
                    <div className="text-[#888] text-sm">{event.time}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="bg-[#0f0f0f] rounded-xl border border-[#1f1f1f] p-6 mb-6">
              <h3 className="text-lg font-bold text-white mb-4">Location & Venue</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-[#f59e0b] text-xl">📍</span>
                  <div>
                    <div className="text-white font-medium">{event.location}</div>
                    <div className="text-[#888] text-sm">{event.address}</div>
                  </div>
                </div>
                <button className="w-full bg-[#1a1a1a] hover:bg-[#252525] text-white border border-[#2a2a2a] py-2.5 rounded-lg transition text-sm mt-3">
                  View on Map
                </button>
              </div>
            </div>

            {/* Share */}
            <div className="bg-[#0f0f0f] rounded-xl border border-[#1f1f1f] p-6">
              <h3 className="text-lg font-bold text-white mb-4">Share this event</h3>
              <div className="flex gap-2">
                <button className="flex-1 bg-[#1a1a1a] hover:bg-[#252525] text-white border border-[#2a2a2a] py-2.5 rounded-lg transition text-sm">
                  Twitter
                </button>
                <button className="flex-1 bg-[#1a1a1a] hover:bg-[#252525] text-white border border-[#2a2a2a] py-2.5 rounded-lg transition text-sm">
                  Facebook
                </button>
                <button className="flex-1 bg-[#1a1a1a] hover:bg-[#252525] text-white border border-[#2a2a2a] py-2.5 rounded-lg transition text-sm">
                  Copy Link
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EventDetail;
