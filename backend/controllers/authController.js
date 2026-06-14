import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Progress from '../models/Progress.js';
import { mockUsers, mockProgress, generateId } from '../config/mockDb.js';

/**
 * 🔐 Auth Controller
 * Handles: Register, Login, Get Profile, Update Profile
 */

// Helper: Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
export const register = async (req, res) => {
  const { name, email, password, college, branch } = req.body;

  // Validate required fields
  if (!name || !email || !password || !college || !branch) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    if (global.isMockDB) {
      // Check if email already exists
      if (mockUsers.find(u => u.email === email.toLowerCase())) {
        return res.status(400).json({ message: 'Email already registered' });
      }

      // Hash password
      const hashedPassword = await bcryptjs.hash(password, 10);
      const userId = generateId();

      const newUser = {
        _id: userId,
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        college,
        branch,
        streak: 0,
        lastActiveDate: null,
        achievements: [],
        avatar: '🎓',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      mockUsers.push(newUser);

      // Create empty progress document for new user
      mockProgress.push({
        _id: generateId(),
        userId,
        completedTopics: [],
        quizScores: [],
        dailyGoals: [],
        streakDates: [],
        achievements: []
      });

      const token = generateToken(userId);

      return res.status(201).json({
        token,
        user: { _id: userId, name, email: email.toLowerCase(), college, branch, streak: 0, achievements: [], avatar: '🎓' }
      });
    }

    // MongoDB mode
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      college,
      branch
    });

    // Create progress document
    await Progress.create({ userId: user._id });

    const token = generateToken(user._id);

    res.status(201).json({
      token,
      user: { _id: user._id, name: user.name, email: user.email, college: user.college, branch: user.branch, streak: user.streak, achievements: user.achievements, avatar: user.avatar }
    });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    if (global.isMockDB) {
      const user = mockUsers.find(u => u.email === email.toLowerCase());
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const isMatch = await bcryptjs.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const token = generateToken(user._id);

      return res.json({
        token,
        user: { _id: user._id, name: user.name, email: user.email, college: user.college, branch: user.branch, streak: user.streak, achievements: user.achievements, avatar: user.avatar }
      });
    }

    // MongoDB mode
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user._id);

    res.json({
      token,
      user: { _id: user._id, name: user.name, email: user.email, college: user.college, branch: user.branch, streak: user.streak, achievements: user.achievements, avatar: user.avatar }
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/profile
export const getProfile = async (req, res) => {
  try {
    if (global.isMockDB) {
      const user = mockUsers.find(u => u._id === req.user.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
      const { password, ...userWithoutPassword } = user;
      return res.json(userWithoutPassword);
    }

    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch profile', error: error.message });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
export const updateProfile = async (req, res) => {
  const { name, college, avatar } = req.body;

  try {
    if (global.isMockDB) {
      const idx = mockUsers.findIndex(u => u._id === req.user.id);
      if (idx === -1) return res.status(404).json({ message: 'User not found' });

      if (name) mockUsers[idx].name = name;
      if (college) mockUsers[idx].college = college;
      if (avatar) mockUsers[idx].avatar = avatar;
      mockUsers[idx].updatedAt = new Date().toISOString();

      const { password, ...userWithoutPassword } = mockUsers[idx];
      return res.json(userWithoutPassword);
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, college, avatar },
      { new: true, runValidators: true }
    ).select('-password');

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update profile', error: error.message });
  }
};
