import mongoose from 'mongoose';

const shortlistSchema = new mongoose.Schema({
  recruiter: { type: mongoose.Schema.Types.ObjectId, ref: 'Recruiter', required: true },
  title: { type: String, default: 'Saved shortlist' },
  candidateIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Candidate' }],
  notes: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Shortlist = mongoose.model('Shortlist', shortlistSchema);
export default Shortlist;
