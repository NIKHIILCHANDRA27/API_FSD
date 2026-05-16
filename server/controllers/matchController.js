import Candidate from '../models/Candidate.js';
import { computeCandidateScore } from '../utils/matchUtils.js';
import { generateInterviewQuestions } from '../utils/openRouter.js';

export const basicMatch = async (req, res, next) => {
  try {
    const { job } = req.body;
    const candidates = await Candidate.find();
    const results = candidates.map((candidate) => ({
      candidate,
      score: computeCandidateScore(candidate, job)
    })).sort((a, b) => b.score - a.score);
    res.json(results);
  } catch (error) {
    next(error);
  }
};

export const aiMatch = async (req, res, next) => {
  try {
    const { candidates, job } = req.body;
    const prompt = `Evaluate these candidates against the following job role. Provide a ranked list with reasons and highlight top strengths and risks. Job: ${job.title}, required skills: ${job.requiredSkills.join(', ')}, preferred skills: ${job.preferredSkills.join(', ')}, experience: ${job.minExperience}. Candidates: ${candidates.map((candidate) => `${candidate.name}: skills ${candidate.skills.join(', ')}, experience ${candidate.experience} years, projects ${candidate.projects?.map((p) => p.title).join('; ')}`).join(' | ')}`;
    const aiResponse = await generateInterviewQuestions(prompt, 'candidate-ranking');
    res.json({ aiResponse });
  } catch (error) {
    next(error);
  }
};

export const generateQuestions = async (req, res, next) => {
  try {
    const { candidate, job } = req.body;
    const aiOutput = await generateInterviewQuestions(
      `Create 5 premium interview questions for a ${job.title} role. Candidate has skills ${candidate.skills.join(', ')}, experience ${candidate.experience} years, and projects ${candidate.projects?.map((p) => p.title).join(', ')}. Use the tone of an investor-grade HR SaaS platform.`,
      'interview-questions'
    );
    res.json({ questions: aiOutput });
  } catch (error) {
    next(error);
  }
};
