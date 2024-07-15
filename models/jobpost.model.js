import mongoose from 'mongoose';

const jobPostSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  salary: { type: Number, required: true },
  description: { type: String, required: true },
}, { timestamps: true, versionKey: false });

const JobPost = mongoose.model('JobPost', jobPostSchema);

export default JobPost;
