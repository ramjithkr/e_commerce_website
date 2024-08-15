import express from 'express';
import userRouter from './userRouter.js';
import productRouter from './productRouter.js';
import adminRouter from './adminRouter.js'
const v1Router = express.Router();


v1Router.use('/user',userRouter)
v1Router.use('/product',productRouter)
v1Router.use('/admin',adminRouter);


export default v1Router