import express from 'express';
import { getRoadmaps, getRoadmapById, getRoadmapsByCategory } from '../controllers/roadmapController.js';

const router = express.Router();

router.get('/', getRoadmaps);
router.get('/category/:category', getRoadmapsByCategory);
router.get('/:id', getRoadmapById);

export default router;
