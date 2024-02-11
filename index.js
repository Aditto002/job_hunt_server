import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from "./routes/user.route.js"
import authRouters from "./routes/auth.route.js"

dotenv.config();



//Connected to MOngoDB
mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Connected to MOngoDB");
})
.catch((e)=>{
    console.log(e)
})



const app = express ();
app.use(express.json());



app.listen(3000,() => {
    console.log(
        'server is listening on por 30000'
    );
})


app.use("/api/user",userRoutes)
app.use("/api/auth",authRouters)