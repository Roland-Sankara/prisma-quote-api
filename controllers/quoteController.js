const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const getAllQuotes = async(req, res)=>{
    try {
        const quotes = await prisma.quote.findMany({})
        res.status(200).json(quotes);
    } catch (error) {
       res.status(500).json('Failed to perform request')
    }
    
}

const createQuote = async(req, res)=>{
    try {
        const newQuote = await prisma.quote.create({
            data: req.body
        })
        res.json({message:'Added quote successfully', quote: newQuote}) 
    } catch (error) {
       res.status(400).json('Failed to perform request')
    }
    
}

const getQuoteById = async(req, res)=>{
    try {
        const quote = await prisma.quote.findUnique({
            where: {
                id: Number(req.params.quoteId)
            },
            include: {
                author: true
            }
        })
       res.status(200).json(quote)
    } catch (error) {
       res.status(400).json('Failed to perform request')
    }
}

const updateQuoteById = async(req, res)=>{
    try {
        const quote = await prisma.quote.update({
            where: {
                id: Number(req.params.quoteId)
            },
            data: req.body
        })
        res.status(200).json({message: 'Successfully Updated Quote', quote})
    } catch (error) {
        res.status(400).json('Failed to update quote. Please try again')
    }   
}

const deleteQuoteById = async(req, res)=>{
    try {
        const quote = await prisma.quote.delete({
            where: {
                id: Number(req.params.quoteId)
            }
        })
        res.status(200).json({message: 'Quote deleted successfully', quote})
    } catch (error) {
        res.status(400).json('Failed to update quote. Please try again')
    }
}


module.exports = {
    deleteQuoteById,
    updateQuoteById,
    getQuoteById,
    createQuote,
    getAllQuotes
}