import JobPost from '../models/jobpost.model.js';

export const addjob = async(req, res)=>{
      const {jobTitle,company,location,jobType,salary,experience,qualifications,description} = req.body;
      const newPost = await JobPost.create({
        jobTitle: jobTitle,
        company: company,
        location: location,
        jobType:jobType,
        salary: salary,
        experience: experience,
        qualifications: qualifications,
        description: description
      })
      res.status(200).json({ message: "Post created successfully",
        status: "success",
        success: "false", 
        data: newPost });

}


export const jobposts = async (req, res) => {
    try {
        const jobPosts = await JobPost.find();
        res.status(200).json(jobPosts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};



/// job count

export const jobCoutn = async (req, res) => {
    try {
      const totalJobs = await JobPost.countDocuments();
      const partTimeJobs = await JobPost.countDocuments({ jobType: 'part' });
      const fullTimeJobs = await JobPost.countDocuments({ jobType: 'full' });
  
      res.json({ totalJobs, partTimeJobs, fullTimeJobs });
    } catch (error) {
      res.status(500).send('Server error');
    }
  }