const express = require('express');
const router = express.Router();
const {
  getBooks,
  addBook,
  updateBook,
  deleteBook,
} = require('../controllers/bookController');

const { protect } = require('../middleware/authMiddleware');
const { upload } = require('../middleware/uploadMiddleware');

router.use(protect);


router.route('/')
  .get(getBooks)
  .post(upload.single('cover'), addBook); 

router.route('/:id')
  .put(updateBook)
  .delete(deleteBook);

module.exports = router;

