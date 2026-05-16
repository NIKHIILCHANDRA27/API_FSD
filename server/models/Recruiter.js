import mongoose from 'mongoose';

const recruiterSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  company: { type: String, default: 'HireGenius' },
  role: { type: String, default: 'Recruiter' },
  createdAt: { type: Date, default: Date.now }
});

const Recruiter = mongoose.model('Recruiter', recruiterSchema);
export default Recruiter;
