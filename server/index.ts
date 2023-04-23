import 'reflect-metadata';
import * as dotenv from 'dotenv'
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import authRouter from './src/routers/authRouter'
import userRouter from './src/routers/userRouter'

import authMiddleware from './src/middleware/authMiddleware';
 
const app = express();

app.use(cors());

app.use(express.json({limit: '30mb', strict: false}));
app.use(express.urlencoded({limit: '30mb', extended: true}));

app.use('/auth', authRouter);
app.use('/user', authMiddleware, userRouter);


//const CLOUD_CONNECTION_URL = process.env.CLOUD_CONNECTION_URL;
const DB_NAME = process.env.DB_NAME; 
const LOCAL_CONNECTION_URL = `${process.env.LOCAL_CONNECTION_URL}/${DB_NAME}`;
const PORT = process.env.PORT; 
mongoose.connect(LOCAL_CONNECTION_URL, { })
.then(() => app.listen(PORT, () => console.log(`Server Running on Port ${PORT}`)))
.catch((error) => console.log(error.message));

