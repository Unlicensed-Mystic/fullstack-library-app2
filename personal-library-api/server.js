const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const app = express();

// --- START: CORS Configuration ---
// This block must come BEFORE your routes
const corsOptions = {
  origin: 'https://bookcord.netlify.app', // Your live frontend URL
  methods: 'GET,POST,PUT,DELETE',          // Allowed request methods
  allowedHeaders: 'Content-Type,Authorization', // Allowed request headers
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
// Handle preflight requests for all routes
app.options('*', cors(corsOptions));
// --- END: CORS Configuration ---

app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


