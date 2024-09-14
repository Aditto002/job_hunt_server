import JobPost from '../models/jobpost.model.js';

export const addjob = async(req, res)=>{
      const {jobTitle,company,location,jobType,salary,experience,qualifications,description} = req.body;
      const adminId = req.user._id; 
      console.log("req user create post",adminId)

      console.log("req body create post",req.body)
      const newPost = await JobPost.create({
        jobTitle: jobTitle,
        company: company,
        location: location,
        jobType:jobType,
        salary: salary,
        experience: experience,
        qualifications: qualifications,
        description: description,
      admin: adminId,


      })
      if(!newPost){
        return res.status(400).json("new post not created")
      }
      //get all data
      

      return res.status(200).json({ message: "Post created successfully",
        status: "success",
        success: "true", 
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

  ////admin
  // export const adminjobCoutn = async (req, res) => {
  //   const adminId = req.user.adminid; 
  
  //   try {
  //     const totalJobs = await JobPost.countDocuments({ admin: adminId });
  //     const partTimeJobs = await JobPost.countDocuments({ admin: adminId, jobType: 'part' });
  //     const fullTimeJobs = await JobPost.countDocuments({ admin: adminId, jobType: 'full' });
  
  //     res.json({ totalJobs, partTimeJobs, fullTimeJobs });
  //   } catch (error) {
  //     res.status(500).send('Server error');
  //   }
  // };