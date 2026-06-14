import React from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({ children, className = '', onClick, delay = 0, hover = true }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      onClick={onClick}
      className={`
        rounded-2xl p-6 border border-white/5 
        ${hover ? 'glass-card cursor-pointer' : 'glass-panel'}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
