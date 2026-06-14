import mongoose from 'mongoose';

/**
 * 🗺️ Roadmap Model
 * 
 * Each roadmap contains multiple levels, and each level has topics.
 * Topics can have subtopics and resource links.
 * The "state" field tracks whether a topic is locked, unlocked, or completed.
 */
const roadmapSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Programming', 'Web Development', 'Career Paths']
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: '📘'
  },
  levels: [{
    title: String,
    order: Number,
    topics: [{
      title: String,
      subtopics: [String],
      estimatedTime: String,   // e.g. "2 hours"
      state: {
        type: String,
        enum: ['locked', 'unlocked', 'completed'],
        default: 'locked'
      },
      resources: {
        youtube: [String],
        docs: [String],
        practice: [String]
      }
    }]
  }]
}, {
  timestamps: true
});

const Roadmap = mongoose.model('Roadmap', roadmapSchema);
export default Roadmap;
