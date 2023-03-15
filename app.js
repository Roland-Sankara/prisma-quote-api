const express = require('express');
require('dotenv').config();
const app = express();

// routers
const quoteRouter = require('./routes/quoteRouter');
const userRouter = require('./routes/userRouter');
const authorRouter = require('./routes/authorRouter');


// Middleware
app.use(express.json())


// Request Handlers
app.get('/api/v1/', (req, res)=>{
    res.status(200).json({
        status:200, 
        message:"Awesome the API works fine with Render. Checkout the docs below🐻",
        api_documentation: "https://documenter.getpostman.com/view/6512450/UzJMrv7V" 
    })
});
app.use('/api/v1/quotes', quoteRouter);
app.use('/api/v1/authors', authorRouter);
app.use('/api/v1/users', userRouter);


module.exports =  app;