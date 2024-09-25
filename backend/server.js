const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Dummy user storage (for demonstration purposes)
let users = [];

// Signup route
app.post('/api/signup', (req, res) => {
    const { email, password } = req.body;

    // Check for existing user
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Add user to the "database"
    users.push({ email, password });
    res.status(201).json({ message: 'User registered successfully' });
});

// Login route
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    // Find the user
    const user = users.find(user => user.email === email && user.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    // If login is successful
    res.status(200).json({ message: 'Login successful' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
