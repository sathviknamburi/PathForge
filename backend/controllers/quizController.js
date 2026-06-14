import Quiz from '../models/Quiz.js';
import { mockQuizzes, mockProgress, achievementDefinitions, generateId } from '../config/mockDb.js';

/**
 * 🧠 Quiz Controller
 * Handles: Get quiz by topic, Submit quiz answers
 */

// @desc    Get quiz for a roadmap topic
// @route   GET /api/quizzes/:roadmapId/:topicTitle
export const getQuiz = async (req, res) => {
  try {
    const { roadmapId, topicTitle } = req.params;

    if (global.isMockDB) {
      const quiz = mockQuizzes.find(
        q => q.roadmapId === roadmapId && q.topicTitle === decodeURIComponent(topicTitle)
      );
      if (!quiz) return res.status(404).json({ message: 'Quiz not found for this topic' });

      // Send questions WITH correct answers and explanations for instant feedback
      const sanitized = {
        _id: quiz._id,
        roadmapId: quiz.roadmapId,
        topicTitle: quiz.topicTitle,
        questions: quiz.questions.map(q => ({
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation
        }))
      };
      return res.json(sanitized);
    }

    const quiz = await Quiz.findOne({ roadmapId, topicTitle: decodeURIComponent(topicTitle) });
    if (!quiz) return res.status(404).json({ message: 'Quiz not found for this topic' });

    const sanitized = {
      _id: quiz._id,
      roadmapId: quiz.roadmapId,
      topicTitle: quiz.topicTitle,
      questions: quiz.questions.map(q => ({
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation
      }))
    };
    res.json(sanitized);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch quiz', error: error.message });
  }
};

// @desc    Submit quiz answers and get score
// @route   POST /api/quizzes/:quizId/submit
export const submitQuiz = async (req, res) => {
  const { answers } = req.body; // Array of selected answer indices
  const userId = req.user.id;

  try {
    let quiz;
    if (global.isMockDB) {
      quiz = mockQuizzes.find(q => q._id === req.params.quizId);
    } else {
      quiz = await Quiz.findById(req.params.quizId);
    }

    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({ message: 'Answers array is required' });
    }

    // Grade the quiz
    let correctCount = 0;
    const results = quiz.questions.map((q, idx) => {
      const isCorrect = answers[idx] === q.correctAnswer;
      if (isCorrect) correctCount++;
      return {
        question: q.question,
        yourAnswer: answers[idx],
        correctAnswer: q.correctAnswer,
        isCorrect,
        explanation: q.explanation
      };
    });

    const score = Math.round((correctCount / quiz.questions.length) * 100);

    // Save score to progress
    const scoreEntry = {
      quizId: quiz._id,
      topicTitle: quiz.topicTitle,
      score,
      totalQuestions: quiz.questions.length,
      correctAnswers: correctCount,
      takenAt: new Date().toISOString()
    };

    if (global.isMockDB) {
      const progress = mockProgress.find(p => p.userId === userId);
      if (progress) {
        progress.quizScores.push(scoreEntry);

        // Check for "First Quiz" achievement
        if (progress.quizScores.length === 1) {
          const badge = achievementDefinitions.find(a => a.badgeId === 'first_quiz');
          if (badge && !progress.achievements.find(a => a.badgeId === 'first_quiz')) {
            progress.achievements.push({ ...badge, unlockedAt: new Date().toISOString() });
          }
        }
        // Check for "Quiz Master" (100% score)
        if (score === 100) {
          const badge = achievementDefinitions.find(a => a.badgeId === 'quiz_master');
          if (badge && !progress.achievements.find(a => a.badgeId === 'quiz_master')) {
            progress.achievements.push({ ...badge, unlockedAt: new Date().toISOString() });
          }
        }
      }
    } else {
      const Progress = (await import('../models/Progress.js')).default;
      await Progress.findOneAndUpdate(
        { userId },
        { $push: { quizScores: scoreEntry } },
        { upsert: true }
      );
    }

    // Identify weak areas (questions answered incorrectly)
    const weakAreas = results.filter(r => !r.isCorrect).map(r => r.question);

    res.json({
      score,
      totalQuestions: quiz.questions.length,
      correctAnswers: correctCount,
      accuracy: `${score}%`,
      weakAreas,
      results
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit quiz', error: error.message });
  }
};

// @desc    Get all available quizzes
// @route   GET /api/quizzes
export const getAllQuizzes = async (req, res) => {
  try {
    if (global.isMockDB) {
      const simplified = mockQuizzes.map(q => ({
        _id: q._id,
        roadmapId: q.roadmapId,
        topicTitle: q.topicTitle,
        questionCount: q.questions.length
      }));
      return res.json(simplified);
    }

    const quizzes = await Quiz.find().select('roadmapId topicTitle');
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch quizzes', error: error.message });
  }
};
