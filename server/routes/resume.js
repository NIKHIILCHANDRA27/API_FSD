import express from 'express';
import { uploadResume } from '../controllers/resumeController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/upload', protect, uploadResume);

export default router;
