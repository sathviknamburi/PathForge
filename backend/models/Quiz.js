import mongoose from 'mongoose';

/**
 * 🧠 Quiz Model
 * 
 * Each quiz is linked to a roadmap topic. Contains MCQ questions
 * with 4 options, a correct answer index, and an explanation.
 */
const quizSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  roadmapId: {
    type: String,
    required: true
  },
  topicTitle: {
    type: String,
    required: true
  },
  questions: [{
    question: { type: String, required: true },
    options: [String],          // Array of 4 answer choices
    correctAnswer: Number,      // Index of correct option (0-3)
    explanation: String         // Shown after answering
  }]
}, {
  timestamps: true
});

const Quiz = mongoose.model('Quiz', quizSchema);
export default Quiz;
