import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { KeyRound, Mail, AlertTriangle, ArrowRight, BookOpen } from 'lucide-react';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!email || !password) {
      setFormError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setFormError(err.message || 'Login failed. Please check credentials.');
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
        <Link to="/" className="flex items-center space-x-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-brand-blue to-brand-green flex items-center justify-center font-black text-white text-2xl shadow-lg shadow-brand-blue/20">
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
            <h2 className="text-2xl font-bold">Welcome Back</h2>
            <p className="text-xs text-dark-textMuted mt-1.5">Sign in to resume forging your learning path</p>
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
            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-dark-textMuted mb-2 uppercase tracking-wide">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-textMuted" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@college.edu"
                  className="w-full pl-10 pr-4 py-3 rounded-xl glass-input text-sm"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-semibold text-dark-textMuted uppercase tracking-wide">
                  Password
                </label>
                <a href="#" className="text-xs text-brand-blue hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-textMuted" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl glass-input text-sm"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 mt-2 rounded-xl bg-brand-blue hover:bg-brand-blue/90 text-sm font-bold text-white flex items-center justify-center space-x-2 hover:scale-[1.01] active:scale-[0.99] transition-all duration-150 disabled:opacity-50"
            >
              {loading ? (
                <span>Signing in...</span>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Seed accounts notice to make testing super easy! */}
          <div className="mt-6 pt-5 border-t border-dark-border/40 text-center">
            <p className="text-[11px] text-dark-textMuted">
              💡 Tip: Login with seeded student account:<br />
              <span className="font-bold text-white">sathvik@college.edu</span> / <span className="font-bold text-white">password123</span>
            </p>
          </div>
        </motion.div>

        {/* Register Link */}
        <p className="text-xs text-dark-textMuted mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-brand-blue font-semibold hover:underline">
            Register now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
