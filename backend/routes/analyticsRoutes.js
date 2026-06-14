import express from 'express';
import { getAnalytics } from '../controllers/analyticsController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, getAnalytics);

export default router;
