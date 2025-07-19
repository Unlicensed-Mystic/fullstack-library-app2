const mongoose = require('mongoose');

const connectDB = async () => {
  try {

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {

    console.error('--- DATABASE CONNECTION FAILED ---');
    console.error(`Reason: ${error.message}`);
    console.error('---------------------------------');
    console.error('Troubleshooting Tips:');
    console.error('1. Verify your IP address is whitelisted in MongoDB Atlas > Network Access.');
    console.error('2. Check your .env file for the correct MONGO_URI.');
    console.error('3. Ensure you replaced <password>.');
    
    process.exit(1); 
  }
};

module.exports = connectDB;