import 'reflect-metadata';
import * as dotenv from 'dotenv'
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import i18next from 'i18next';
import i18nextMiddleware  from 'i18next-http-middleware';
import Backend from 'i18next-fs-backend';


import authRouter from './src/routers/authRouter'
import userRouter from './src/routers/userRouter'

import authMiddleware from './src/middleware/authMiddleware';
 
const app = express();

app.use(cors());

app.use(express.json({limit: '30mb', strict: false}));
app.use(express.urlencoded({limit: '30mb', extended: true}));

i18next
  .use(Backend)
  // .use(languageDetector)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    // debug: true,
    // detection: {
    //   order: ['customDetector']
    // },
    backend: {
      // eslint-disable-next-line no-path-concat
      loadPath: __dirname + '/locales/{{lng}}/{{ns}}.json',
      // eslint-disable-next-line no-path-concat
      //addPath: __dirname + '/locales/{{lng}}/{{ns}}.missing.json'
    },
    fallbackLng: 'en',
    // nonExplicitSupportedLngs: true,
    supportedLngs: ['en', 'fa'],
    load: 'languageOnly',
    saveMissing: true
  })

app.use(i18nextMiddleware.handle(i18next))

app.use('/auth', authRouter);
app.use('/user', authMiddleware, userRouter);


//const CLOUD_CONNECTION_URL = process.env.CLOUD_CONNECTION_URL;
const DB_NAME = process.env.DB_NAME; 
const LOCAL_CONNECTION_URL = `${process.env.LOCAL_CONNECTION_URL}/${DB_NAME}`;
const PORT = process.env.PORT; 
mongoose.connect(LOCAL_CONNECTION_URL, { })
.then(() => app.listen(PORT, () => console.log(`Server Running on Port ${PORT}`)))
.catch((error) => console.log(error.message));

