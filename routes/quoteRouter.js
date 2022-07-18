const express = require('express');
const router = express.Router();

const quoteSchema = require('../helpers/joi-schemas');
const validateData = require('../helpers/validation');

// Import Controllers
const {
    createQuote,
    getAllQuotes,
    getQuoteById,
    updateQuoteById,
    deleteQuoteById 
} = require('../controllers/quoteController');

const authenticate = require('../helpers/authenticate');



router.get('/', getAllQuotes)

router.post('/', [authenticate ,validateData(quoteSchema)], createQuote)

router.get('/:quoteId', getQuoteById)

router.patch('/:quoteId', authenticate, updateQuoteById)

router.delete('/:quoteId', authenticate, deleteQuoteById)

module.exports = router;
