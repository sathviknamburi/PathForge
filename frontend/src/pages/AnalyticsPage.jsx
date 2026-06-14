import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import PageTransition from '../components/layout/PageTransition';
import GlassCard from '../components/ui/GlassCard';
import { BarChart3, TrendingUp, Award, Calendar } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const AnalyticsPage = () => {
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const data = await api.get('/analytics');
        setAnalytics(data);
      } catch (err) {
        console.error('Failed to fetch analytics:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
        <div className="w-10 h-10 border-4 border-brand-purple border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Fallback defaults if no data exists
  const weekly = analytics?.weeklyProgress || [];
  const monthly = analytics?.monthlyProgress || [];
  const quizScores = analytics?.quizPerformance || [];
  const topicMap = analytics?.topicCompletion?.byRoadmap || {};

  // 1. Weekly Chart Data
  const weeklyChartData = {
    labels: weekly.map(w => w.day),
    datasets: [
      {
        label: 'Topics Completed',
        data: weekly.map(w => w.count),
        backgroundColor: 'rgba(28, 176, 246, 0.6)', // brand-blue
        borderColor: '#1cb0f6',
        borderWidth: 2,
        borderRadius: 8,
      }
    ]
  };

  // 2. Monthly Line Chart Data
  const monthlyChartData = {
    labels: monthly.map(m => m.week),
    datasets: [
      {
        label: 'Topics Completed',
        data: monthly.map(m => m.count),
        fill: true,
        backgroundColor: 'rgba(168, 85, 247, 0.15)', // brand-purple light
        borderColor: '#a855f7',
        borderWidth: 3,
        tension: 0.35,
        pointBackgroundColor: '#a855f7',
      }
    ]
  };

  // 3. Category Doughnut Chart Data
  const roadmapsKeys = Object.keys(topicMap);
  const roadmapsLabels = roadmapsKeys.map(k => k.toUpperCase().replace('-', ' '));
  const roadmapsValues = roadmapsKeys.map(k => topicMap[k]);

  const doughnutChartData = {
    labels: roadmapsLabels.length > 0 ? roadmapsLabels : ['No Topics Completed'],
    datasets: [
      {
        data: roadmapsValues.length > 0 ? roadmapsValues : [1],
        backgroundColor: [
          '#58cc02', // green
          '#1cb0f6', // blue
          '#ff9600', // orange
          '#a855f7', // purple
          '#ec4899', // pink
          '#facc15'  // yellow
        ],
        borderWidth: 1,
        borderColor: '#1e293b',
      }
    ]
  };

  // Chart Global Options (Dark Mode styling)
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#f8fafc', // white-ish
          font: { family: 'Outfit, sans-serif', size: 11 }
        }
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#94a3b8', font: { family: 'Outfit, sans-serif' } }
      },
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { 
          color: '#94a3b8', 
          font: { family: 'Outfit, sans-serif' },
          stepSize: 1
        }
      }
    }
  };

  // Calculate some insights
  const totalCompleted = analytics?.topicCompletion?.completed || 0;
  const totalQuizzes = quizScores.length;
  const averageQuizScore = totalQuizzes > 0 
    ? Math.round(quizScores.reduce((acc, q) => acc + q.score, 0) / totalQuizzes)
    : 0;

  return (
    <PageTransition>
      <div className="max-w-6xl mx-auto pb-10 space-y-8">
        
        {/* Header */}
        <div>
          <h2 className="text-3xl font-extrabold flex items-center space-x-3">
            <BarChart3 className="w-8 h-8 text-brand-purple" />
            <span>Learning Analytics</span>
          </h2>
          <p className="text-sm text-dark-textMuted mt-1">
            Track your performance, topic completion rate, and average quiz scores over time.
          </p>
        </div>

        {/* Insight Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard hover={false} className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-brand-green/10 flex items-center justify-center border border-brand-green/20">
              <TrendingUp className="w-6 h-6 text-brand-green" />
            </div>
            <div>
              <p className="text-2xl font-black">{totalCompleted}</p>
              <p className="text-[10px] uppercase font-bold tracking-wider text-dark-textMuted">Topics Finished</p>
            </div>
          </GlassCard>

          <GlassCard hover={false} className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center border border-brand-blue/20">
              <Award className="w-6 h-6 text-brand-blue" />
            </div>
            <div>
              <p className="text-2xl font-black">{averageQuizScore}%</p>
              <p className="text-[10px] uppercase font-bold tracking-wider text-dark-textMuted">Average Quiz Score</p>
            </div>
          </GlassCard>

          <GlassCard hover={false} className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-brand-orange/10 flex items-center justify-center border border-brand-orange/20">
              <Calendar className="w-6 h-6 text-brand-orange" />
            </div>
            <div>
              <p className="text-2xl font-black">{analytics?.totalStudyDays || 0} Days</p>
              <p className="text-[10px] uppercase font-bold tracking-wider text-dark-textMuted">Active Learning Days</p>
            </div>
          </GlassCard>
        </div>

        {/* Chart Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Weekly Progress Bar Chart */}
          <GlassCard hover={false} className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Weekly Learning Velocity</h3>
            <div className="h-64 relative">
              <Bar data={weeklyChartData} options={chartOptions} />
            </div>
          </GlassCard>

          {/* Monthly Progress Line Chart */}
          <GlassCard hover={false} className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Monthly Progress Trend</h3>
            <div className="h-64 relative">
              <Line data={monthlyChartData} options={chartOptions} />
            </div>
          </GlassCard>

          {/* Category topic distribution doughnut chart */}
          <GlassCard hover={false} className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Distribution By Skill Path</h3>
            <div className="h-64 relative flex justify-center">
              {roadmapsKeys.length > 0 ? (
                <Doughnut 
                  data={doughnutChartData} 
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'right',
                        labels: {
                          color: '#f8fafc',
                          font: { family: 'Outfit, sans-serif', size: 10 }
                        }
                      }
                    }
                  }} 
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-dark-textMuted text-xs">
                  <span>No completed roadmaps yet.</span>
                  <span className="text-[10px] mt-1 text-center max-w-[200px]">Unlock roadmap topics and complete them to view data.</span>
                </div>
              )}
            </div>
          </GlassCard>

          {/* Quiz Scores List */}
          <GlassCard hover={false} className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Recent Quiz Performances</h3>
            {quizScores.length === 0 ? (
              <div className="h-64 flex flex-col items-center justify-center text-dark-textMuted text-xs">
                <span>No quiz history found.</span>
                <span className="text-[10px] mt-1 text-center max-w-[200px]">Take topic quizzes inside the roadmaps drawer.</span>
              </div>
            ) : (
              <div className="h-64 overflow-y-auto space-y-2.5 pr-1">
                {quizScores.map((q, idx) => (
                  <div key={idx} className="p-3 bg-dark-bg/50 border border-dark-border/60 rounded-xl flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-white leading-none">{q.topic}</p>
                      <p className="text-[9px] text-dark-textMuted mt-1">Taken: {new Date(q.date).toLocaleDateString()}</p>
                    </div>
                    <span className={`text-sm font-black ${q.score >= 80 ? 'text-brand-green' : q.score >= 60 ? 'text-brand-blue' : 'text-red-400'}`}>
                      {q.score}%
                    </span>
                  </div>
                ))}
              </div>
            )}
          </GlassCard>

        </div>

      </div>
    </PageTransition>
  );
};

export default AnalyticsPage;
