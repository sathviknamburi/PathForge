import Progress from '../models/Progress.js';
import { mockProgress, mockUsers, achievementDefinitions, generateId } from '../config/mockDb.js';

/**
 * 📊 Progress Controller
 * Handles: Get progress, Complete topics, Daily goals, Streak tracking
 */

// @desc    Get user progress
// @route   GET /api/progress
export const getProgress = async (req, res) => {
  try {
    if (global.isMockDB) {
      let progress = mockProgress.find(p => p.userId === req.user.id);
      if (!progress) {
        progress = {
          _id: generateId(), userId: req.user.id,
          completedTopics: [], quizScores: [], dailyGoals: [],
          streakDates: [], achievements: []
        };
        mockProgress.push(progress);
      }
      return res.json(progress);
    }

    let progress = await Progress.findOne({ userId: req.user.id });
    if (!progress) {
      progress = await Progress.create({ userId: req.user.id });
    }
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch progress', error: error.message });
  }
};

// @desc    Mark a topic as completed
// @route   POST /api/progress/complete-topic
export const completeTopic = async (req, res) => {
  const { roadmapId, topicTitle } = req.body;

  if (!roadmapId || !topicTitle) {
    return res.status(400).json({ message: 'roadmapId and topicTitle are required' });
  }

  try {
    if (global.isMockDB) {
      const progress = mockProgress.find(p => p.userId === req.user.id);
      if (!progress) return res.status(404).json({ message: 'Progress not found' });

      // Avoid duplicate completions
      const alreadyCompleted = progress.completedTopics.find(
        t => t.roadmapId === roadmapId && t.topicTitle === topicTitle
      );
      if (alreadyCompleted) return res.status(400).json({ message: 'Topic already completed' });

      progress.completedTopics.push({ roadmapId, topicTitle, completedAt: new Date().toISOString() });

      // Check topic count achievements
      const totalCompleted = progress.completedTopics.length;
      const checkBadges = [
        { count: 10, id: 'topics_10' },
        { count: 50, id: 'topics_50' },
        { count: 100, id: 'topics_100' },
      ];
      for (const check of checkBadges) {
        if (totalCompleted >= check.count && !progress.achievements.find(a => a.badgeId === check.id)) {
          const badge = achievementDefinitions.find(a => a.badgeId === check.id);
          if (badge) progress.achievements.push({ ...badge, unlockedAt: new Date().toISOString() });
        }
      }

      return res.json(progress);
    }

    const progress = await Progress.findOneAndUpdate(
      { userId: req.user.id },
      { $push: { completedTopics: { roadmapId, topicTitle, completedAt: new Date() } } },
      { new: true, upsert: true }
    );
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: 'Failed to complete topic', error: error.message });
  }
};

// @desc    Add/Update daily goals
// @route   POST /api/progress/daily-goals
export const updateDailyGoals = async (req, res) => {
  const { date, goals } = req.body; // date: "2024-06-14", goals: [{text, completed}]

  if (!date || !goals) {
    return res.status(400).json({ message: 'Date and goals are required' });
  }

  try {
    if (global.isMockDB) {
      const progress = mockProgress.find(p => p.userId === req.user.id);
      if (!progress) return res.status(404).json({ message: 'Progress not found' });

      const existingIdx = progress.dailyGoals.findIndex(d => d.date === date);
      if (existingIdx !== -1) {
        progress.dailyGoals[existingIdx].goals = goals;
      } else {
        progress.dailyGoals.push({ date, goals });
      }

      // Update streak
      if (!progress.streakDates.includes(date)) {
        progress.streakDates.push(date);
        progress.streakDates.sort();
      }

      // Calculate current streak
      let streak = 0;
      const today = new Date().toISOString().split('T')[0];
      let checkDate = new Date(today);
      while (true) {
        const dateStr = checkDate.toISOString().split('T')[0];
        if (progress.streakDates.includes(dateStr)) {
          streak++;
          checkDate.setDate(checkDate.getDate() - 1);
        } else {
          break;
        }
      }

      // Update user streak
      const user = mockUsers.find(u => u._id === req.user.id);
      if (user) {
        user.streak = streak;
        user.lastActiveDate = new Date().toISOString();
      }

      // Check streak achievements
      if (streak >= 7 && !progress.achievements.find(a => a.badgeId === 'streak_7')) {
        const badge = achievementDefinitions.find(a => a.badgeId === 'streak_7');
        if (badge) progress.achievements.push({ ...badge, unlockedAt: new Date().toISOString() });
      }
      if (streak >= 30 && !progress.achievements.find(a => a.badgeId === 'streak_30')) {
        const badge = achievementDefinitions.find(a => a.badgeId === 'streak_30');
        if (badge) progress.achievements.push({ ...badge, unlockedAt: new Date().toISOString() });
      }

      return res.json(progress);
    }

    // MongoDB mode
    const progress = await Progress.findOne({ userId: req.user.id });
    if (!progress) return res.status(404).json({ message: 'Progress not found' });

    const existingIdx = progress.dailyGoals.findIndex(d => d.date === date);
    if (existingIdx !== -1) {
      progress.dailyGoals[existingIdx].goals = goals;
    } else {
      progress.dailyGoals.push({ date, goals });
    }

    if (!progress.streakDates.includes(date)) {
      progress.streakDates.push(date);
    }

    await progress.save();
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update daily goals', error: error.message });
  }
};

// @desc    Get achievements
// @route   GET /api/progress/achievements
export const getAchievements = async (req, res) => {
  try {
    if (global.isMockDB) {
      const progress = mockProgress.find(p => p.userId === req.user.id);
      const unlocked = progress ? progress.achievements : [];
      return res.json({
        all: achievementDefinitions,
        unlocked
      });
    }

    const progress = await Progress.findOne({ userId: req.user.id });
    res.json({
      all: achievementDefinitions,
      unlocked: progress ? progress.achievements : []
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch achievements', error: error.message });
  }
};
