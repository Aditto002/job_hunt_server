import express from 'express';
import { jobposts} from '../controllers/user.controller.js';
import JobPost from '../models/jobpost.model.js';



const router = express.Router();

router.get("/jobs",jobposts);
router.get('/job-counts', async (req, res) => {
    try {
      const totalJobs = await JobPost.countDocuments();
      const partTimeJobs = await JobPost.countDocuments({ jobType: 'part' });
      const fullTimeJobs = await JobPost.countDocuments({ jobType: 'full' });
  
      res.json({ totalJobs, partTimeJobs, fullTimeJobs });
    } catch (error) {
      res.status(500).send('Server error');
    }
  });

export default router;