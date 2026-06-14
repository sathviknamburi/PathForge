import mongoose from 'mongoose';

/**
 * 📝 Note Model
 * 
 * Personal notes created by students. Each note belongs to a user (userId).
 * Supports tags for organization.
 */
const noteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Note title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  content: {
    type: String,
    default: ''
  },
  tags: [{
    type: String,
    trim: true
  }]
}, {
  timestamps: true  // Adds createdAt and updatedAt automatically
});

const Note = mongoose.model('Note', noteSchema);
export default Note;
