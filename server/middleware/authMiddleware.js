import jwt from 'jsonwebtoken';
import Recruiter from '../models/Recruiter.js';

export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) return res.status(401).json({ message: 'Unauthorized' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.recruiter = await Recruiter.findById(decoded.id).select('-password');
    if (!req.recruiter) return res.status(401).json({ message: 'Unauthorized' });
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
