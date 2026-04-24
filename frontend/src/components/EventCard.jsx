import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  const getCategoryColor = (category) => {
    const colors = {
      tech: 'bg-[#f59e0b]',
      music: 'bg-[#ec4899]',
      sports: 'bg-[#f59e0b]',
      gaming: 'bg-[#f59e0b]',
      wellness: 'bg-[#ec4899]',
      workshops: 'bg-[#f59e0b]',
      food: 'bg-[#f59e0b]',
      art: 'bg-[#f59e0b]'
    };
    return colors[category] || 'bg-[#f59e0b]';
  };

  return (
    <div className="bg-[#0f0f0f] rounded-xl overflow-hidden border border-[#1f1f1f] hover:border-[#f59e0b] transition-all duration-300">
      {event.image && (
        <div className="relative h-[200px]">
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
        <h3 className="text-white font-bold text-[17px] mb-4 leading-tight">{event.title}</h3>
        
        <div className="space-y-2.5 text-[13px] text-[#888] mb-5">
          <div className="flex items-center gap-2">
            <span className="text-[#f59e0b]">📅</span>
            <span>{event.date}</span>
            <span className="text-[#f59e0b] ml-2">🕐</span>
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#f59e0b]">📍</span>
            <span className="line-clamp-1">{event.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#f59e0b]">👥</span>
            <span>{event.spotsLeft}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Link 
            to={`/event/${event.id}`}
            className="flex-1 bg-[#1a1a1a] hover:bg-[#252525] text-white text-center border border-[#2a2a2a] font-semibold py-3 rounded-lg transition-colors text-[14px] tracking-wide"
          >
            View Details
          </Link>
          <button className="flex-1 bg-[#f59e0b] hover:bg-[#d97706] text-black font-bold py-3 rounded-lg transition-colors text-[14px] tracking-wide">
            RSVP
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
