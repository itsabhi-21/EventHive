const express = require('express');
const router = express.Router();

const {
    getEvents, getEventById, createEvent, updateEvent, deleteEvent, cancelRsvp, addComment, rsvpEvent
} = require('../controllers/eventcontroller');

const { protect } = require('../middleware/authMiddleware');

router.get('/', getEvents);
router.get('/:id', getEventById);
router.post('/', protect, createEvent);
router.put('/:id', protect, updateEvent);
router.delete('/:id', protect, deleteEvent);
router.post('/:id/comments', protect, addComment);
router.post('/:id/cancel-rsvp', protect, cancelRsvp);
router.post('/:id/rsvp', protect, rsvpEvent);


module.exports = router;