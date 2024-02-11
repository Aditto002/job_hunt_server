import User from "../models/user.model.js"

export const singup = async(req,res) =>{
     //add more info -----------------------------------------------------------------------------------
    const {username , email, password} = req.body;
    const newUser = new User({username,email,password});

    try{
        await newUser.save()
        res.status(201).json({message : "User created Successfully"});
    }
    catch(e){
        res.status(500).json(e.message);
    }

    
};