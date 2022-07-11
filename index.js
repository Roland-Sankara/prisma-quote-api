const express = require('express');
const app = express();

// routers
const quoteRouter = require('./routes/quoteRouter');
const userRouter = require('./routes/userRouter');


// Middleware
app.use(express.json())


// Request Handlers
app.use('/quotes', quoteRouter);
// app.use('/authors', )
app.use('/users', userRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is listening on: http://localhost:${PORT}`)
})