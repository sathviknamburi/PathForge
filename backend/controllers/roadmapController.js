import Roadmap from '../models/Roadmap.js';
import { mockRoadmaps } from '../config/mockDb.js';

/**
 * 🗺️ Roadmap Controller
 * Handles: Get all roadmaps, Get single roadmap, Get by category
 */

// @desc    Get all roadmaps
// @route   GET /api/roadmaps
export const getRoadmaps = async (req, res) => {
  try {
    if (global.isMockDB) {
      // Return simplified view (without full topic details)
      const simplified = mockRoadmaps.map(r => ({
        _id: r._id,
        title: r.title,
        category: r.category,
        description: r.description,
        icon: r.icon,
        totalTopics: r.levels.reduce((sum, l) => sum + l.topics.length, 0),
        totalLevels: r.levels.length
      }));
      return res.json(simplified);
    }

    const roadmaps = await Roadmap.find();
    res.json(roadmaps);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch roadmaps', error: error.message });
  }
};

// @desc    Get single roadmap by ID
// @route   GET /api/roadmaps/:id
export const getRoadmapById = async (req, res) => {
  try {
    if (global.isMockDB) {
      const roadmap = mockRoadmaps.find(r => r._id === req.params.id);
      if (!roadmap) return res.status(404).json({ message: 'Roadmap not found' });
      return res.json(roadmap);
    }

    const roadmap = await Roadmap.findById(req.params.id);
    if (!roadmap) return res.status(404).json({ message: 'Roadmap not found' });
    res.json(roadmap);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch roadmap', error: error.message });
  }
};

// @desc    Get roadmaps by category
// @route   GET /api/roadmaps/category/:category
export const getRoadmapsByCategory = async (req, res) => {
  try {
    if (global.isMockDB) {
      const filtered = mockRoadmaps.filter(r => r.category === req.params.category);
      return res.json(filtered);
    }

    const roadmaps = await Roadmap.find({ category: req.params.category });
    res.json(roadmaps);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch roadmaps', error: error.message });
  }
};
