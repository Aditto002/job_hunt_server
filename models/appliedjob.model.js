import mongoose from 'mongoose';

const AplliedJobSchema = new mongoose.Schema({
  name: { type: String},
  email: { type: String },
  phone_number: { type: String },
  Address: { type: String },
  education: { type: String },
  experience: { type: String},
  skills: { type: String},
  applier_user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  pdf: {
    type: String
  }
 
}, { timestamps: true, versionKey: false });

const AplliedJob = mongoose.model('AplliedJob', AplliedJobSchema);

export default AplliedJob;