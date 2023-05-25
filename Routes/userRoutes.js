import express from 'express';
import { isAuth } from '../middlewares/isAuth.js';
import { createUser, getUser, logOut, login } from '../controllers/userController.js';


export const userRoutes = express.Router();

userRoutes.get('/me',isAuth,getUser);
userRoutes.post('/new',createUser);
userRoutes.post('/login',login);
userRoutes.get('/logout',isAuth,logOut)