import express from 'express';
import { createJob, getJobs } from '../controllers/jobController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(protect);

router.post('/create', createJob);
router.get('/', getJobs);

export default router;
