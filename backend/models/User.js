import mongoose from 'mongoose';

/**
 * 👤 User Model
 * 
 * Stores student registration data. The password is hashed before saving
 * using bcryptjs (handled in the auth controller, not here, to keep the
 * model simple for beginners).
 */
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  college: {
    type: String,
    required: [true, 'College name is required'],
    trim: true
  },
  branch: {
    type: String,
    required: [true, 'Branch is required'],
    enum: ['CSE', 'AI & DS', 'IT', 'ECE', 'EEE', 'Mechanical', 'Civil']
  },
  streak: {
    type: Number,
    default: 0
  },
  lastActiveDate: {
    type: Date,
    default: null
  },
  achievements: [{
    badgeId: String,
    title: String,
    description: String,
    icon: String,
    unlockedAt: { type: Date, default: Date.now }
  }],
  avatar: {
    type: String,
    default: '🎓'
  }
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);
export default User;
