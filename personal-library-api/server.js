

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');


dotenv.config();

connectDB();

const app = express();


app.use(cors());

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
