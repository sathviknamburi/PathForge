/**
 * 🧪 Mock In-Memory Database
 * 
 * When MongoDB is offline, all controllers use these arrays instead.
 * Pre-loaded with seed data so the app is immediately functional.
 */
import bcryptjs from 'bcryptjs';
import { roadmapData, branchSubjects, quizData, achievementDefinitions, generateId } from '../data/seedData.js';

// Pre-hash a demo password for the mock user
const demoPasswordHash = bcryptjs.hashSync('password123', 10);

// ─── Mock Users ───
export const mockUsers = [
  {
    _id: 'user_demo_001',
    name: 'Sathvik',
    email: 'sathvik@college.edu',
    password: demoPasswordHash,
    college: 'JNTUH',
    branch: 'CSE',
    streak: 5,
    lastActiveDate: new Date().toISOString(),
    achievements: [
      { ...achievementDefinitions[0], unlockedAt: new Date(Date.now() - 2 * 86400000).toISOString() },
    ],
    avatar: '🎓',
    createdAt: new Date(Date.now() - 30 * 86400000).toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// ─── Mock Progress ───
export const mockProgress = [
  {
    _id: 'progress_001',
    userId: 'user_demo_001',
    completedTopics: [
      { roadmapId: 'roadmap_c', topicTitle: 'Introduction to C', completedAt: new Date(Date.now() - 5 * 86400000).toISOString() },
      { roadmapId: 'roadmap_js', topicTitle: 'JS Fundamentals', completedAt: new Date(Date.now() - 3 * 86400000).toISOString() },
      { roadmapId: 'roadmap_react', topicTitle: 'React Basics', completedAt: new Date(Date.now() - 1 * 86400000).toISOString() },
    ],
    quizScores: [
      { quizId: 'quiz_c_basics', topicTitle: 'Introduction to C', score: 80, totalQuestions: 5, correctAnswers: 4, takenAt: new Date(Date.now() - 5 * 86400000).toISOString() },
      { quizId: 'quiz_js_basics', topicTitle: 'JS Fundamentals', score: 100, totalQuestions: 5, correctAnswers: 5, takenAt: new Date(Date.now() - 3 * 86400000).toISOString() },
    ],
    dailyGoals: [
      {
        date: new Date().toISOString().split('T')[0],
        goals: [
          { text: 'Complete React hooks tutorial', completed: false },
          { text: 'Solve 3 DSA problems', completed: false },
          { text: 'Read about JWT authentication', completed: true },
        ]
      }
    ],
    streakDates: Array.from({ length: 5 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d.toISOString().split('T')[0];
    }),
    achievements: [
      { ...achievementDefinitions[0], unlockedAt: new Date(Date.now() - 2 * 86400000).toISOString() },
    ]
  }
];

// ─── Mock Notes ───
export const mockNotes = [
  {
    _id: 'note_001',
    userId: 'user_demo_001',
    title: 'JavaScript Closures Explained',
    content: 'A closure is a function that remembers the variables from its outer scope even after the outer function has finished executing.\n\nExample:\nfunction outer() {\n  let count = 0;\n  return function inner() {\n    count++;\n    return count;\n  }\n}\n\nconst counter = outer();\ncounter(); // 1\ncounter(); // 2',
    tags: ['JavaScript', 'Closures', 'Advanced'],
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 86400000).toISOString()
  },
  {
    _id: 'note_002',
    userId: 'user_demo_001',
    title: 'React useEffect Cheatsheet',
    content: '1. useEffect(() => {}) — Runs after EVERY render\n2. useEffect(() => {}, []) — Runs ONCE after first render\n3. useEffect(() => {}, [dep]) — Runs when dep changes\n4. useEffect(() => { return () => cleanup }, []) — Cleanup on unmount',
    tags: ['React', 'Hooks'],
    createdAt: new Date(Date.now() - 1 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 86400000).toISOString()
  }
];

// ─── Re-export seed data for controllers ───
export const mockRoadmaps = [...roadmapData];
export const mockSubjects = [...branchSubjects];
export const mockQuizzes = [...quizData];
export { achievementDefinitions, generateId };
