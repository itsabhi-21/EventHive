const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes')

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the EventHive API!');
});

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});