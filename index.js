import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from "./routes/user.route.js"
import authRouters from "./routes/auth.route.js"
import jobRouters from "./routes/jobs.route.js"

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
        'server is listening on port 3000'
    );
})
/////////////////////////////////////////////////
app.get('/success-payment', (req, res) => {
    res.send("Payment was successful!");
  });

app.use("/api/user",userRoutes)
app.use("/api/auth",authRouters)
app.use("/api/job",jobRouters)

app.use((err, req, res, next) =>{
    const statusCode = err.statusCode || 500;
    const message = err.message || " Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode,
    });
});