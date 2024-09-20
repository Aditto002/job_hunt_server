import express from 'express';
import { singup, verifyEmail } from '../controllers/auth.controller.js';
import { signin } from '../controllers/auth.controller.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { paymentApply, successPayment } from '../controllers/paymentController.js';


const router = express.Router();


  router.post("/singup",singup)
  router.post('/verify', verifyEmail);
  router.post("/singin",signin)
  router.get("/paymentApply/:id",authMiddleware,paymentApply)
  router.post('/success-payment', successPayment);

export default router;