const API_KEY = import.meta.env.VITE_TICKETMASTER_KEY;
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2';

export const fetchEvents = async ({ keyword = 'india', size = 9 }) => {
  const url = `${BASE_URL}/events.json?apikey=${API_KEY}&keyword=${keyword}&size=${size}&sort=date,asc`;
  
  const res = await fetch(url);
  const data = await res.json();
  
  return data._embedded?.events || [];
};