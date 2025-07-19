const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true, 
  },
  author: {
    type: String,
    required: [true, 'Please add an author'],
    trim: true,
  },
  genre: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['To Read', 'Reading', 'Read'], 
    default: 'To Read',
  },

  coverImageUrl: {
    type: String,
  },
  addedDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Book', BookSchema);
