import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import PageTransition from '../components/layout/PageTransition';
import GlassCard from '../components/ui/GlassCard';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Map, 
  ChevronLeft, 
  Lock, 
  Unlock, 
  CheckCircle2, 
  Info, 
  BookOpen, 
  Brain, 
  FileEdit,
  X,
  ExternalLink,
  Award
} from 'lucide-react';

const RoadmapDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  const [loading, setLoading] = useState(true);
  const [roadmap, setRoadmap] = useState(null);
  const [progress, setProgress] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [completing, setCompleting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const rmData = await api.get(`/roadmaps/${id}`);
        setRoadmap(rmData);

        const progData = await api.get('/progress');
        setProgress(progData);
      } catch (err) {
        console.error('Failed to load roadmap details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const isTopicCompleted = (topicTitle) => {
    if (!progress || !progress.completedTopics) return false;
    return progress.completedTopics.some(
      t => t.roadmapId === id && t.topicTitle === topicTitle
    );
  };

  // Node unlocking rule:
  // First topic of Level 1 is always unlocked.
  // Any topic is unlocked if it is already completed, OR if the topic right before it is completed.
  const isTopicUnlocked = (levelIndex, topicIndex) => {
    if (levelIndex === 0 && topicIndex === 0) return true;

    // Get the previous topic in the current level
    if (topicIndex > 0) {
      const prevTopic = roadmap.levels[levelIndex].topics[topicIndex - 1];
      return isTopicCompleted(prevTopic.title);
    }

    // If it's the first topic of a level, check if the last topic of the previous level is completed
    if (levelIndex > 0 && topicIndex === 0) {
      const prevLevel = roadmap.levels[levelIndex - 1];
      const lastTopicOfPrevLevel = prevLevel.topics[prevLevel.topics.length - 1];
      return isTopicCompleted(lastTopicOfPrevLevel.title);
    }

    return false;
  };

  const handleMarkCompleted = async (topicTitle) => {
    setCompleting(true);
    try {
      const updatedProg = await api.post('/progress/complete-topic', {
        roadmapId: id,
        topicTitle
      });
      setProgress(updatedProg);
      await refreshUser(); // Update badge count in navbar
      
      // Update drawer topic completed state locally
      setSelectedTopic(prev => ({ ...prev, completed: true }));
    } catch (err) {
      console.error('Failed to complete topic:', err);
    } finally {
      setCompleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
        <div className="w-10 h-10 border-4 border-brand-purple border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!roadmap) {
    return (
      <div className="text-center py-10">
        <p className="text-red-400 font-bold">Roadmap not found.</p>
        <button onClick={() => navigate('/roadmaps')} className="text-brand-blue underline mt-4">Back to roadmaps</button>
      </div>
    );
  }

  // Count total completed in this roadmap
  let totalTopics = 0;
  let completedTopics = 0;
  roadmap.levels.forEach(lvl => {
    lvl.topics.forEach(t => {
      totalTopics++;
      if (isTopicCompleted(t.title)) completedTopics++;
    });
  });
  const progressPercent = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto pb-20 relative">
        
        {/* Back navigation */}
        <button 
          onClick={() => navigate('/roadmaps')}
          className="flex items-center space-x-1.5 text-xs text-dark-textMuted hover:text-white transition-colors duration-150 mb-6 font-bold"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Roadmaps</span>
        </button>

        {/* Roadmap Title Card */}
        <GlassCard hover={false} className="mb-10 relative overflow-hidden bg-gradient-to-r from-brand-purple/15 to-transparent">
          <div className="absolute right-6 top-6 text-6xl opacity-25">{roadmap.icon}</div>
          <div className="relative z-10 pr-16">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-purple bg-brand-purple/10 px-2.5 py-1 rounded-full border border-brand-purple/20">
              {roadmap.category}
            </span>
            <h2 className="text-3xl font-black mt-4">{roadmap.title}</h2>
            <p className="text-xs text-dark-textMuted mt-2 leading-relaxed max-w-2xl">{roadmap.description}</p>
            
            {/* Completion stats */}
            <div className="flex items-center space-x-4 mt-6">
              <div className="flex-1 max-w-xs bg-dark-bg h-2 rounded-full overflow-hidden border border-dark-border">
                <div 
                  className="h-full bg-brand-purple rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="text-xs font-extrabold text-brand-purple">{progressPercent}% Completed</span>
              <span className="text-xs text-dark-textMuted">({completedTopics}/{totalTopics} Topics)</span>
            </div>
          </div>
        </GlassCard>

        {/* Visual Roadmap Path Map */}
        <div className="space-y-16 relative">
          {/* Connector Vertical Line */}
          <div className="absolute top-4 bottom-4 left-1/2 -translate-x-1/2 w-1 bg-gradient-to-b from-brand-purple via-brand-blue to-dark-border rounded-full z-0 pointer-events-none" />

          {roadmap.levels.map((level, levelIdx) => (
            <div key={levelIdx} className="space-y-8 relative z-10">
              {/* Level Title Badge */}
              <div className="flex justify-center">
                <span className="px-4 py-1.5 rounded-full bg-dark-card border border-dark-border text-xs font-bold text-white uppercase tracking-wider shadow-md">
                  Level {levelIdx + 1}: {level.title}
                </span>
              </div>

              {/* Topics nodes */}
              <div className="flex flex-col items-center space-y-6">
                {level.topics.map((topic, topicIdx) => {
                  const completed = isTopicCompleted(topic.title);
                  const unlocked = isTopicUnlocked(levelIdx, topicIdx);

                  // Set color schemes based on state
                  let nodeColor = 'bg-dark-card border-dark-border text-dark-textMuted';
                  let ringGlow = '';

                  if (completed) {
                    nodeColor = 'bg-gradient-to-tr from-brand-purple to-brand-blue border-transparent text-white shadow-lg shadow-brand-purple/20';
                  } else if (unlocked) {
                    nodeColor = 'bg-dark-card border-brand-purple text-white';
                    ringGlow = 'ring-4 ring-brand-purple/15 animate-pulse';
                  }

                  return (
                    <motion.div 
                      key={topicIdx}
                      whileHover={unlocked ? { scale: 1.05 } : {}}
                      whileTap={unlocked ? { scale: 0.95 } : {}}
                      onClick={() => {
                        if (unlocked) {
                          setSelectedTopic({ ...topic, completed });
                          setIsDrawerOpen(true);
                        }
                      }}
                      className={`
                        w-56 p-4 rounded-2xl flex items-center justify-between border cursor-pointer z-10 transition-all duration-200
                        ${nodeColor} ${ringGlow}
                        ${!unlocked ? 'opacity-50 cursor-not-allowed' : ''}
                      `}
                    >
                      <div className="flex items-center space-x-3 overflow-hidden">
                        <div className="shrink-0">
                          {completed ? (
                            <CheckCircle2 className="w-5 h-5 text-white" />
                          ) : unlocked ? (
                            <Unlock className="w-5 h-5 text-brand-purple" />
                          ) : (
                            <Lock className="w-4 h-4 text-dark-textMuted" />
                          )}
                        </div>
                        <span className="font-bold text-xs truncate">{topic.title}</span>
                      </div>
                      <span className="text-[9px] uppercase tracking-wider text-dark-textMuted shrink-0 font-bold ml-2">
                        {topic.estimatedTime}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Right Drawer Panel for Topic Details */}
        <AnimatePresence>
          {isDrawerOpen && selectedTopic && (
            <>
              {/* Overlay Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsDrawerOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              />

              {/* Drawer Container */}
              <motion.div 
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed inset-y-0 right-0 w-full max-w-md bg-dark-bg border-l border-dark-border z-50 shadow-2xl flex flex-col justify-between"
              >
                {/* Header */}
                <div className="p-6 border-b border-dark-border/60">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[9px] font-extrabold uppercase tracking-widest text-brand-purple bg-brand-purple/10 px-2 py-0.5 rounded border border-brand-purple/10">
                        {roadmap.title}
                      </span>
                      <h3 className="text-xl font-bold mt-2 text-white">{selectedTopic.title}</h3>
                      <p className="text-[10px] text-dark-textMuted mt-1">Est. Duration: {selectedTopic.estimatedTime}</p>
                    </div>
                    <button 
                      onClick={() => setIsDrawerOpen(false)}
                      className="p-1 rounded-full bg-dark-card border border-dark-border hover:bg-dark-card/85 text-dark-textMuted hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  
                  {/* Subtopics checklist */}
                  {selectedTopic.subtopics && selectedTopic.subtopics.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-1.5">
                        <BookOpen className="w-4 h-4 text-brand-purple" />
                        <span>Core Subtopics</span>
                      </h4>
                      <ul className="space-y-2">
                        {selectedTopic.subtopics.map((sub, sIdx) => (
                          <li key={sIdx} className="p-2.5 rounded-xl bg-dark-card/50 border border-dark-border/40 text-xs font-medium flex items-center space-x-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-purple shrink-0" />
                            <span>{sub}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Resource Links */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-1.5">
                      <Info className="w-4 h-4 text-brand-blue" />
                      <span>Recommended Resources</span>
                    </h4>
                    <div className="space-y-2">
                      {(!selectedTopic.resources || 
                        ((!selectedTopic.resources.docs || selectedTopic.resources.docs.length === 0) &&
                         (!selectedTopic.resources.youtube || selectedTopic.resources.youtube.length === 0) &&
                         (!selectedTopic.resources.practice || selectedTopic.resources.practice.length === 0))) ? (
                        <>
                          <a 
                            href="https://roadmap.sh" 
                            target="_blank" 
                            rel="noreferrer"
                            className="p-3 rounded-xl bg-dark-card border border-dark-border/80 text-xs font-semibold hover:border-brand-blue/30 hover:bg-brand-blue/5 transition-all duration-150 flex items-center justify-between group"
                          >
                            <span className="text-dark-textMuted group-hover:text-brand-blue">Interactive Roadmap Guide (Roadmap.sh)</span>
                            <ExternalLink className="w-3.5 h-3.5 text-dark-textMuted group-hover:text-brand-blue" />
                          </a>
                          <a 
                            href="https://developer.mozilla.org" 
                            target="_blank" 
                            rel="noreferrer"
                            className="p-3 rounded-xl bg-dark-card border border-dark-border/80 text-xs font-semibold hover:border-brand-blue/30 hover:bg-brand-blue/5 transition-all duration-150 flex items-center justify-between group"
                          >
                            <span className="text-dark-textMuted group-hover:text-brand-blue">MDN Web Documentation</span>
                            <ExternalLink className="w-3.5 h-3.5 text-dark-textMuted group-hover:text-brand-blue" />
                          </a>
                        </>
                      ) : (
                        <>
                          {/* Render Docs links */}
                          {selectedTopic.resources.docs?.map((url, uIdx) => {
                            const isW3 = url.includes('w3schools.com');
                            let hostname = 'Docs';
                            try {
                              hostname = new URL(url).hostname.replace('www.', '');
                            } catch (e) {}
                            
                            const label = isW3 ? 'W3Schools Online Tutorial' : `Documentation Guide (${hostname})`;
                            return (
                              <a 
                                key={`doc-${uIdx}`}
                                href={url} 
                                target="_blank" 
                                rel="noreferrer"
                                className={`p-3 rounded-xl bg-dark-card border border-dark-border/80 text-xs font-semibold transition-all duration-150 flex items-center justify-between group ${
                                  isW3 ? 'hover:border-brand-green/30 hover:bg-brand-green/5' : 'hover:border-brand-blue/30 hover:bg-brand-blue/5'
                                }`}
                              >
                                <span className={`text-dark-textMuted ${isW3 ? 'group-hover:text-brand-green' : 'group-hover:text-brand-blue'}`}>
                                  {label}
                                </span>
                                <ExternalLink className={`w-3.5 h-3.5 text-dark-textMuted ${isW3 ? 'group-hover:text-brand-green' : 'group-hover:text-brand-blue'}`} />
                              </a>
                            );
                          })}

                          {/* Render Youtube links */}
                          {selectedTopic.resources.youtube?.map((url, uIdx) => (
                            <a 
                              key={`yt-${uIdx}`}
                              href={url} 
                              target="_blank" 
                              rel="noreferrer"
                              className="p-3 rounded-xl bg-dark-card border border-dark-border/80 text-xs font-semibold hover:border-red-500/30 hover:bg-red-500/5 transition-all duration-150 flex items-center justify-between group"
                            >
                              <span className="text-dark-textMuted group-hover:text-red-400">YouTube Video Tutorial</span>
                              <ExternalLink className="w-3.5 h-3.5 text-dark-textMuted group-hover:text-red-400" />
                            </a>
                          ))}

                          {/* Render Practice links */}
                          {selectedTopic.resources.practice?.map((url, uIdx) => (
                            <a 
                              key={`pr-${uIdx}`}
                              href={url} 
                              target="_blank" 
                              rel="noreferrer"
                              className="p-3 rounded-xl bg-dark-card border border-dark-border/80 text-xs font-semibold hover:border-brand-orange/30 hover:bg-brand-orange/5 transition-all duration-150 flex items-center justify-between group"
                            >
                              <span className="text-dark-textMuted group-hover:text-brand-orange">Interactive Coding Practice</span>
                              <ExternalLink className="w-3.5 h-3.5 text-dark-textMuted group-hover:text-brand-orange" />
                            </a>
                          ))}
                        </>
                      )}
                    </div>
                  </div>

                </div>

                {/* Footer Actions */}
                <div className="p-6 border-t border-dark-border/60 bg-dark-card/30 space-y-3">
                  
                  {/* Mark Completed */}
                  {!selectedTopic.completed ? (
                    <button
                      onClick={() => handleMarkCompleted(selectedTopic.title)}
                      disabled={completing}
                      className="w-full py-3 rounded-xl bg-brand-purple hover:bg-brand-purple/90 text-sm font-bold text-white flex items-center justify-center space-x-2 transition-all duration-150 disabled:opacity-50 shadow-lg shadow-brand-purple/10"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{completing ? 'Marking...' : 'Mark as Completed'}</span>
                    </button>
                  ) : (
                    <div className="w-full py-3 rounded-xl bg-brand-green/10 border border-brand-green/30 text-brand-green text-sm font-bold flex items-center justify-center space-x-2">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Completed!</span>
                    </div>
                  )}

                  {/* Optional Actions: Take Quiz / Write Notes */}
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => {
                        setIsDrawerOpen(false);
                        navigate(`/quiz/${id}/${encodeURIComponent(selectedTopic.title)}`);
                      }}
                      className="py-2.5 rounded-xl bg-dark-card border border-dark-border hover:border-brand-blue/40 text-xs font-bold text-brand-blue flex items-center justify-center space-x-1.5"
                    >
                      <Brain className="w-4 h-4 shrink-0" />
                      <span>Practice Quiz</span>
                    </button>
                    <button 
                      onClick={() => {
                        setIsDrawerOpen(false);
                        navigate('/notes');
                      }}
                      className="py-2.5 rounded-xl bg-dark-card border border-dark-border hover:border-brand-pink/40 text-xs font-bold text-brand-pink flex items-center justify-center space-x-1.5"
                    >
                      <FileEdit className="w-4 h-4 shrink-0" />
                      <span>Topic Notes</span>
                    </button>
                  </div>

                </div>

              </motion.div>
            </>
          )}
        </AnimatePresence>

      </div>
    </PageTransition>
  );
};

export default RoadmapDetailPage;
