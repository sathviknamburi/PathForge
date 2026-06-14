import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import PageTransition from '../components/layout/PageTransition';
import GlassCard from '../components/ui/GlassCard';
import { 
  Calendar, 
  Flame, 
  PlusCircle, 
  CheckCircle2, 
  HelpCircle,
  Clock,
  Sparkles
} from 'lucide-react';

const DailyTrackerPage = () => {
  const { user, refreshUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(null);
  
  // Goals State
  const [dailyGoals, setDailyGoals] = useState([]);
  const [newGoalText, setNewGoalText] = useState('');
  
  const todayStr = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        setLoading(true);
        const data = await api.get('/progress');
        setProgress(data);

        // Load today's goals
        const todaysGoalsRecord = data.dailyGoals?.find(dg => dg.date === todayStr);
        if (todaysGoalsRecord) {
          setDailyGoals(todaysGoalsRecord.goals);
        } else {
          // Defaults
          setDailyGoals([
            { text: 'Study 2 hours', completed: false },
            { text: 'Complete 1 roadmap topic', completed: false },
            { text: 'Score 80%+ on a topic quiz', completed: false }
          ]);
        }
      } catch (err) {
        console.error('Failed to load tracker progress:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, []);

  const saveGoals = async (goalsList) => {
    try {
      const updatedProg = await api.post('/progress/daily-goals', {
        date: todayStr,
        goals: goalsList
      });
      setProgress(updatedProg);
      await refreshUser();
    } catch (err) {
      console.error('Failed to save goals:', err);
    }
  };

  const toggleGoal = (index) => {
    const updated = dailyGoals.map((g, i) => 
      i === index ? { ...g, completed: !g.completed } : g
    );
    setDailyGoals(updated);
    saveGoals(updated);
  };

  const handleAddGoal = (e) => {
    e.preventDefault();
    if (!newGoalText.trim()) return;

    const updated = [...dailyGoals, { text: newGoalText.trim(), completed: false }];
    setDailyGoals(updated);
    saveGoals(updated);
    setNewGoalText('');
  };

  // Generate Calendar Heatmap Days
  const getCalendarDays = () => {
    const days = [];
    const today = new Date();
    // Get last 35 days (5 weeks) to show a nice mini contribution grid
    for (let i = 34; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const isStreakDay = progress?.streakDates?.includes(dateStr);
      
      days.push({
        date: d,
        dateStr,
        active: isStreakDay,
        dayLabel: d.getDate(),
        monthLabel: d.toLocaleString('default', { month: 'short' })
      });
    }
    return days;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
        <div className="w-10 h-10 border-4 border-brand-orange border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const calendarDays = getCalendarDays();
  const streakCount = user?.streak || 0;

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto pb-10 space-y-8">
        
        {/* Header */}
        <div>
          <h2 className="text-3xl font-extrabold flex items-center space-x-3">
            <Calendar className="w-8 h-8 text-brand-orange" />
            <span>Daily Tracker & Streaks</span>
          </h2>
          <p className="text-sm text-dark-textMuted mt-1">
            Build consistency. Log your study activities daily to maintain your learning streak.
          </p>
        </div>

        {/* Top Split Layout: Streak Flame + Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Flame Card */}
          <GlassCard hover={false} className="text-center flex flex-col items-center justify-center py-8 bg-gradient-to-b from-brand-orange/10 via-transparent to-transparent border-brand-orange/20">
            <div className="relative">
              <Flame className="w-20 h-20 text-brand-orange fill-brand-orange/30 animate-float" />
              <div className="absolute inset-0 bg-brand-orange/20 blur-xl rounded-full scale-75 -z-10" />
            </div>
            <h3 className="text-4xl font-black mt-4 text-white">{streakCount} Days</h3>
            <p className="text-xs uppercase tracking-widest font-bold text-brand-orange mt-1">Active Streak</p>
            <p className="text-[10px] text-dark-textMuted mt-3 max-w-[200px]">
              {streakCount > 0 
                ? 'Your learning flame is burning bright! Keep it going.' 
                : 'Log a study task today to ignite your streak!'}
            </p>
          </GlassCard>

          {/* Activity Calendar Heatmap */}
          <GlassCard hover={false} className="md:col-span-2 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-dark-border/40">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-1.5">
                <Sparkles className="w-4 h-4 text-brand-orange" />
                <span>Consistency Calendar (Last 5 Weeks)</span>
              </h4>
              <span className="text-[10px] font-bold text-dark-textMuted bg-dark-bg px-2 py-0.5 rounded border border-dark-border">
                {progress?.streakDates?.length || 0} Total Active Days
              </span>
            </div>

            {/* Heatmap Grid */}
            <div className="grid grid-cols-7 gap-2.5 max-w-sm mx-auto pt-2">
              {calendarDays.map((day, idx) => (
                <div 
                  key={idx}
                  title={`${day.monthLabel} ${day.dayLabel}: ${day.active ? 'Active' : 'No activity logged'}`}
                  className={`
                    aspect-square rounded flex items-center justify-center text-[10px] font-bold border transition-all duration-300
                    ${day.active 
                      ? 'bg-gradient-to-br from-brand-orange to-brand-yellow border-transparent text-white shadow shadow-brand-orange/20 scale-105' 
                      : 'bg-dark-bg/60 border-dark-border/60 text-dark-textMuted'
                    }
                  `}
                >
                  {day.dayLabel}
                </div>
              ))}
            </div>

            {/* Grid Legend */}
            <div className="flex justify-center items-center space-x-4 pt-3 text-[10px] text-dark-textMuted font-bold uppercase tracking-wider">
              <div className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded bg-dark-bg/60 border border-dark-border/60" />
                <span>Inactive</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded bg-brand-orange" />
                <span>Study Logged</span>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Goals Checklist Manager */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Goal checklist */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-xl font-bold flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-brand-orange" />
              <span>Study Goal Checklist</span>
            </h3>

            <GlassCard hover={false} className="space-y-4">
              <div className="space-y-3">
                {dailyGoals.map((goal, idx) => (
                  <div 
                    key={idx}
                    onClick={() => toggleGoal(idx)}
                    className={`
                      p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all duration-150
                      ${goal.completed 
                        ? 'bg-brand-orange/5 border-brand-orange/30 text-white/90' 
                        : 'bg-dark-bg/40 border-dark-border/80 text-dark-text hover:border-dark-border-hover'
                      }
                    `}
                  >
                    <div className="flex items-center space-x-3">
                      {goal.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-brand-orange fill-brand-orange/20 shrink-0" />
                      ) : (
                        <span className="w-5 h-5 rounded-full border border-dark-textMuted shrink-0 flex items-center justify-center text-[10px]" />
                      )}
                      <span className={`text-xs font-semibold ${goal.completed ? 'line-through text-dark-textMuted' : ''}`}>
                        {goal.text}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Custom Goal Form */}
              <form onSubmit={handleAddGoal} className="flex gap-2 pt-2 border-t border-dark-border/40">
                <input 
                  type="text"
                  value={newGoalText}
                  onChange={(e) => setNewGoalText(e.target.value)}
                  placeholder="Create custom task (e.g. Study Operating Systems)..."
                  className="flex-1 px-4 py-2.5 rounded-xl glass-input text-xs"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-brand-orange hover:bg-brand-orange/90 text-xs font-bold text-white flex items-center space-x-1 transition-all duration-150 shrink-0"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span className="hidden sm:inline">Add Task</span>
                </button>
              </form>
            </GlassCard>
          </div>

          {/* Goal Tips */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold flex items-center space-x-2">
              <Clock className="w-5 h-5 text-brand-orange" />
              <span>Syllabus Tip</span>
            </h3>
            
            <GlassCard hover={false} className="space-y-3 bg-gradient-to-br from-brand-orange/10 to-transparent border-brand-orange/20">
              <p className="text-xs font-bold text-white">📅 Pomodoro Study Method</p>
              <p className="text-[11px] text-dark-textMuted leading-relaxed">
                Break study sessions into 25-minute intervals separated by short 5-minute breaks. It keeps your brain sharp and counts towards your daily tracker targets!
              </p>
              <div className="pt-2 border-t border-dark-border/40">
                <p className="text-[10px] text-brand-orange font-extrabold uppercase tracking-wide">💡 Goal Ideas:</p>
                <ul className="list-disc pl-4 text-[10px] text-dark-textMuted mt-1 space-y-1">
                  <li>Solve 5 DSA problems on Leetcode</li>
                  <li>Watch one React Hooks video</li>
                  <li>Draft exam revision notes</li>
                </ul>
              </div>
            </GlassCard>
          </div>
        </div>

      </div>
    </PageTransition>
  );
};

export default DailyTrackerPage;
