import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();



//Connected to MOngoDB
mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Connected to MOngoDB");
})
.catch((e)=>{
    console.log(e)
})
//hgjhg


const app = express ();

app.listen(3000,() => {
    console.log(
        'server is listening on por 30000'
    );
})