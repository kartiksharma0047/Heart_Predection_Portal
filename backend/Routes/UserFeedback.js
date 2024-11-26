import express from 'express';
import {handleUserFeedback,ShowFeedbacks} from '../Controllers/UserFeedback.js';

const UserFeedback=express.Router();
const ShowFeedback=express.Router();

UserFeedback.post('/',handleUserFeedback);
ShowFeedback.get('/',ShowFeedbacks);

export  {UserFeedback, ShowFeedback};