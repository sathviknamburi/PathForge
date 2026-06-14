import mongoose from 'mongoose';

/**
 * 📚 Subject Model
 * 
 * Branch-specific subjects. Each branch (CSE, AI&DS, etc.) has its own
 * set of academic subjects with topics to cover.
 */
const subjectSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  branch: {
    type: String,
    required: true,
    enum: ['CSE', 'AI & DS', 'IT', 'ECE', 'EEE', 'Mechanical', 'Civil']
  },
  subjects: [{
    title: String,
    description: String,
    icon: String,
    topics: [String]
  }]
}, {
  timestamps: true
});

const Subject = mongoose.model('Subject', subjectSchema);
export default Subject;
