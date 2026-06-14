import express from 'express';
import { getSubjectsByBranch, getAllSubjects } from '../controllers/subjectController.js';

const router = express.Router();

router.get('/', getAllSubjects);
router.get('/:branch', getSubjectsByBranch);

export default router;
