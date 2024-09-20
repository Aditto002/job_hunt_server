import User from "../models/user.model.js"
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import Jwt from "jsonwebtoken";
import OTPModel from "../models/OTPModel.js";
import otpGenerator from "otp-generator";
import { SendEmailUtils } from "../utils/sendEmail.js";



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
        

        const OTPCode = otpGenerator.generate(4, {
            digits: true,
            alphabets: false,
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false,
          });
        
          const userCount = await User.aggregate([
            { $match: { email: email } },
            { $count: "total" },
          ]);
        
          if (userCount.length > 0) {
            // Insert OTP into the database
            await OTPModel.create({ email: email, otp: OTPCode });
        
            // Send email with OTP
            const emailMessage = `Your Verification Pin Code is: ${OTPCode}`;
            const emailSubject = "JobNest";
            const emailSend = await SendEmailUtils(email, emailMessage, emailSubject);
        
            newUser.password = undefined;
            let Payload = {
                exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
                data: newUser,
              };
              let token = Jwt.sign(Payload, "aditto");
    
              console.log(token)
        
            return res.status(201).json({
              status: true,
              message: "Check Your Mail For Verification OTP",
              data: newUser,
              token: token
            });
          } else {
            return res.status(400).json({ message: "User not found" });
          }
            

        // if(!newUser){
        //   return res.status(400).json( {message: "error created successfully"});
        // }


        // let Payload = {
        //     exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
        //     data: newUser,
        //   };
        //   let token = Jwt.sign(Payload, "aditto");

        //   console.log(token)

        // res.status(200).json({ message: "User created successfully", data: newUser , token: token});
    }
    catch (err) {
        // next(err)
        console.log(err)
    }
};
/////////////////////////////////////////////////////////////////
export const verifyEmail = async (req, res, next) => {
    const { email,otp } = req.body;
  
    try {
        // Find the user by ID
        const user = await User.findOne({email});
  
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
  
        if (user.isVerified) {
            return res.status(400).json({ message: "User already verified" });
        }
  
        const OTPStatus = 0; // Status 0 indicates the OTP is not yet verified
        const OTPCount = await OTPModel.countDocuments({
          email,
          otp,
          status: OTPStatus,
        });
      
        if (OTPCount === 0) {
          return res.status(400).json({ message: "invalid OTP" });
        }
      
        // Update OTP status to indicate verification
        await OTPModel.updateOne({ email, otp, status: OTPStatus }, { status: 1 });
      
        user.isVerified = true;
        user.save();
        let Payload = {
          exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
          data: user,
        };
        let token = Jwt.sign(Payload, "aditto");

        console.log(token)
  
        res.status(200).json({ message: "Email verified successfully!",
          data: {
            token: token,
            user: user,
        },
         });
    } catch (err) {
        res.status(400).json({ message: "Invalid or expired token" });
        console.log(err.message);
    }
  };

////////////////////////////////////////////////////////////////

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