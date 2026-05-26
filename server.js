const express = require('express');
const studentRoutes = require('./routes/studentRoutes');

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api', studentRoutes);

// Welcome Route
app.get('/', (req, res) => {
    res.send('Welcome to DecodeLabs Student Management API');
});

// Set Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});