const express = require('express');
const router = express.Router();
// Import controllers
const {
    getAllAuthors,
    getAuthorById,
    createAuthor
} = require('../controllers/authorController');

const authenticate = require('../helpers/authenticate');

router.get('/', getAllAuthors);
router.get('/:authorId', authenticate, getAuthorById);
router.post('/', authenticate, createAuthor);

module.exports = router;