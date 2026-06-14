import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Award, BookOpen, GraduationCap } from 'lucide-react';

const Navbar = () => {
  const { user } = useAuth();

  // Get full name of branch
  const getBranchFullName = (br) => {
    const branches = {
      'CSE': 'Computer Science Engineering',
      'AI & DS': 'Artificial Intelligence & Data Science',
      'IT': 'Information Technology',
      'ECE': 'Electronics & Communication Engineering',
      'EEE': 'Electrical & Electronics Engineering',
      'Mechanical': 'Mechanical Engineering',
      'Civil': 'Civil Engineering'
    };
    return branches[br] || br;
  };

  const quotes = [
    "Mistakes are proof that you are trying. Keep going!",
    "Every small commit builds a giant tower of knowledge.",
    "First, solve the problem. Then, write the code.",
    "Consistency beats talent when talent doesn't work hard.",
    "Your learning path is unique. Forge it with pride.",
    "The secret of getting ahead is getting started."
  ];

  // Pick a random quote based on user name length or date
  const randomQuote = quotes[new Date().getDate() % quotes.length];

  return (
    <header className="h-16 border-b border-dark-border/60 bg-dark-bg/40 backdrop-blur-md sticky top-0 z-20 flex items-center justify-between px-8">
      {/* Welcome / Quote section */}
      <div className="flex-1 hidden md:block">
        <p className="text-xs font-semibold text-brand-blue tracking-wide uppercase flex items-center space-x-1">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Daily Motivation</span>
        </p>
        <p className="text-xs text-dark-textMuted italic mt-0.5 truncate max-w-lg">
          "{randomQuote}"
        </p>
      </div>

      {/* Student Badge / Academic status */}
      {user && (
        <div className="flex items-center space-x-4 ml-auto">
          {/* Branch badge */}
          <div className="flex items-center space-x-2 px-3.5 py-1.5 bg-brand-purple/10 border border-brand-purple/20 rounded-full">
            <GraduationCap className="w-4 h-4 text-brand-purple" />
            <span className="text-xs font-semibold text-brand-purple whitespace-nowrap">
              {getBranchFullName(user.branch)}
            </span>
          </div>

          {/* College Info */}
          <div className="hidden lg:flex items-center space-x-1.5 text-xs text-dark-textMuted">
            <span className="font-semibold text-white">{user.college}</span>
          </div>

          {/* Achievements badge count */}
          <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-brand-yellow/10 border border-brand-yellow/30 rounded-full cursor-pointer hover:bg-brand-yellow/20 transition-all duration-150">
            <Award className="w-4 h-4 text-brand-yellow fill-brand-yellow/20" />
            <span className="text-xs font-bold text-brand-yellow">
              {user.achievements ? user.achievements.length : 0} Badges
            </span>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
