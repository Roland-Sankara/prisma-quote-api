const express = require('express');
const app = express();
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

/*
    // API Endpoints
    
    /quotes => GET, POST
    /authors => GET, POST

    /quotes/:quoteId => GET, PATCH, DELETE

    // Model Data

    {
        id: "73737sjjsjs",
        text: "The Lord is Goood",
        author: 'Roland'
    }
*/
// Middleware
app.use(express.json())


// Request Handlers
app.get('/quotes', async(req, res)=>{
    try {
        const quotes = await prisma.quote.findMany({})
        res.status(200).json(quotes);
    } catch (error) {
       res.status(500).json('Failed to perform request')
    }
    
})

app.post('/quotes', async(req, res)=>{
    try {
        const newQuote = await prisma.quote.create({
            data: req.body
        })
        res.json({message:'Added quote successfully', quote: newQuote}) 
    } catch (error) {
       res.status(400).json('Failed to perform request')
    }
    
})

app.get('/quotes/:quoteId', async(req, res)=>{
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

})

app.patch('/quotes/:quoteId', async(req, res)=>{
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
    
})

app.delete('/quotes/:quoteId', async(req, res)=>{
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
})
// ------------------
// AUTHORS CRUD 
// ------------------
app.get('/authors', async(req, res)=>{
    try {
        const authors = await prisma.author.findMany({
            include: {
                quotes: true
            }
        })
        res.status(200).json(authors);
    } catch (error) {
       res.status(500).json('Failed to perform request')
    }
    
})

app.get('/authors/:authorId', async(req, res)=>{
    try {
        const author = await prisma.author.findUnique({
            where: {
                id: Number(req.params.authorId)
            },
            include: {
                quotes: true
            }
        })
        res.status(200).json(author);
    } catch (error) {
       res.status(500).json('Failed to perform request')
    }
    
})

app.post('/authors', async(req, res)=>{
    try {
        const newAuthor = await prisma.author.create({
            data: req.body
        })
        res.status(200).json(newAuthor);
    } catch (error) {
       res.status(500).json('Failed to perform request')
    }
    
})



const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is listening on: http://localhost:${PORT}`)
})