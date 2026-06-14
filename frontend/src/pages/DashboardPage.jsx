import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import PageTransition from '../components/layout/PageTransition';
import GlassCard from '../components/ui/GlassCard';
import ProgressRing from '../components/ui/ProgressRing';
import { 
  Flame, 
  BookOpen, 
  CheckCircle2, 
  Circle, 
  Map, 
  PlusCircle, 
  ChevronRight,
  TrendingUp,
  BrainCircuit,
  Award
} from 'lucide-react';

const DashboardPage = () => {
  const { user, refreshUser } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [roadmaps, setRoadmaps] = useState([]);
  const [dailyGoals, setDailyGoals] = useState([]);
  
  const todayStr = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // 1. Fetch user progress
        const progData = await api.get('/progress');
        setProgress(progData);

        // Set daily goals for today
        const todaysGoalsRecord = progData.dailyGoals?.find(dg => dg.date === todayStr);
        if (todaysGoalsRecord) {
          setDailyGoals(todaysGoalsRecord.goals);
        } else {
          // Default daily goals
          const defaults = [
            { text: 'Study 2 hours', completed: false },
            { text: 'Complete 1 roadmap topic', completed: false },
            { text: 'Score 80%+ on a topic quiz', completed: false }
          ];
          setDailyGoals(defaults);
        }

        // 2. Fetch branch subjects
        if (user && user.branch) {
          const subjData = await api.get(`/subjects/${encodeURIComponent(user.branch)}`);
          setSubjects(subjData.subjects || []);
        }

        // 3. Fetch all roadmaps to show recommended
        const rData = await api.get('/roadmaps');
        setRoadmaps(rData);

      } catch (err) {
        console.error('Error loading dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  const toggleGoal = async (index) => {
    const updatedGoals = dailyGoals.map((g, i) => 
      i === index ? { ...g, completed: !g.completed } : g
    );
    setDailyGoals(updatedGoals);

    try {
      // Save to backend
      await api.post('/progress/daily-goals', {
        date: todayStr,
        goals: updatedGoals
      });
      // Refresh user details (to update streak if first goal logged today)
      await refreshUser();
    } catch (err) {
      console.error('Failed to update goal on server:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
        <div className="w-10 h-10 border-4 border-brand-blue border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Calculate stats
  const completedTopicsCount = progress?.completedTopics?.length || 0;
  const completedQuizzesCount = progress?.quizScores?.length || 0;
  const averageQuizScore = completedQuizzesCount > 0 
    ? Math.round(progress.quizScores.reduce((acc, q) => acc + q.score, 0) / completedQuizzesCount)
    : 0;

  // Calculate overall progress percentage: mock target of 50 topics
  const overallPercentage = Math.min(100, Math.round((completedTopicsCount / 30) * 100));

  return (
    <PageTransition>
      <div className="space-y-8 max-w-6xl mx-auto pb-10">
        
        {/* 1. Greeting Card Section */}
        <GlassCard hover={false} className="relative overflow-hidden bg-gradient-to-r from-brand-blue/15 via-brand-purple/10 to-transparent">
          {/* Sparkles decoration */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-brand-blue/10 to-transparent rounded-bl-full pointer-events-none" />
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative z-10">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight">
                Welcome back, {user?.name}! 👋
              </h2>
              <p className="text-dark-textMuted text-sm mt-1 max-w-lg">
                Ready to level up today? Let's check off your daily goals and work on your learning path.
              </p>
            </div>
            {user?.streak > 0 ? (
              <div className="flex items-center space-x-3 mt-4 md:mt-0 p-3 bg-brand-orange/10 border border-brand-orange/30 rounded-2xl animate-float">
                <Flame className="w-8 h-8 text-brand-orange fill-brand-orange animate-pulse" />
                <div>
                  <p className="text-lg font-black text-brand-orange leading-none">{user.streak} Days</p>
                  <p className="text-[10px] text-brand-orange/80 uppercase font-bold tracking-wider">Current Streak</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3 mt-4 md:mt-0 p-3 bg-dark-card border border-dark-border rounded-2xl">
                <Flame className="w-8 h-8 text-dark-textMuted" />
                <div>
                  <p className="text-sm font-bold text-white leading-none">Start streak today!</p>
                  <p className="text-[9px] text-dark-textMuted uppercase font-bold tracking-wider mt-0.5">Check off a daily goal</p>
                </div>
              </div>
            )}
          </div>
        </GlassCard>

        {/* 2. Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <GlassCard hover={false} className="flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-dark-textMuted uppercase tracking-wider">Overall Learning</span>
              <p className="text-2xl font-black mt-1">{completedTopicsCount} Topics</p>
              <span className="text-[10px] text-brand-green font-bold flex items-center space-x-0.5 mt-1">
                <TrendingUp className="w-3 h-3" />
                <span>Steady progress</span>
              </span>
            </div>
            <ProgressRing percentage={overallPercentage} size={65} strokeWidth={6} color="stroke-brand-green" />
          </GlassCard>

          <GlassCard hover={false} className="flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-dark-textMuted uppercase tracking-wider">Quizzes Passed</span>
              <p className="text-2xl font-black mt-1">{completedQuizzesCount} Quizzes</p>
              <span className="text-[10px] text-brand-blue font-bold flex items-center space-x-0.5 mt-1">
                <BrainCircuit className="w-3 h-3" />
                <span>Avg: {averageQuizScore}% score</span>
              </span>
            </div>
            <div className="w-12 h-12 bg-brand-blue/10 border border-brand-blue/20 rounded-xl flex items-center justify-center">
              <BrainCircuit className="w-6 h-6 text-brand-blue" />
            </div>
          </GlassCard>

          <GlassCard hover={false} className="flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-dark-textMuted uppercase tracking-wider">Streaks Logged</span>
              <p className="text-2xl font-black mt-1">{progress?.streakDates?.length || 0} Days</p>
              <span className="text-[10px] text-brand-orange font-bold flex items-center space-x-0.5 mt-1">
                <Flame className="w-3 h-3" />
                <span>Keep it burning!</span>
              </span>
            </div>
            <div className="w-12 h-12 bg-brand-orange/10 border border-brand-orange/20 rounded-xl flex items-center justify-center">
              <Flame className="w-6 h-6 text-brand-orange" />
            </div>
          </GlassCard>

          <GlassCard hover={false} className="flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-dark-textMuted uppercase tracking-wider">Achievements</span>
              <p className="text-2xl font-black mt-1">{progress?.achievements?.length || 0} Badges</p>
              <span className="text-[10px] text-brand-yellow font-bold flex items-center space-x-0.5 mt-1">
                <Award className="w-3 h-3" />
                <span>Unlock more gallery badges</span>
              </span>
            </div>
            <div className="w-12 h-12 bg-brand-yellow/10 border border-brand-yellow/20 rounded-xl flex items-center justify-center">
              <Award className="w-6 h-6 text-brand-yellow" />
            </div>
          </GlassCard>
        </div>

        {/* 3. Main Dashboard Contents */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Column 1 & 2: Syllabus & Recommended Roadmaps */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Branch Syllabus Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-extrabold flex items-center space-x-2">
                  <BookOpen className="w-5 h-5 text-brand-purple" />
                  <span>Syllabus for {user?.branch}</span>
                </h3>
                <span className="text-xs font-bold text-brand-purple bg-brand-purple/10 px-2.5 py-1 rounded-full border border-brand-purple/20">
                  Academic Term
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subjects.map((sub, i) => (
                  <GlassCard 
                    key={i} 
                    className="flex flex-col justify-between"
                    onClick={() => navigate('/roadmaps')}
                  >
                    <div>
                      <h4 className="font-bold text-base text-white hover:text-brand-purple transition-colors duration-150 flex items-center justify-between">
                        <span>{sub.title}</span>
                        <ChevronRight className="w-4 h-4 text-dark-textMuted" />
                      </h4>
                      <p className="text-xs text-dark-textMuted mt-2 leading-relaxed line-clamp-2">
                        {sub.description}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-dark-border/40 flex justify-between items-center">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-brand-purple">
                        {sub.topics?.length || 0} Modules
                      </span>
                      <span className="text-[10px] font-bold text-dark-textMuted bg-dark-bg px-2 py-0.5 rounded-full border border-dark-border">
                        Year Core
                      </span>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>

            {/* Recommended Roadmaps */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-extrabold flex items-center space-x-2">
                  <Map className="w-5 h-5 text-brand-green" />
                  <span>Forge Your Skills</span>
                </h3>
                <button 
                  onClick={() => navigate('/roadmaps')}
                  className="text-xs font-bold text-brand-green hover:underline flex items-center space-x-0.5"
                >
                  <span>View All Roadmaps</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-3">
                {roadmaps.slice(0, 3).map((rm) => (
                  <div 
                    key={rm._id}
                    onClick={() => navigate(`/roadmaps/${rm._id}`)}
                    className="p-4 rounded-2xl glass-card flex items-center justify-between cursor-pointer border border-white/5 hover:border-brand-green/20"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-xl bg-brand-green/10 border border-brand-green/20 flex items-center justify-center font-bold text-brand-green">
                        {rm.icon || '🛠️'}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-white">{rm.title}</h4>
                        <span className="text-[10px] uppercase tracking-wider text-dark-textMuted font-bold">{rm.category}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-xs text-dark-textMuted hidden sm:inline">{rm.levels?.length || 0} Learning Levels</span>
                      <ChevronRight className="w-5 h-5 text-dark-textMuted" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Column 3: Daily Tracker Goals */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-xl font-extrabold flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-brand-orange" />
                <span>Today's Daily Goals</span>
              </h3>
              
              <GlassCard hover={false} className="space-y-4">
                <div className="pb-3 border-b border-dark-border/60">
                  <p className="text-xs text-dark-textMuted font-semibold">
                    Complete these goals daily to build your activity streak.
                  </p>
                </div>
                
                <div className="space-y-3.5">
                  {dailyGoals.map((goal, i) => (
                    <div 
                      key={i}
                      onClick={() => toggleGoal(i)}
                      className={`
                        p-3 rounded-xl border flex items-center space-x-3 cursor-pointer transition-all duration-200
                        ${goal.completed 
                          ? 'bg-brand-orange/5 border-brand-orange/30 text-white/90' 
                          : 'bg-dark-bg/50 border-dark-border/80 text-dark-text hover:border-dark-border-hover'
                        }
                      `}
                    >
                      {goal.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-brand-orange fill-brand-orange/20 shrink-0" />
                      ) : (
                        <Circle className="w-5 h-5 text-dark-textMuted shrink-0" />
                      )}
                      <span className={`text-xs font-semibold ${goal.completed ? 'line-through text-dark-textMuted' : ''}`}>
                        {goal.text}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 text-center">
                  <button 
                    onClick={() => navigate('/tracker')}
                    className="text-xs font-bold text-brand-orange hover:underline"
                  >
                    View Streaks Calendar
                  </button>
                </div>
              </GlassCard>
            </div>

            {/* Notion Notes Quick Link Card */}
            <GlassCard 
              className="bg-gradient-to-br from-brand-pink/15 to-transparent border-brand-pink/20 relative"
              onClick={() => navigate('/notes')}
            >
              <h4 className="text-lg font-bold text-white flex items-center space-x-2">
                <span className="text-brand-pink">📝</span>
                <span>Notion-style Notes</span>
              </h4>
              <p className="text-xs text-dark-textMuted mt-2 leading-relaxed">
                Need to jot down thoughts, draft code snippets, or summarize study topics? Use our built-in Notion-like editor to organize your ideas!
              </p>
              <div className="mt-4 flex items-center text-xs font-bold text-brand-pink">
                <span>Open Notes Board</span>
                <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
              </div>
            </GlassCard>
          </div>

        </div>

      </div>
    </PageTransition>
  );
};

export default DashboardPage;
