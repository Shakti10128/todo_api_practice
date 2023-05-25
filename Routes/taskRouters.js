import express from 'express'
import { deleteTask, getAllTask, newTask, updateTask } from '../controllers/taksController.js';
import { isAuth } from '../middlewares/isAuth.js';

export const taskRouters = express.Router();


taskRouters.get('/all',isAuth,getAllTask);
taskRouters.post('/new',isAuth,newTask);
taskRouters.put('/:id',isAuth,updateTask);
taskRouters.delete('/:id',isAuth,deleteTask);