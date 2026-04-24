import api from './api';

export const eventService = {
  // Get all events
  getAllEvents: async () => {
    const response = await api.get('/events');
    return response.data;
  },

  // Get event by ID
  getEventById: async (id) => {
    const response = await api.get(`/events/${id}`);
    return response.data;
  },

  // Create new event
  createEvent: async (eventData) => {
    const response = await api.post('/events', eventData);
    return response.data;
  },

  // Update event
  updateEvent: async (id, eventData) => {
    const response = await api.put(`/events/${id}`, eventData);
    return response.data;
  },

  // Delete event
  deleteEvent: async (id) => {
    const response = await api.delete(`/events/${id}`);
    return response.data;
  },

  // RSVP to event
  rsvpEvent: async (id) => {
    const response = await api.post(`/events/${id}/rsvp`);
    return response.data;
  },

  // Cancel RSVP
  cancelRsvp: async (id) => {
    const response = await api.post(`/events/${id}/cancel-rsvp`);
    return response.data;
  },

  // Add comment to event
  addComment: async (id, commentData) => {
    const response = await api.post(`/events/${id}/comments`, commentData);
    return response.data;
  },
};
