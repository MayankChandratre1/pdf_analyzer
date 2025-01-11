import express from 'express';
import pdfAnalyzerRouter from './routes/pdfAnalyzer.js';
import cors from "cors"
import connectDB from './config/db.js';
import userRouter from './routes/userRoutes.js';
import {clerkMiddleware} from "@clerk/express"

const app = express();
app.use(express.json())
app.use(cors())
connectDB()

app.use(clerkMiddleware())
app.use('/api/pdf', pdfAnalyzerRouter);
app.use('/api/users', userRouter);


app.listen(3002, ()=>{
    console.log("Listening 3002");
})

