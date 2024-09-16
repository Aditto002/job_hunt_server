import AplliedJob from '../models/appliedjob.model.js';
import JobPost from '../models/jobpost.model.js'
export const jobappied = async (req, res) => {
    
    const { name, email, phone_number, Address, education,experience,skills ,pdf, jobId} = req.body;
    console.log("req body", req.body)
    
    const user = req.user._id;

    console.log("user id", user)
    try {

        const newApplied = await AplliedJob.create({
            name:name,
            email: email,
            phone_number:phone_number,
            Address: Address,
            education: education,
            experience: experience,
            skills:skills,
            pdf:pdf,
            jobId:jobId,
            applier_user: user
        })
        // const newApplied = await AplliedJob.create(reqBody)
        if(!newApplied){
          return res.status(400).json( {message: "error successfully"});
        }

        const job = await JobPost.findById(jobId);
        if(!job){
            return res.status(400).json( {message: "job id not found successfully"});
        }
        // console.log(job)
        job.applied.push(newApplied);
        job.applied_user.push(user)
        await job.save()
        console.log("ashkjfhkasjdfhl ",job)
        console.log("success")

        res.status(200).json({ message: "successfully", data: newApplied });
    }
    catch (err) {
        console.log(err)
    }
};

export const getJobPostsWithApplicants = async (req, res) => {
    const user = req.user._id;
    console.log("user post info ",req.user)
    try {
      const jobPosts = await JobPost.find({ admin: user })
        .populate({
          path: 'applied',
          model: "AplliedJob"
        })
        .exec();
      
        res.status(200).json({ message: "successfully", data: jobPosts });
    } catch (error) {
      console.error('Error populating applied jobs:', error);
      throw error;
    }
  };

  export const getJobPostsWithApplied = async (req, res) => {
    const user = req.user._id;
    console.log("user info   ",req.user)
    try {
      const jobPosts = await JobPost.find({ applied_user: user }) .populate('applied_user').exec();
      
        res.status(200).json({ message: "successfully", data: jobPosts });
    } catch (error) {
      console.error('Error populating applied jobs:', error);
      throw error;
    }
  };
