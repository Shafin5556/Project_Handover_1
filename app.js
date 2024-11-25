const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./db'); // Import the database connection

const app = express();

// Middleware to parse JSON data from requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (like HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Serve the HTML page when the root URL is accessed
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Adjust the file path if needed
});

// Define your route to fetch ticket data
app.post('/find-tickets', async (req, res) => {
    const { location, when, tourType } = req.body;

    // SQL query to fetch ticket data based on the selections
    const query = `
        SELECT tickets.id, locations.name AS location, ticket_types.type AS ticket_type, tickets.when, tickets.tour_type, tickets.price, tickets.availability
        FROM tickets
        JOIN locations ON tickets.location_id = locations.id
        JOIN ticket_types ON tickets.ticket_type_id = ticket_types.id
        WHERE locations.name = ? AND tickets.when = ? AND tickets.tour_type = ?
    `;

    try {
        // Execute query with the selected values
        const [rows] = await db.execute(query, [location, when, tourType]);

        // If tickets are found, send them as a JSON response
        if (rows.length > 0) {
            res.json(rows);
        } else {
            res.json([]);
        }
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Test database connection on server start
db.execute('SELECT 1')
    .then(() => {
        console.log('Database connected successfully.');
    })
    .catch((error) => {
        console.error('Error connecting to database:', error);
    });

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
