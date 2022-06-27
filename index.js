const express = require('express');
const app = express();
const fs = require('fs')

/*
    // API Endpoints
    
    /quotes => GET, POST

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
app.get('/quotes', (req, res)=>{
    fs.readFile('quotes.json', (err, quotes)=>{
        if(quotes){
            res.send(quotes);
        }else{
            res.send('Quotes Not Found');
        }
    })
})

app.post('/quotes', (req, res)=>{
    let newQuote = req.body
    let quotes = [];

    // Get all the quotes
    fs.readFile('quotes.json', (err,data)=>{
        if(data){
            const parsedData = JSON.parse(data);
            quotes = [...parsedData,newQuote];
            // Update the quotes.json file
            fs.writeFile('quotes.json', JSON.stringify(quotes, null, 4), (err)=>{
                if(err){
                    res.send('Failed to add quote')
                }else{
                    res.send('Successfully added quote')
                }
            })

        }else{
            console.log('File Not Found')
        }
    }) 
})

app.get('/quotes/:quoteId', (req, res)=>{
    let id = req.params.quoteId
    let quotes = [];
    fs.readFile('quotes.json', (err,data)=>{
        if(data){
            quotes = JSON.parse(data);
            let quote = quotes.filter((quote)=>quote.id === id)[0]
            quote ? res.send(quote) : res.send('Quote not Found')
        }else{
            res.send('Quote not found')
        }
    })
})

app.patch('/quotes/:quoteId', (req, res)=>{
    res.send('Updated the quote')
})

app.delete('/quotes/:quoteId', (req, res)=>{
    res.send('Deleted the quote')
})


const PORT = 5000;
app.listen(PORT,()=>{
    console.log(`Server is listening on: http://localhost:${PORT}`)
})