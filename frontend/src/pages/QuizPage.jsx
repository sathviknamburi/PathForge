import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import PageTransition from '../components/layout/PageTransition';
import GlassCard from '../components/ui/GlassCard';
import { motion } from 'framer-motion';
import { 
  Brain, 
  ChevronLeft, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Award,
  BookOpen,
  HelpCircle,
  Play
} from 'lucide-react';

const QuizPage = () => {
  const { roadmapId, topicTitle } = useParams();
  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  const decodedTitle = decodeURIComponent(topicTitle);

  const [loading, setLoading] = useState(true);
  const [quiz, setQuiz] = useState(null);
  
  // Quiz State
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        const data = await api.get(`/quizzes/${roadmapId}/${encodeURIComponent(topicTitle)}`);
        setQuiz(data);
      } catch (err) {
        console.error('Failed to fetch quiz:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [roadmapId, topicTitle]);

  const handleOptionClick = (idx) => {
    if (isAnswerSubmitted) return;
    setSelectedOptionIdx(idx);
  };

  const handleVerifyAnswer = () => {
    if (selectedOptionIdx === null || isAnswerSubmitted) return;
    
    setIsAnswerSubmitted(true);
    const question = quiz.questions[currentQuestionIdx];
    if (selectedOptionIdx === question.correctAnswer) {
      setCorrectAnswersCount(prev => prev + 1);
    }
    setUserAnswers(prev => [...prev, selectedOptionIdx]);
  };

  const handleNextQuestion = async () => {
    const nextIdx = currentQuestionIdx + 1;
    if (nextIdx < quiz.questions.length) {
      setCurrentQuestionIdx(nextIdx);
      setSelectedOptionIdx(null);
      setIsAnswerSubmitted(false);
    } else {
      // Quiz Finished! Submit results
      setSubmitting(true);
      try {
        const result = await api.post(`/quizzes/${quiz._id}/submit`, {
          answers: userAnswers
        });
        setSubmissionResult(result);
        await refreshUser(); // Update badge list in navbar
      } catch (err) {
        console.error('Failed to submit quiz score:', err);
      } finally {
        setSubmitting(false);
        setQuizFinished(true);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
        <div className="w-10 h-10 border-4 border-brand-blue border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // If no quiz is found
  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    return (
      <PageTransition>
        <div className="max-w-md mx-auto text-center py-16 space-y-6">
          <div className="w-20 h-20 rounded-full bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center mx-auto text-3xl">
            🧠
          </div>
          <div>
            <h2 className="text-2xl font-bold">No Quiz Available</h2>
            <p className="text-xs text-dark-textMuted mt-2">
              We are currently generating mock MCQs for "{decodedTitle}". Check back soon!
            </p>
          </div>
          <button 
            onClick={() => navigate(`/roadmaps/${roadmapId}`)}
            className="px-6 py-3 rounded-full bg-dark-card border border-dark-border text-xs font-bold text-white hover:bg-dark-card/85 flex items-center justify-center space-x-1.5 mx-auto"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Return to Roadmap</span>
          </button>
        </div>
      </PageTransition>
    );
  }

  // Quiz execution
  const totalQuestions = quiz.questions.length;
  const currentQuestion = quiz.questions[currentQuestionIdx];

  if (quizFinished) {
    const finalScore = submissionResult ? submissionResult.score : Math.round((correctAnswersCount / totalQuestions) * 100);
    const passed = finalScore >= 60;
    const displayCorrectCount = submissionResult ? submissionResult.correctAnswers : correctAnswersCount;
    
    return (
      <PageTransition>
        <div className="max-w-lg mx-auto pb-10 space-y-8">
          
          {/* Results Summary Card */}
          <GlassCard hover={false} className="text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-brand-yellow/10 border border-brand-yellow/30 flex items-center justify-center mx-auto animate-float">
              <Award className="w-10 h-10 text-brand-yellow fill-brand-yellow/20" />
            </div>
            
            <div>
              <h2 className="text-2xl font-extrabold text-white">Quiz Completed!</h2>
              <p className="text-xs text-dark-textMuted mt-1">Practice quiz for {decodedTitle}</p>
            </div>

            {/* Score Wheel */}
            <div className="flex flex-col items-center justify-center py-4">
              <span className={`text-5xl font-black ${passed ? 'text-brand-green' : 'text-red-400'}`}>
                {finalScore}%
              </span>
              <span className="text-[10px] uppercase tracking-widest text-dark-textMuted mt-1.5">
                {displayCorrectCount} out of {totalQuestions} Correct
              </span>
            </div>

            {/* Pass/Fail message */}
            <div className={`p-4 rounded-xl border text-xs font-semibold ${
              passed 
                ? 'bg-brand-green/10 border-brand-green/30 text-brand-green' 
                : 'bg-red-500/10 border-red-500/30 text-red-400'
            }`}>
              {passed 
                ? '🎉 Congratulations! You passed the topic test!'
                : '😅 You didn\'t pass this time. Review resources and try again! (Requires 60%+)'}
            </div>

            {/* Badge Alerts */}
            {submissionResult && submissionResult.newBadges && submissionResult.newBadges.length > 0 && (
              <div className="space-y-2.5">
                <p className="text-xs text-brand-yellow font-extrabold uppercase tracking-wide">🏆 New Achievement Badges Unlocked!</p>
                {submissionResult.newBadges.map((badge, bIdx) => (
                  <div key={bIdx} className="p-3 bg-brand-yellow/5 border border-brand-yellow/20 rounded-xl flex items-center space-x-3 text-left">
                    <span className="text-2xl">{badge.icon || '🏅'}</span>
                    <div>
                      <p className="text-xs font-bold text-white">{badge.title}</p>
                      <p className="text-[10px] text-dark-textMuted mt-0.5">{badge.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Weak Areas feedback */}
            {submissionResult && submissionResult.feedback && (
              <div className="text-left bg-dark-bg/50 border border-dark-border/80 rounded-xl p-4 space-y-2">
                <p className="text-xs font-bold text-white">🔍 Concept Review Feedback</p>
                <p className="text-[11px] text-dark-textMuted leading-relaxed">{submissionResult.feedback}</p>
              </div>
            )}

            {/* Action buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => {
                  // Restart Quiz
                  setCurrentQuestionIdx(0);
                  setSelectedOptionIdx(null);
                  setIsAnswerSubmitted(false);
                  setCorrectAnswersCount(0);
                  setQuizFinished(false);
                  setSubmissionResult(null);
                  setUserAnswers([]);
                }}
                className="py-3 rounded-xl bg-dark-card border border-dark-border hover:bg-dark-card/85 text-xs font-bold text-white flex items-center justify-center space-x-1.5"
              >
                <Play className="w-4 h-4 rotate-0" />
                <span>Try Again</span>
              </button>
              <button 
                onClick={() => navigate(`/roadmaps/${roadmapId}`)}
                className="py-3 rounded-xl bg-brand-blue hover:bg-brand-blue/90 text-xs font-bold text-white flex items-center justify-center space-x-1.5"
              >
                <span>Return to Path</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </GlassCard>

        </div>
      </PageTransition>
    );
  }

  // Active quiz card
  const progressPercent = Math.round(((currentQuestionIdx + 1) / totalQuestions) * 100);

  return (
    <PageTransition>
      <div className="max-w-2xl mx-auto pb-10 space-y-6">
        
        {/* Header back button */}
        <button 
          onClick={() => navigate(`/roadmaps/${roadmapId}`)}
          className="flex items-center space-x-1 text-xs text-dark-textMuted hover:text-white transition-colors duration-150 font-bold"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Exit Quiz</span>
        </button>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs text-dark-textMuted font-bold">
            <span>QUESTION {currentQuestionIdx + 1} OF {totalQuestions}</span>
            <span>{progressPercent}% COMPLETE</span>
          </div>
          <div className="w-full h-1.5 bg-dark-card rounded-full overflow-hidden border border-dark-border">
            <div 
              className="h-full bg-brand-blue rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Main Question Card */}
        <GlassCard hover={false} className="space-y-6">
          
          {/* Question Text */}
          <div className="space-y-3">
            <span className="text-[10px] font-bold tracking-widest text-brand-blue uppercase bg-brand-blue/10 px-2 py-0.5 rounded border border-brand-blue/10">
              Multiple Choice Question
            </span>
            <h3 className="text-lg font-bold text-white leading-relaxed">
              {currentQuestion.question}
            </h3>
          </div>

          {/* Answer Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedOptionIdx === idx;
              const isCorrectAnswer = currentQuestion.correctAnswer === idx;
              
              let optionStyle = 'bg-dark-bg/50 border-dark-border text-dark-text hover:border-dark-border-hover';
              let Icon = HelpCircle;

              if (isAnswerSubmitted) {
                if (isCorrectAnswer) {
                  optionStyle = 'bg-brand-green/10 border-brand-green/40 text-brand-green font-bold';
                  Icon = CheckCircle2;
                } else if (isSelected) {
                  optionStyle = 'bg-red-500/10 border-red-500/40 text-red-400 font-bold';
                  Icon = XCircle;
                } else {
                  optionStyle = 'bg-dark-bg/30 border-dark-border/50 text-dark-textMuted opacity-50';
                }
              } else if (isSelected) {
                optionStyle = 'bg-brand-blue/10 border-brand-blue text-brand-blue font-bold';
              }

              return (
                <div 
                  key={idx}
                  onClick={() => handleOptionClick(idx)}
                  className={`
                    p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all duration-150
                    ${optionStyle}
                  `}
                >
                  <span className="text-xs font-semibold">{option}</span>
                  <Icon className="w-4.5 h-4.5 shrink-0 ml-3" />
                </div>
              );
            })}
          </div>

          {/* Explanation drawer */}
          {isAnswerSubmitted && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-dark-bg border border-dark-border/80 text-xs space-y-2"
            >
              <p className="font-bold text-white flex items-center space-x-1.5">
                <span>💡 Explanation</span>
              </p>
              <p className="text-dark-textMuted leading-relaxed">
                {currentQuestion.explanation}
              </p>
            </motion.div>
          )}

          {/* Footer Verify / Next button */}
          <div className="pt-4 border-t border-dark-border/60 flex justify-end">
            {!isAnswerSubmitted ? (
              <button
                onClick={handleVerifyAnswer}
                disabled={selectedOptionIdx === null}
                className="px-6 py-3 rounded-xl bg-brand-blue hover:bg-brand-blue/90 text-xs font-bold text-white flex items-center space-x-1.5 disabled:opacity-50 transition-all duration-150"
              >
                <span>Verify Answer</span>
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                disabled={submitting}
                className="px-6 py-3 rounded-xl bg-brand-green hover:bg-brand-green/90 text-xs font-bold text-white flex items-center space-x-1.5 transition-all duration-150"
              >
                <span>{currentQuestionIdx + 1 === totalQuestions ? 'Finish Quiz' : 'Next Question'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

        </GlassCard>

      </div>
    </PageTransition>
  );
};

export default QuizPage;
