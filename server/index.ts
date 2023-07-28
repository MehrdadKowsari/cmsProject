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

import postCategoryRouter from './src/routers/contentManagement/postCategoryRouter';
import postRouter from './src/routers/contentManagement/postRouter';
import postImageRouter from './src/routers/contentManagement/postImageRouter';
import postFileRouter from './src/routers/contentManagement/postFileRouter';
import postTagRouter from './src/routers/contentManagement/postTagRouter';
import postCommentRouter from './src/routers/contentManagement/postCommentRouter';
import relatedPostRouter from './src/routers/contentManagement/relatedPostRouter';
import tagRouter from './src/routers/contentManagement/tagRouter';
import galleryCategoryRouter from './src/routers/contentManagement/galleryCategoryRouter';
import galleryRouter from './src/routers/contentManagement/galleryRouter';
import galleryFileRouter from './src/routers/contentManagement/galleryFileRouter';
import sliderRouter from './src/routers/contentManagement/sliderRouter';
import sliderItemRouter from './src/routers/contentManagement/sliderItemRouter';
import menuRouter from './src/routers/contentManagement/menuRouter';
import menuItemRouter from './src/routers/contentManagement/menuItemRouter';
import contentBlockRouter from './src/routers/contentManagement/contentBlockRouter';
import homeRouter from './src/routers/contentManagement/homeRouter';
import blogRouter from './src/routers/contentManagement/blogRouter';
import contentRouter from './src/routers/contentManagement/contentRouter';

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

app.use('/postCategory', authMiddleware, postCategoryRouter);
app.use('/post', authMiddleware, postRouter);
app.use('/tag', authMiddleware, tagRouter);
app.use('/postTag', authMiddleware, postTagRouter);
app.use('/postFile', authMiddleware, postFileRouter);
app.use('/postImage', authMiddleware, postImageRouter);
app.use('/postComment', authMiddleware, postCommentRouter);
app.use('/relatedPost', authMiddleware, relatedPostRouter);
app.use('/galleryCategory', authMiddleware, galleryCategoryRouter);
app.use('/gallery', authMiddleware, galleryRouter);
app.use('/galleryFile', authMiddleware, galleryFileRouter);
app.use('/slider', authMiddleware, sliderRouter);
app.use('/sliderItem', authMiddleware, sliderItemRouter);
app.use('/menu', authMiddleware, menuRouter);
app.use('/menuItem', authMiddleware, menuItemRouter);
app.use('/contentBlock', authMiddleware, contentBlockRouter);

app.use('/home', homeRouter);
app.use('/blog', blogRouter);
app.use('/content', contentRouter);


//const CLOUD_CONNECTION_URL = process.env.CLOUD_CONNECTION_URL;
const DB_NAME = process.env.DB_NAME; 
const LOCAL_CONNECTION_URL = `${process.env.LOCAL_CONNECTION_URL}/${DB_NAME}`;
const PORT = process.env.PORT; 
mongoose.connect(LOCAL_CONNECTION_URL, { })
.then(() => app.listen(PORT, () => console.log(`Server Running on Port ${PORT}`)))
.catch((error) => console.log(error.message));

