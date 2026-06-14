import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Map, Calendar, Award, FileEdit, ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';

const LandingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const features = [
    {
      icon: Map,
      title: 'Interactive Roadmaps',
      desc: 'Visual learning trees for CSE, IT, AI&DS, and 15+ sub-tracks. Unlock nodes as you learn.',
      color: 'text-brand-green bg-brand-green/10 border-brand-green/20'
    },
    {
      icon: Calendar,
      title: 'Daily tracker & Streaks',
      desc: 'Set daily learning goals, log your study hours, and build your calendar heatmap streak.',
      color: 'text-brand-orange bg-brand-orange/10 border-brand-orange/20'
    },
    {
      icon: Award,
      title: 'Gamified Achievements',
      desc: 'Unlock badges for completing nodes, passing quizzes, writing notes, and maintaining streaks.',
      color: 'text-brand-yellow bg-brand-yellow/10 border-brand-yellow/20'
    },
    {
      icon: FileEdit,
      title: 'Notion-like Study Notes',
      desc: 'Document your learning process right inside the topic. Keep all study notes linked to subjects.',
      color: 'text-brand-pink bg-brand-pink/10 border-brand-pink/20'
    }
  ];

  return (
    <div className="min-h-screen bg-dark-bg text-white overflow-hidden relative selection:bg-brand-blue selection:text-white">
      {/* 🧪 Glowing Background Accents */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-blue/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-brand-purple/10 rounded-full blur-[140px] pointer-events-none" />
      
      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))] pointer-events-none" />

      {/* Header / Navbar */}
      <header className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between relative z-10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-blue to-brand-green flex items-center justify-center font-black text-white text-xl shadow-lg shadow-brand-blue/20">
            P
          </div>
          <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white to-dark-textMuted bg-clip-text text-transparent">
            PathForge
          </span>
        </div>
        <div>
          {user ? (
            <button 
              onClick={() => navigate('/dashboard')}
              className="px-5 py-2.5 rounded-full bg-dark-card border border-dark-border text-sm font-semibold hover:bg-white hover:text-dark-bg transition-all duration-300 shadow-glass-inner"
            >
              Enter Dashboard
            </button>
          ) : (
            <div className="space-x-3">
              <button 
                onClick={() => navigate('/login')}
                className="px-5 py-2.5 text-sm font-semibold hover:text-brand-blue transition-colors"
              >
                Sign In
              </button>
              <button 
                onClick={() => navigate('/register')}
                className="px-5 py-2.5 rounded-full bg-brand-blue text-sm font-bold text-white hover:bg-brand-blue/90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg shadow-brand-blue/20"
              >
                Get Started
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-24 text-center relative z-10 flex flex-col items-center">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-dark-card/85 border border-dark-border/80 text-xs font-semibold text-brand-blue mb-8 shadow-glass-inner"
        >
          <span className="w-2 h-2 rounded-full bg-brand-green animate-ping" />
          <span>The Student Ecosystem for MERN Stack & Branch Syllabus</span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight max-w-4xl leading-[1.08] bg-gradient-to-b from-white to-dark-textMuted bg-clip-text text-transparent"
        >
          Forge Your Learning Path,<br />
          <span className="bg-gradient-to-r from-brand-blue via-brand-purple to-brand-pink bg-clip-text text-transparent">
            Own Your Journey.
          </span>
        </motion.h1>

        {/* Hero Desc */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-dark-textMuted text-lg sm:text-xl max-w-2xl mt-6 font-medium leading-relaxed"
        >
          PathForge combines the gamified learning loop of Duolingo, the visual guides of Roadmap.sh, and the flexibility of Notion to build a beautiful ecosystem for engineering students.
        </motion.p>

        {/* Hero Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-10 w-full sm:w-auto"
        >
          <button
            onClick={() => navigate(user ? '/dashboard' : '/register')}
            className="group px-8 py-4 rounded-full bg-gradient-to-r from-brand-blue to-brand-purple text-base font-bold text-white hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 flex items-center justify-center space-x-2 shadow-xl shadow-brand-blue/15"
          >
            <span>Start Learning Free</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => navigate('/login')}
            className="px-8 py-4 rounded-full bg-dark-card border border-dark-border text-base font-semibold hover:bg-dark-card/80 transition-colors shadow-glass-inner"
          >
            Explore Roadmaps
          </button>
        </motion.div>

        {/* Dashboard Preview mockup image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full max-w-5xl mt-16 p-2 rounded-2xl border border-dark-border/50 bg-dark-card/20 backdrop-blur-md shadow-2xl relative"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent z-10 pointer-events-none rounded-2xl" />
          <div className="rounded-xl border border-dark-border bg-dark-bg/80 aspect-[16/9] overflow-hidden flex flex-col justify-center items-center p-8">
            {/* Visual placeholder representing the app interior */}
            <div className="flex flex-col items-center space-y-4 max-w-md text-center">
              <div className="w-16 h-16 rounded-full bg-brand-blue/10 border border-brand-blue/30 flex items-center justify-center">
                <Map className="w-8 h-8 text-brand-blue animate-pulse" />
              </div>
              <h3 className="text-xl font-bold">Experience Gamified Roadmaps</h3>
              <p className="text-sm text-dark-textMuted">
                Unlock interactive branches, study specific college subject modules, pass quizzes to build a daily streak, and unlock exclusive achievement badges.
              </p>
              <div className="flex space-x-2">
                <span className="px-3 py-1 rounded-full bg-brand-green/10 border border-brand-green/20 text-xs font-bold text-brand-green">15+ Skills Roadmaps</span>
                <span className="px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-xs font-bold text-brand-orange">Streak Heatmaps</span>
                <span className="px-3 py-1 rounded-full bg-brand-yellow/10 border border-brand-yellow/20 text-xs font-bold text-brand-yellow">Quizzes & Analytics</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20 relative z-10 border-t border-dark-border/50">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Built for Student Journeys</h2>
          <p className="text-dark-textMuted mt-4 max-w-xl mx-auto text-sm sm:text-base">
            PathForge provides all the tools you need to master full-stack development and ace your college exams.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 rounded-2xl glass-card relative group flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 border ${feature.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-brand-blue transition-colors duration-200">
                    {feature.title}
                  </h3>
                  <p className="text-dark-textMuted text-sm mt-3 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
                <div className="mt-6 flex items-center text-xs font-bold text-brand-blue opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span>Learn more</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 py-10 border-t border-dark-border/50 relative z-10 flex flex-col sm:flex-row items-center justify-between text-xs text-dark-textMuted">
        <p>© 2026 PathForge. Forge your path to excellence.</p>
        <div className="flex space-x-6 mt-4 sm:mt-0">
          <a href="#" className="hover:text-white transition-colors">Documentation</a>
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">GitHub Repository</a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
