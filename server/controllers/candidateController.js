import Candidate from '../models/Candidate.js';
import { computeCandidateScore } from '../utils/matchUtils.js';

export const addCandidate = async (req, res, next) => {
  try {
    const candidate = await Candidate.create({
      ...req.body,
      skills: req.body.skills?.filter(Boolean) || []
    });
    res.status(201).json(candidate);
  } catch (error) {
    next(error);
  }
};

export const getCandidates = async (req, res, next) => {
  try {
    const { search, skill, experience, sort } = req.query;
    const filter = {};
    if (search) {
      filter.$or = [
        { name: new RegExp(search, 'i') },
        { email: new RegExp(search, 'i') },
        { bio: new RegExp(search, 'i') }
      ];
    }
    if (skill) filter.skills = { $in: [skill] };
    if (experience) filter.experience = { $gte: Number(experience) };
    const sortOption = sort === 'score' ? { aiScore: -1 } : { createdAt: -1 };
    const candidates = await Candidate.find(filter).sort(sortOption);
    res.json(candidates);
  } catch (error) {
    next(error);
  }
};

export const getCandidateById = async (req, res, next) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) return res.status(404).json({ message: 'Candidate not found' });
    res.json(candidate);
  } catch (error) {
    next(error);
  }
};

export const updateCandidate = async (req, res, next) => {
  try {
    const candidate = await Candidate.findByIdAndUpdate(req.params.id, {
      ...req.body,
      skills: req.body.skills?.filter(Boolean) || []
    }, { new: true });
    if (!candidate) return res.status(404).json({ message: 'Candidate not found' });
    res.json(candidate);
  } catch (error) {
    next(error);
  }
};

export const deleteCandidate = async (req, res, next) => {
  try {
    const candidate = await Candidate.findByIdAndDelete(req.params.id);
    if (!candidate) return res.status(404).json({ message: 'Candidate not found' });
    res.json({ message: 'Candidate removed' });
  } catch (error) {
    next(error);
  }
};

export const shortlistCandidate = async (req, res, next) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) return res.status(404).json({ message: 'Candidate not found' });
    candidate.shortlist = true;
    await candidate.save();
    res.json(candidate);
  } catch (error) {
    next(error);
  }
};

export const computeScoreForCandidate = async (req, res, next) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) return res.status(404).json({ message: 'Candidate not found' });
    const { job } = req.body;
    const score = computeCandidateScore(candidate, job);
    candidate.aiScore = score;
    await candidate.save();
    res.json({ score, candidate });
  } catch (error) {
    next(error);
  }
};
