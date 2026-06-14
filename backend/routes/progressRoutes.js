import express from 'express';
import { getProgress, completeTopic, updateDailyGoals, getAchievements } from '../controllers/progressController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// All progress routes are protected
router.use(auth);

router.get('/', getProgress);
router.post('/complete-topic', completeTopic);
router.post('/daily-goals', updateDailyGoals);
router.get('/achievements', getAchievements);

export default router;
