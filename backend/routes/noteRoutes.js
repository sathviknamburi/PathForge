import express from 'express';
import { getNotes, createNote, updateNote, deleteNote } from '../controllers/noteController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// All note routes are protected (user must be logged in)
router.use(auth);

router.get('/', getNotes);
router.post('/', createNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

export default router;
