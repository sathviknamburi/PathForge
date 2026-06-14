import Note from '../models/Note.js';
import { mockNotes, generateId, achievementDefinitions, mockProgress } from '../config/mockDb.js';

/**
 * 📝 Note Controller
 * Handles: Create, Read, Update, Delete notes for authenticated users
 */

// @desc    Get all notes for current user
// @route   GET /api/notes
export const getNotes = async (req, res) => {
  try {
    if (global.isMockDB) {
      const userNotes = mockNotes
        .filter(n => n.userId === req.user.id)
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
      return res.json(userNotes);
    }

    const notes = await Note.find({ userId: req.user.id }).sort({ updatedAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch notes', error: error.message });
  }
};

// @desc    Create a new note
// @route   POST /api/notes
export const createNote = async (req, res) => {
  const { title, content, tags } = req.body;

  if (!title) return res.status(400).json({ message: 'Title is required' });

  try {
    if (global.isMockDB) {
      const newNote = {
        _id: generateId(),
        userId: req.user.id,
        title,
        content: content || '',
        tags: tags || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      mockNotes.push(newNote);

      // Check "First Note" achievement
      const userNotes = mockNotes.filter(n => n.userId === req.user.id);
      if (userNotes.length === 1) {
        const progress = mockProgress.find(p => p.userId === req.user.id);
        const badge = achievementDefinitions.find(a => a.badgeId === 'first_note');
        if (progress && badge && !progress.achievements.find(a => a.badgeId === 'first_note')) {
          progress.achievements.push({ ...badge, unlockedAt: new Date().toISOString() });
        }
      }

      return res.status(201).json(newNote);
    }

    const note = await Note.create({ userId: req.user.id, title, content, tags });
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create note', error: error.message });
  }
};

// @desc    Update a note
// @route   PUT /api/notes/:id
export const updateNote = async (req, res) => {
  const { title, content, tags } = req.body;

  try {
    if (global.isMockDB) {
      const idx = mockNotes.findIndex(n => n._id === req.params.id && n.userId === req.user.id);
      if (idx === -1) return res.status(404).json({ message: 'Note not found' });

      if (title !== undefined) mockNotes[idx].title = title;
      if (content !== undefined) mockNotes[idx].content = content;
      if (tags !== undefined) mockNotes[idx].tags = tags;
      mockNotes[idx].updatedAt = new Date().toISOString();

      return res.json(mockNotes[idx]);
    }

    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { title, content, tags },
      { new: true, runValidators: true }
    );
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update note', error: error.message });
  }
};

// @desc    Delete a note
// @route   DELETE /api/notes/:id
export const deleteNote = async (req, res) => {
  try {
    if (global.isMockDB) {
      const idx = mockNotes.findIndex(n => n._id === req.params.id && n.userId === req.user.id);
      if (idx === -1) return res.status(404).json({ message: 'Note not found' });
      mockNotes.splice(idx, 1);
      return res.json({ message: 'Note deleted successfully' });
    }

    const note = await Note.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete note', error: error.message });
  }
};
