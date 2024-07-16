import express from 'express';
import { addjob, jobCoutn, jobposts} from '../controllers/job.controller.js';
import JobPost from '../models/jobpost.model.js';




const router = express.Router();
 router.post("/addjobs",addjob)
router.get("/jobs",jobposts);
router.get('/job-counts',jobCoutn);

export default router;