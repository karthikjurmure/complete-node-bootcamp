const express = require('express');
const app = express();
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

app.use(morgan('dev'));
app.use(express.json());

app.use((req,res,next)=>{
    console.log("hello from the middleware");
    next();
});

app.use((req,res,next)=>{
    req.requestTime=new Date().toISOString();
    next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.get('/',(req,res)=>{
    res.status(200).json({
        message:"hello from the server side!",
        app:"natours"
    });
});

module.exports=app;