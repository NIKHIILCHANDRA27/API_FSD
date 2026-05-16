import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Recruiter from '../models/Recruiter.js';

const signToken = (recruiter) => {
  return jwt.sign({ id: recruiter._id, email: recruiter.email }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password, company, role } = req.body;
    const existing = await Recruiter.findOne({ email });
    if (existing) return res.status(409).json({ message: 'Email already in use' });

    const hashed = await bcrypt.hash(password, 12);
    const recruiter = await Recruiter.create({ name, email, password: hashed, company, role });
    const token = signToken(recruiter);

    res.status(201).json({ recruiter: { id: recruiter._id, name: recruiter.name, email: recruiter.email, company: recruiter.company }, token });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const recruiter = await Recruiter.findOne({ email });
    if (!recruiter) return res.status(401).json({ message: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, recruiter.password);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

    const token = signToken(recruiter);
    res.json({ recruiter: { id: recruiter._id, name: recruiter.name, email: recruiter.email, company: recruiter.company }, token });
  } catch (error) {
    next(error);
  }
};
