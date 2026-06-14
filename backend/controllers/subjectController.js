import Subject from '../models/Subject.js';
import { mockSubjects } from '../config/mockDb.js';

/**
 * 📚 Subject Controller
 * Returns branch-specific subjects based on user's branch
 */

// @desc    Get subjects for a specific branch
// @route   GET /api/subjects/:branch
export const getSubjectsByBranch = async (req, res) => {
  try {
    const branch = req.params.branch;

    if (global.isMockDB) {
      const branchData = mockSubjects.find(s => s.branch === branch);
      if (!branchData) return res.status(404).json({ message: `No subjects found for branch: ${branch}` });
      return res.json(branchData);
    }

    const subjects = await Subject.findOne({ branch });
    if (!subjects) return res.status(404).json({ message: `No subjects found for branch: ${branch}` });
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch subjects', error: error.message });
  }
};

// @desc    Get all branches and their subjects
// @route   GET /api/subjects
export const getAllSubjects = async (req, res) => {
  try {
    if (global.isMockDB) {
      return res.json(mockSubjects);
    }

    const subjects = await Subject.find();
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch subjects', error: error.message });
  }
};
