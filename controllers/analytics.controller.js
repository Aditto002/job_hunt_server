import User from "../models/user.model.js"
import JobPost from '../models/jobpost.model.js';



export const adminpost = async (req, res) => {
    const user = req.user
    console.log('hello',req.user)
    console.log("user from admin post", user)
    try {
        const adminOwnPost = await JobPost.find({admin: user._id})
      const totalPost = adminOwnPost.length;
      
      console.log('totalpost',totalPost)
      console.log('adminOwnPost',adminOwnPost)
      res.json({ adminOwnPost, totalPost });
    } catch (error) {
      res.status(500).send('Server error');
    }
  }
  export const admindeletePost = async (req, res) => {
    const jobId  = req.params.id;
    
   console.log(jobId)
//    console.log(jobId.id)
    try {
      const deletedPost = await JobPost.findByIdAndDelete(jobId);
  
      if (!deletedPost) {
        return res.status(404).json({ message: 'Job post not found' });
      }
  
      res.json({ message: 'Post deleted successfully' });
    } catch (error) {
      res.status(500).send('Server error');
    }
  };


  export  const adminPostdetails =async (req, res) => {
    const jobId = req.params.id;
    try {
      const jobPost = await JobPost.findById(jobId);
      if (!jobPost) {
        return res.status(404).json({ message: 'Job post not found' });
      }
      res.json(jobPost);
    } catch (error) {
      res.status(500).send('Server error');
    }
  };


  ///////////////////////////////////////////////////////////////////////////

  export const adminupdatePost = async (req, res) => {
    const jobId = req.params.id;
    const updates = req.body;
    console.log("Received jobId:", jobId);
    console.log("Updates:", updates);
    try {
      const updatedPost = await JobPost.findByIdAndUpdate(jobId, updates, { new: true });
  
      if (!updatedPost) {
        return res.status(404).json({ message: 'Job post not found' });
      }
  
      res.json({ message: 'Post updated successfully', updatedPost });
    } catch (error) {
      console.error('Error updating job post:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  