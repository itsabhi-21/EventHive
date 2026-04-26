const Event = require('../models/Events');
const User = require('../models/User');

const getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('organizer', 'name email');
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('organizer', 'name email')
      .populate('attendees', 'name email')
      .populate('comments.user', 'name email');
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const createEvent = async (req, res) => {
  try {
    const { title, description, category, location, date, time, capacity, image } = req.body;
    const event = new Event({
      title,
      description,
      category,
      location,
      date,
      time,
      capacity,
      image,
      organizer: req.user._id
    });
    await event.save();
    await User.findByIdAndUpdate(req.user._id, {
      $push: { eventsCreated: event._id }
    });
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    if (event.organizer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this event' });
    }
    const { title, description, category, location, date, time, capacity, image } = req.body;
    event.title = title || event.title;
    event.description = description || event.description;
    event.category = category || event.category;
    event.location = location || event.location;
    event.date = date || event.date;
    event.time = time || event.time;
    event.capacity = capacity || event.capacity;
    event.image = image || event.image;
    await event.save();
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    if (event.organizer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this event' });
    }
    await event.remove();
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const rsvpEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if already RSVP'd
    if (event.attendees.includes(req.user._id)) {
      return res.status(400).json({ message: 'Already RSVP\'d to this event' });
    }

    // Check capacity
    if (event.attendees.length >= event.capacity) {
      return res.status(400).json({ message: 'Event is full' });
    }

    event.attendees.push(req.user._id);
    await event.save();

    await User.findByIdAndUpdate(req.user._id, {
      $push: { eventsJoined: event._id }
    });

    res.json({ message: 'RSVP successful', attendees: event.attendees.length });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const cancelRsvp = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (!event.attendees.includes(req.user._id)) {
      return res.status(400).json({ message: 'You have not RSVP\'d to this event' });
    }

    event.attendees = event.attendees.filter(
      (id) => id.toString() !== req.user._id.toString()
    );
    await event.save();

    await User.findByIdAndUpdate(req.user._id, {
      $pull: { eventsJoined: event._id }
    });

    res.json({ message: 'RSVP cancelled', attendees: event.attendees.length });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const addComment = async (req, res) => {
  const { text } = req.body;

  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    event.comments.push({ user: req.user._id, text });
    await event.save();

    res.status(201).json(event.comments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getEvents, getEventById, createEvent, updateEvent, deleteEvent, rsvpEvent, cancelRsvp, addComment };