import dns from 'dns';
import mongoose from 'mongoose';

/**
 * 🔌 Database Connection
 * 
 * Attempts to connect to MongoDB. If it fails (e.g., MongoDB isn't installed),
 * the app gracefully falls back to an in-memory mock database so you can
 * still use PathForge while learning.
 */
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/pathforge';

    const dnsServers = process.env.DNS_SERVERS?.split(',').map(s => s.trim()).filter(Boolean);
    if (dnsServers?.length) {
      dns.setServers(dnsServers);
      console.log(`\x1b[36m[MongoDB] Using DNS servers: ${dnsServers.join(', ')}\x1b[0m`);
    } else if (mongoURI.startsWith('mongodb+srv://')) {
      dns.setServers(['8.8.8.8', '8.8.4.4']);
      console.log('\x1b[36m[MongoDB] Using fallback DNS servers: 8.8.8.8, 8.8.4.4\x1b[0m');
    }

    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 3000, // Don't wait forever if MongoDB is offline
    });

    console.log(`\x1b[32m✅ [MongoDB] Connected: ${conn.connection.host}\x1b[0m`);
    global.isMockDB = false;

    // Auto-seed database with roadmaps, branch subjects, and quizzes if they are empty
    try {
      const { default: Roadmap } = await import('../models/Roadmap.js');
      const { default: Subject } = await import('../models/Subject.js');
      const { default: Quiz } = await import('../models/Quiz.js');
      const { roadmapData, branchSubjects, quizData } = await import('../data/seedData.js');

      const roadmapCount = await Roadmap.countDocuments();
      if (roadmapCount === 0) {
        console.log('\x1b[36m[MongoDB] Seeding default roadmaps...\x1b[0m');
        await Roadmap.insertMany(roadmapData);
        console.log('\x1b[32m[MongoDB] Roadmaps seeded successfully!\x1b[0m');
      }

      const subjectCount = await Subject.countDocuments();
      if (subjectCount === 0) {
        console.log('\x1b[36m[MongoDB] Seeding default branch subjects...\x1b[0m');
        await Subject.insertMany(branchSubjects);
        console.log('\x1b[32m[MongoDB] Branch subjects seeded successfully!\x1b[0m');
      }

      const quizCount = await Quiz.countDocuments();
      if (quizCount === 0) {
        console.log('\x1b[36m[MongoDB] Seeding default quizzes...\x1b[0m');
        await Quiz.insertMany(quizData);
        console.log('\x1b[32m[MongoDB] Quizzes seeded successfully!\x1b[0m');
      }
    } catch (seedError) {
      console.error('\x1b[31m[MongoDB] Failed to seed database:\x1b[0m', seedError.message || seedError);
    }
  } catch (error) {
    console.error('\x1b[31m[MongoDB] Connection error:\x1b[0m', error.message || error);
    console.warn('\x1b[33m%s\x1b[0m', '╔══════════════════════════════════════════════════════╗');
    console.warn('\x1b[33m%s\x1b[0m', '║  ⚠️  MongoDB is OFFLINE — Using Mock Database Mode   ║');
    console.warn('\x1b[33m%s\x1b[0m', '║  Everything works, but data resets on server restart  ║');
    console.warn('\x1b[33m%s\x1b[0m', '║  To persist data: set MONGO_URI in backend/.env       ║');
    console.warn('\x1b[33m%s\x1b[0m', '╚══════════════════════════════════════════════════════╝');
    global.isMockDB = true;
  }
};

export default connectDB;
