import User from "../models/user.model.js"
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import Jwt from "jsonwebtoken";




export const singup = async (req, res) => {
    console.log("this is enter in the controller")
    const { username, email, password, userType } = req.body;
    try {
        const hashpassword = bcryptjs.hashSync(password, 10);
        console.log(hashpassword)

        const existUser = await User.findOne({ email: email })
        if (existUser) {
            return res.status(200).json({
                status: "success",
                message: "user already exists",
                success: "false"
            })
        }
        const newUser = await User.create({
            email: email,
            password: hashpassword,
            username: username,
            userType
        })
        if(!newUser){
          return res.status(400).json( {message: "error created successfully"});
        }


        let Payload = {
            exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
            data: newUser,
          };
          let token = Jwt.sign(Payload, "aditto");

          console.log(token)

        res.status(200).json({ message: "User created successfully", data: newUser , token: token});
    }
    catch (err) {
        // next(err)
        console.log(err)
    }
};


export const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const vaildUser = await User.findOne({ email });
        if (!vaildUser) return res.status(400).json({ message: "usir name not found" })
        const vaildpassword = bcryptjs.compareSync(password, vaildUser.password);
        if (!vaildpassword) return res.status(400).json({ message: "pass  name not found" })

            let Payload = {
                exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
                data: vaildUser,
              };
              let token = Jwt.sign(Payload, "aditto");
    
              console.log(token)
        return res.status(200).json({
            status: "success",
            data: {
                token: token,
                user: vaildUser,
            },
            token: token,
            userType: vaildUser.userType
        })

    }
    catch (err) {
        console.log(err)
    }
    console.log(data);
}