import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import PageTransition from '../components/layout/PageTransition';
import GlassCard from '../components/ui/GlassCard';
import { Map, Star, Compass, Layers, CheckCircle } from 'lucide-react';

const RoadmapsPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [roadmaps, setRoadmaps] = useState([]);
  const [progress, setProgress] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Frontend', 'Backend', 'Database', 'AI/ML', 'General'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const rmData = await api.get('/roadmaps');
        setRoadmaps(rmData);

        const progData = await api.get('/progress');
        setProgress(progData);
      } catch (err) {
        console.error('Failed to load roadmaps:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
        <div className="w-10 h-10 border-4 border-brand-green border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Filter roadmaps by category
  const filteredRoadmaps = selectedCategory === 'All'
    ? roadmaps
    : roadmaps.filter(rm => {
        const title = rm.title.toLowerCase();
        const cat = selectedCategory.toLowerCase();
        if (cat === 'frontend') {
          return ['html', 'css', 'javascript', 'react.js', 'react'].includes(title);
        }
        if (cat === 'backend') {
          return ['node.js', 'node'].includes(title);
        }
        if (cat === 'database') {
          return ['mongodb', 'mongo'].includes(title);
        }
        if (cat === 'ai/ml') {
          return ['ai / machine learning', 'ai/ml', 'machine learning', 'data science'].includes(title);
        }
        if (cat === 'general') {
          return ['c programming', 'c++ programming', 'java programming', 'python programming', 'mern stack', 'cyber security', 'cloud computing', 'c', 'c++', 'java', 'python'].includes(title);
        }
        return false;
      });

  // Calculate completion percentage for a given roadmap
  const getRoadmapProgress = (rm) => {
    if (!progress || !progress.completedTopics) return 0;
    
    // Total topics in roadmap
    let totalTopics = 0;
    if (rm.levels) {
      rm.levels.forEach(lvl => {
        totalTopics += lvl.topics?.length || 0;
      });
    } else {
      totalTopics = rm.totalTopics || 0;
    }

    if (totalTopics === 0) return 0;

    // Completed topics belonging to this roadmap
    const completedInRm = progress.completedTopics.filter(t => t.roadmapId === rm._id).length;
    return Math.round((completedInRm / totalTopics) * 100);
  };

  return (
    <PageTransition>
      <div className="space-y-8 max-w-6xl mx-auto pb-10">
        
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-extrabold flex items-center space-x-3">
              <Map className="w-8 h-8 text-brand-green" />
              <span>Interactive Learning Paths</span>
            </h2>
            <p className="text-sm text-dark-textMuted mt-1">
              Select a visual roadmap to guide your learning. Progress is synced automatically as you check off topics.
            </p>
          </div>
          <div className="flex items-center space-x-2 bg-dark-card/60 p-1 rounded-full border border-dark-border">
            <Compass className="w-4 h-4 text-brand-green ml-3 shrink-0" />
            <span className="text-xs font-bold text-brand-green uppercase tracking-wider pr-3">15+ Paths Available</span>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 pb-2 border-b border-dark-border/40">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`
                px-5 py-2 rounded-full text-xs font-bold transition-all duration-200 border
                ${selectedCategory === cat 
                  ? 'bg-brand-green/10 border-brand-green/40 text-brand-green shadow-lg' 
                  : 'bg-dark-card/40 border-dark-border/60 text-dark-textMuted hover:text-white hover:border-dark-border'
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid of Roadmaps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoadmaps.map((rm) => {
            const pathProgress = getRoadmapProgress(rm);
            return (
              <GlassCard 
                key={rm._id}
                className="flex flex-col justify-between hover:border-brand-green/20"
                onClick={() => navigate(`/roadmaps/${rm._id}`)}
              >
                <div>
                  {/* Icon and Category */}
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-dark-card to-dark-bg border border-dark-border flex items-center justify-center text-2xl shadow-inner">
                      {rm.icon || '🛠️'}
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-green bg-brand-green/10 px-2.5 py-1 rounded-full border border-brand-green/20">
                      {rm.category}
                    </span>
                  </div>

                  {/* Title and description */}
                  <h3 className="text-lg font-bold text-white mt-5 hover:text-brand-green transition-colors duration-150">
                    {rm.title}
                  </h3>
                  <p className="text-xs text-dark-textMuted mt-2 leading-relaxed line-clamp-3">
                    {rm.description}
                  </p>
                </div>

                {/* Progress bar / Stats footer */}
                <div className="mt-6 pt-4 border-t border-dark-border/40">
                  {pathProgress > 0 ? (
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-brand-green flex items-center space-x-1">
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>In Progress</span>
                        </span>
                        <span className="font-extrabold text-white">{pathProgress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-dark-bg rounded-full overflow-hidden border border-dark-border">
                        <div 
                          className="h-full bg-brand-green rounded-full transition-all duration-500 ease-out" 
                          style={{ width: `${pathProgress}%` }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center text-xs text-dark-textMuted">
                      <span className="flex items-center space-x-1.5 font-medium">
                        <Layers className="w-3.5 h-3.5" />
                        <span>{rm.levels?.length || rm.totalLevels || 0} levels</span>
                      </span>
                      <span className="font-bold text-brand-green group-hover:underline">Start Path →</span>
                    </div>
                  )}
                </div>
              </GlassCard>
            );
          })}
        </div>

      </div>
    </PageTransition>
  );
};

export default RoadmapsPage;
