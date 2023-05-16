import 'reflect-metadata';
import * as dotenv from 'dotenv'
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import authRouter from './src/routers/security/authRouter'
import userRouter from './src/routers/security/userRouter'
import roleRouter from './src/routers/security/roleRouter'
import userRoleRouter from './src/routers/security/userRoleRouter'
import pageRouter from './src/routers/security/pageRouter'
import permissionRouter from './src/routers/security/permissionRouter'
import pagePermissionRouter from './src/routers/security/pagePermissionRouter'
import rolePagePermissionRouter from './src/routers/security/rolePagePermissionRouter'

import authMiddleware from './src/middleware/seucrity/authMiddleware';
import { i18n }  from "./i18next";
 
const app = express();

app.use(cors());

app.use(express.json({limit: '30mb', strict: false}));
app.use(express.urlencoded({limit: '30mb', extended: true}));


i18n.init({ app });

app.use('/auth', authRouter);
app.use('/user', authMiddleware, userRouter);
app.use('/role', authMiddleware, roleRouter);
app.use('/userRole', authMiddleware, userRoleRouter);
app.use('/page', authMiddleware, pageRouter);
app.use('/permission', authMiddleware, permissionRouter);
app.use('/pagePermission', authMiddleware, pagePermissionRouter);
app.use('/rolePagePermission', authMiddleware, rolePagePermissionRouter);


//const CLOUD_CONNECTION_URL = process.env.CLOUD_CONNECTION_URL;
const DB_NAME = process.env.DB_NAME; 
const LOCAL_CONNECTION_URL = `${process.env.LOCAL_CONNECTION_URL}/${DB_NAME}`;
const PORT = process.env.PORT; 
mongoose.connect(LOCAL_CONNECTION_URL, { })
.then(() => app.listen(PORT, () => console.log(`Server Running on Port ${PORT}`)))
.catch((error) => console.log(error.message));

