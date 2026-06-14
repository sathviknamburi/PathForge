import { mockProgress } from '../config/mockDb.js';
import Progress from '../models/Progress.js';

/**
 * 📈 Analytics Controller
 * Computes weekly/monthly/topic/quiz performance charts from progress data
 */

// @desc    Get analytics data for current user
// @route   GET /api/analytics
export const getAnalytics = async (req, res) => {
  try {
    let progress;
    if (global.isMockDB) {
      progress = mockProgress.find(p => p.userId === req.user.id);
    } else {
      progress = await Progress.findOne({ userId: req.user.id });
    }

    if (!progress) {
      return res.json({
        weeklyProgress: [],
        monthlyProgress: [],
        topicCompletion: { completed: 0, total: 0 },
        quizPerformance: []
      });
    }

    // ─── Weekly Progress (last 7 days: topics completed per day) ───
    const weeklyProgress = [];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const count = progress.completedTopics.filter(t => {
        const tDate = new Date(t.completedAt).toISOString().split('T')[0];
        return tDate === dateStr;
      }).length;
      weeklyProgress.push({
        day: i === 0 ? 'Today' : dayNames[d.getDay()],
        date: dateStr,
        count
      });
    }

    // ─── Monthly Progress (last 4 weeks) ───
    const monthlyProgress = [];
    for (let w = 3; w >= 0; w--) {
      const weekStart = new Date();
      weekStart.setDate(weekStart.getDate() - (w * 7 + 6));
      const weekEnd = new Date();
      weekEnd.setDate(weekEnd.getDate() - (w * 7));

      const count = progress.completedTopics.filter(t => {
        const tDate = new Date(t.completedAt);
        return tDate >= weekStart && tDate <= weekEnd;
      }).length;

      monthlyProgress.push({
        week: `Week ${4 - w}`,
        count
      });
    }

    // ─── Topic Completion by Roadmap ───
    const topicsByRoadmap = {};
    progress.completedTopics.forEach(t => {
      topicsByRoadmap[t.roadmapId] = (topicsByRoadmap[t.roadmapId] || 0) + 1;
    });

    // ─── Quiz Performance ───
    const quizPerformance = progress.quizScores.map(q => ({
      topic: q.topicTitle,
      score: q.score,
      date: q.takenAt
    }));

    res.json({
      weeklyProgress,
      monthlyProgress,
      topicCompletion: {
        completed: progress.completedTopics.length,
        byRoadmap: topicsByRoadmap
      },
      quizPerformance,
      streakDates: progress.streakDates,
      totalStudyDays: progress.streakDates.length
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch analytics', error: error.message });
  }
};
