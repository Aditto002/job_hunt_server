import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import JobPost from '../models/jobpost.model.js';

export const test=((req,res) => {
    res.json({
        message:"hello API Is Working",
    });
  
});

export const updateUser =async(req,res)=>{

    const userId = req.params.id;
     try {
         if(req.body.password){
             req.body.password = bcryptjs.hashSync(req.body.password,10);
         }
         const updatedUser = await User.findByIdAndUpdate(
             userId,
             {    
                     username: req.body.username,
                     email : req.body.email,
                     password : req.body.password,
                     profilePicture: req.body.profilePicture,
                 
             },{new: true}
         )
         console.log(updateUser)
         res.status(200).json({
             data: updatedUser
         });
         
     } catch (error) {
         console.log(error);
     }
 
 }
//delete
 export const deleteUser = async (req, res ) => {
    console.log("Request Params ID:", req.params.id);
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json('User has been deleted...');
    } catch (error) {
        console.log(error);
    }
};
//const post =post.save()
//const user = await userModel.findById()
//user.posts.push(post._id)

//await user.save()

/*
    const admin = await userModel.findById(userId).populate("posts")
 */


/////jobs

export const jobposts = async (req, res) => {
    try {
        const jobPosts = await JobPost.find();
        res.status(200).json(jobPosts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

