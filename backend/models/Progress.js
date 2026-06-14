import mongoose from 'mongoose';

/**
 * 📊 Progress Model
 * 
 * Tracks everything about a student's learning journey:
 * - Which topics they've completed
 * - Quiz scores
 * - Daily goals and completion
 * - Streak dates for calendar heatmap
 * - Unlocked achievements
 */
const progressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true  // One progress document per user
  },
  completedTopics: [{
    roadmapId: String,
    topicTitle: String,
    completedAt: { type: Date, default: Date.now }
  }],
  quizScores: [{
    quizId: String,
    topicTitle: String,
    score: Number,        // Percentage score (0-100)
    totalQuestions: Number,
    correctAnswers: Number,
    takenAt: { type: Date, default: Date.now }
  }],
  dailyGoals: [{
    date: { type: String, required: true },   // "2024-06-14"
    goals: [{
      text: String,
      completed: { type: Boolean, default: false }
    }]
  }],
  streakDates: [String],   // Array of date strings: ["2024-06-12", "2024-06-13", "2024-06-14"]
  achievements: [{
    badgeId: String,
    title: String,
    description: String,
    icon: String,
    unlockedAt: { type: Date, default: Date.now }
  }]
}, {
  timestamps: true
});

const Progress = mongoose.model('Progress', progressSchema);
export default Progress;
