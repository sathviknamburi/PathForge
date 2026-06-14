import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { User, Mail, KeyRound, Building2, GraduationCap, AlertTriangle, ArrowRight } from 'lucide-react';

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [college, setCollege] = useState('');
  const [branch, setBranch] = useState('CSE');
  
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);

  const branches = [
    { value: 'CSE', label: 'Computer Science (CSE)' },
    { value: 'AI & DS', label: 'AI & Data Science (AI & DS)' },
    { value: 'IT', label: 'Information Technology (IT)' },
    { value: 'ECE', label: 'Electronics (ECE)' },
    { value: 'EEE', label: 'Electrical (EEE)' },
    { value: 'Mechanical', label: 'Mechanical' },
    { value: 'Civil', label: 'Civil' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!name || !email || !password || !college || !branch) {
      setFormError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    try {
      await register(name, email, password, college, branch);
      navigate('/dashboard');
    } catch (err) {
      setFormError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg text-white relative flex items-center justify-center p-6 selection:bg-brand-blue selection:text-white">
      {/* Background Decor */}
      <div className="absolute top-10 left-10 w-80 h-80 bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-purple/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-md relative z-10 flex flex-col items-center">
        {/* Brand Header */}
        <Link to="/" className="flex items-center space-x-3 mb-6">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-brand-blue to-brand-green flex items-center justify-center font-black text-white text-2xl shadow-lg shadow-brand-blue/20">
            P
          </div>
          <div>
            <h1 className="font-extrabold text-2xl leading-none bg-gradient-to-r from-white to-dark-textMuted bg-clip-text text-transparent">
              PathForge
            </h1>
            <span className="text-[10px] uppercase tracking-widest text-brand-blue font-bold">
              Student Ecosystem
            </span>
          </div>
        </Link>

        {/* Glass Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full p-8 rounded-2xl glass-panel"
        >
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold">Create Account</h2>
            <p className="text-xs text-dark-textMuted mt-1.5">Join pathforge student ecosystem today</p>
          </div>

          {formError && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-3 mb-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start space-x-2.5 text-red-200 text-xs"
            >
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{formError}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            <div>
              <label className="block text-xs font-semibold text-dark-textMuted mb-1.5 uppercase tracking-wide">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-textMuted" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Sathvik Kumar"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-sm"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-dark-textMuted mb-1.5 uppercase tracking-wide">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-textMuted" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="sathvik@college.edu"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-sm"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-semibold text-dark-textMuted mb-1.5 uppercase tracking-wide">
                Password
              </label>
              <div className="relative">
                <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-textMuted" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-sm"
                  required
                />
              </div>
            </div>

            {/* College Field */}
            <div>
              <label className="block text-xs font-semibold text-dark-textMuted mb-1.5 uppercase tracking-wide">
                College Name
              </label>
              <div className="relative">
                <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-textMuted" />
                <input
                  type="text"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  placeholder="GITAM University"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-sm"
                  required
                />
              </div>
            </div>

            {/* Branch Field */}
            <div>
              <label className="block text-xs font-semibold text-dark-textMuted mb-1.5 uppercase tracking-wide">
                Branch / Discipline
              </label>
              <div className="relative">
                <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-textMuted" />
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-sm appearance-none bg-dark-bg cursor-pointer"
                  required
                >
                  {branches.map((br) => (
                    <option key={br.value} value={br.value} className="bg-dark-card text-white">
                      {br.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 mt-2 rounded-xl bg-brand-blue hover:bg-brand-blue/90 text-sm font-bold text-white flex items-center justify-center space-x-2 hover:scale-[1.01] active:scale-[0.99] transition-all duration-150 disabled:opacity-50"
            >
              {loading ? (
                <span>Creating account...</span>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </motion.div>

        {/* Login Link */}
        <p className="text-xs text-dark-textMuted mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-brand-blue font-semibold hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
