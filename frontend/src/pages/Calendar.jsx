import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(11); // December (0-indexed)
  const [currentYear, setCurrentYear] = useState(2026);
  const [selectedDate, setSelectedDate] = useState(18);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

  // Get days in month
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get first day of month (0 = Sunday)
  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

  // Create calendar grid
  const calendarDays = [];
  
  // Add empty cells for days before month starts
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }
  
  // Add days of month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  // Events data
  const events = {
    18: [
      {
        id: 1,
        title: "AI Builders Night: Ship Your First Agent",
        category: "tech",
        date: "Thu 18 Dec",
        time: "18:30",
        location: "The Hatchery, Brooklyn NY",
        spotsLeft: "12 / 50 spots left",
        image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&fit=crop",
        status: "rsvp"
      }
    ],
    20: [
      {
        id: 2,
        title: "Neon Pulse — Underground DJ Set",
        category: "music",
        date: "Sat 20 Dec",
        time: "22:00",
        location: "Warehouse 9, Bushwick",
        spotsLeft: "22 / 120 spots left",
        image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&h=400&fit=crop",
        status: "rsvp"
      }
    ],
    21: [
      {
        id: 3,
        title: "Sunset 5K — Community Run",
        category: "sports",
        date: "Sun 21 Dec",
        time: "17:00",
        location: "Riverside Park, Pier 4",
        status: "past"
      }
    ]
  };

  const getDayStatus = (day) => {
    if (!events[day]) return null;
    const event = events[day][0];
    if (event.status === 'rsvp') return 'bg-[#f59e0b]';
    if (event.status === 'past') return 'bg-[#666]';
    return 'bg-[#2a2a2a]';
  };

  const selectedEvents = events[selectedDate] || [];

  const previousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const getDayName = (day) => {
    const date = new Date(currentYear, currentMonth, day);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  return (
    <div className="min-h-screen bg-[#000000]">
      <Navbar />

      <div className="max-w-[1400px] mx-auto px-12 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/dashboard" 
            className="text-[#f59e0b] text-sm hover:text-[#d97706] transition flex items-center gap-2 mb-4"
          >
            ← Back to Dashboard
          </Link>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white flex items-center gap-3 mb-2">
                My Event Calendar
              </h1>
              <p className="text-[#888] text-sm">Track your RSVPs and plan your upcoming month.</p>
            </div>

            <div className="flex gap-3">
              <button className="bg-[#1a1a1a] hover:bg-[#252525] text-white border border-[#2a2a2a] px-4 py-2.5 rounded-lg transition text-sm flex items-center gap-2">
                 Filter by tags
              </button>
              <button className="bg-[#f59e0b] hover:bg-[#d97706] text-black font-bold px-5 py-2.5 rounded-lg transition text-sm flex items-center gap-2">
                + Add external event
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Calendar */}
          <div className="lg:col-span-1">
            {/* Calendar Widget */}
            <div className="bg-[#0f0f0f] rounded-xl border border-[#1f1f1f] p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">
                  {monthNames[currentMonth]} {currentYear}
                </h2>
                <div className="flex gap-2">
                  <button 
                    onClick={previousMonth}
                    className="w-8 h-8 bg-[#1a1a1a] hover:bg-[#252525] rounded-lg flex items-center justify-center text-white transition"
                  >
                    ‹
                  </button>
                  <button 
                    onClick={nextMonth}
                    className="w-8 h-8 bg-[#1a1a1a] hover:bg-[#252525] rounded-lg flex items-center justify-center text-white transition"
                  >
                    ›
                  </button>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2">
                {/* Day headers */}
                {daysOfWeek.map(day => (
                  <div key={day} className="text-center text-[#666] text-xs font-medium py-2">
                    {day}
                  </div>
                ))}

                {/* Calendar days */}
                {calendarDays.map((day, index) => (
                  <div key={index} className="aspect-square">
                    {day ? (
                      <button
                        onClick={() => setSelectedDate(day)}
                        className={`w-full h-full rounded-lg flex items-center justify-center text-sm font-medium transition relative ${
                          day === selectedDate
                            ? 'bg-[#f59e0b] text-black'
                            : 'text-white hover:bg-[#1a1a1a]'
                        }`}
                      >
                        {day}
                        {getDayStatus(day) && (
                          <div className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${getDayStatus(day)}`}></div>
                        )}
                      </button>
                    ) : (
                      <div></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="bg-[#0f0f0f] rounded-xl border border-[#1f1f1f] p-6">
              <h3 className="text-white font-bold mb-4">LEGEND</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-[#f59e0b]"></div>
                  <span className="text-[#aaa] text-sm">Upcoming RSVP</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-[#666]"></div>
                  <span className="text-[#aaa] text-sm">Past Event</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full border-2 border-[#2a2a2a]"></div>
                  <span className="text-[#aaa] text-sm">Waitlisted</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Event Details */}
          <div className="lg:col-span-2">
            <div className="bg-[#0f0f0f] rounded-xl border border-[#1f1f1f] p-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="text-[#f59e0b]">|</span>
                {getDayName(selectedDate)}, Dec {selectedDate}
              </h2>

              {selectedEvents.length > 0 ? (
                <div className="space-y-6">
                  {selectedEvents.map(event => (
                    <div key={event.id} className="bg-[#1a1a1a] rounded-xl overflow-hidden border border-[#2a2a2a]">
                      {event.image && (
                        <div className="relative h-[200px]">
                          <img 
                            src={event.image} 
                            alt={event.title}
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute top-3 left-3 bg-[#f59e0b] text-black text-[11px] font-bold px-3 py-1.5 rounded-md uppercase tracking-wide">
                            {event.category}
                          </span>
                        </div>
                      )}
                      
                      <div className="p-6">
                        <h3 className="text-white font-bold text-xl mb-4">{event.title}</h3>
                        
                        <div className="space-y-3 text-sm text-[#aaa] mb-6">
                          <div className="flex items-center gap-3">
                            <span className="text-[#f59e0b]">📅</span>
                            <span>{event.date}</span>
                            <span className="text-[#f59e0b] ml-4">🕐</span>
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-[#f59e0b]">📍</span>
                            <span>{event.location}</span>
                          </div>
                          {event.spotsLeft && (
                            <div className="flex items-center gap-3">
                              <span className="text-[#f59e0b]">👥</span>
                              <span>{event.spotsLeft}</span>
                            </div>
                          )}
                        </div>

                        <button className="w-full bg-[#f59e0b] hover:bg-[#d97706] text-black font-bold py-3 rounded-lg transition">
                          View Tickets
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📅</div>
                  <p className="text-[#888] text-lg">No events scheduled for this day</p>
                  <Link 
                    to="/" 
                    className="inline-block mt-4 text-[#f59e0b] hover:text-[#d97706] transition"
                  >
                    Browse events →
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Calendar;
