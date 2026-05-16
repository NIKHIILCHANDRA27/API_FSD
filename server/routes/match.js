import express from 'express';
import { basicMatch, aiMatch, generateQuestions } from '../controllers/matchController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(protect);

router.post('/basic', basicMatch);
router.post('/ai', aiMatch);
router.post('/questions', generateQuestions);

export default router;
