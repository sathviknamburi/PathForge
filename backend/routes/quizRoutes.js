import express from 'express';
import { getQuiz, submitQuiz, getAllQuizzes } from '../controllers/quizController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllQuizzes);
router.get('/:roadmapId/:topicTitle', getQuiz);
router.post('/:quizId/submit', auth, submitQuiz);  // Protected: needs login

export default router;
