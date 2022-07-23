const express = require('express');
const router = express.Router();
// Import controllers
const {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    upload
} = require('../controllers/authorController');

const authenticate = require('../helpers/authenticate');

router.get('/', getAllAuthors);
router.get('/:authorId', authenticate, getAuthorById);
router.post('/', [authenticate, upload.single('authorImage')], createAuthor);

module.exports = router;