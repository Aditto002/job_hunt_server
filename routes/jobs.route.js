import express from 'express';
import { addjob, jobCoutn, jobposts} from '../controllers/job.controller.js';
import JobPost from '../models/jobpost.model.js';
import AuthMiddleware from "../middleware/authMiddleware.js"
import { admindeletePost, adminpost, adminupdatePost,adminPostdetails } from '../controllers/analytics.controller.js';



const router = express.Router();
 router.post("/addjobs",AuthMiddleware, addjob)
router.get("/jobs",jobposts);
router.get('/job-counts',jobCoutn);
router.get("/admintotalpost",AuthMiddleware,adminpost);
router.delete("/admindeletepost/:id",admindeletePost);
router.put("/adminupdatePost/:id", adminupdatePost);
router.get("/adminPostdetails/:id",adminPostdetails);


export default router;