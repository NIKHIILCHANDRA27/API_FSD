import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  link: String
});

const candidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  skills: [{ type: String }],
  experience: { type: Number, default: 0 },
  resumeUrl: { type: String },
  github: { type: String },
  linkedin: { type: String },
  portfolio: { type: String },
  bio: { type: String },
  projects: [projectSchema],
  aiScore: { type: Number, default: 0 },
  shortlist: { type: Boolean, default: false },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Candidate = mongoose.model('Candidate', candidateSchema);
export default Candidate;
