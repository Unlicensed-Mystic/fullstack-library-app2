
const Book = require('../models/Book');

// @desc    
// @route   
// @access  
const getBooks = async (req, res) => {
  try {
    
    const books = await Book.find({ user: req.user.id }).sort({ addedDate: -1 }); 
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    
const addBook = async (req, res) => {
  try {
    const { title, author, genre, status } = req.body;

    if (!title || !author || !status) {
      return res.status(400).json({ message: 'Title, author, and status are required' });
    }

    const newBook = new Book({
      title,
      author,
      genre,
      status,
      user: req.user.id,
      coverImageUrl: req.file ? `/${req.file.path}` : null,
    });

    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


const updateBook = async (req, res) => {
  try {
    let book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    
    if (book.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    const { title, author, genre, status } = req.body;
    
   
    book.title = title || book.title;
    book.author = author || book.author;
    book.genre = genre || book.genre;
    book.status = status || book.status;

    const updatedBook = await book.save();
    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};


const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    if (book.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await book.deleteOne(); 

    res.json({ message: 'Book removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getBooks,
  addBook,
  updateBook,
  deleteBook,
};
