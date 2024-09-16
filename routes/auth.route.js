import express from 'express';
import { singup, verifyEmail } from '../controllers/auth.controller.js';
import { signin } from '../controllers/auth.controller.js';

const router = express.Router();


  router.post("/singup",singup)
  router.post('/verify', verifyEmail);
  router.post("/singin",signin)

export default router;