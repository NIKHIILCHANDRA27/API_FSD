import Job from '../models/Job.js';

export const createJob = async (req, res, next) => {
  try {
    const job = await Job.create({
      ...req.body,
      requiredSkills: req.body.requiredSkills?.filter(Boolean) || [],
      preferredSkills: req.body.preferredSkills?.filter(Boolean) || []
    });
    res.status(201).json(job);
  } catch (error) {
    next(error);
  }
};

export const getJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    next(error);
  }
};
