import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  requiredSkills: [{ type: String }],
  preferredSkills: [{ type: String }],
  minExperience: { type: Number, default: 0 },
  salary: { type: String },
  location: { type: String },
  type: { type: String, enum: ['Remote', 'Hybrid', 'Onsite'], default: 'Remote' },
  description: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Job = mongoose.model('Job', jobSchema);
export default Job;
