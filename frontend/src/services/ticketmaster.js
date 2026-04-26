const API_KEY = import.meta.env.VITE_TICKETMASTER_KEY;
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2';

/* Helper: does this event have a usable hi-res image? */
const hasGoodImage = (event) => {
  if (!event.images || event.images.length === 0) return false;
  // Prefer a 16:9 image wider than 500 px
  return event.images.some(
    (img) => img.ratio === '16_9' && img.width > 500 && img.url
  );
};

export const fetchEvents = async ({ keyword = 'india', size = 9 }) => {
  // Fetch extra events so we still have enough after filtering out bad images
  const fetchSize = Math.min(size * 3, 50);
  const url = `${BASE_URL}/events.json?apikey=${API_KEY}&keyword=${keyword}&size=${fetchSize}&sort=date,asc`;
  
  const res = await fetch(url);
  const data = await res.json();
  
  const all = data._embedded?.events || [];
  // Keep only events with a proper image, then trim to requested size
  return all.filter(hasGoodImage).slice(0, size);
};