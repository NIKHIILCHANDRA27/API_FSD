import express from 'express';
import { addCandidate, getCandidates, getCandidateById, updateCandidate, deleteCandidate, shortlistCandidate, computeScoreForCandidate } from '../controllers/candidateController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);
router.post('/add', addCandidate);
router.get('/', getCandidates);
router.get('/:id', getCandidateById);
router.put('/:id', updateCandidate);
router.delete('/:id', deleteCandidate);
router.put('/:id/shortlist', shortlistCandidate);
router.post('/:id/compute-score', computeScoreForCandidate);

export default router;
