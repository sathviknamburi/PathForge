import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import PageTransition from '../components/layout/PageTransition';
import GlassCard from '../components/ui/GlassCard';
import { 
  User, 
  Mail, 
  Building2, 
  GraduationCap, 
  Award, 
  Save, 
  Edit2, 
  Calendar,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';

const ProfilePage = () => {
  const { user, refreshUser } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [allBadges, setAllBadges] = useState([]);
  const [unlockedBadges, setUnlockedBadges] = useState([]);
  
  // Edit form state
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [college, setCollege] = useState('');
  const [branch, setBranch] = useState('CSE');
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [saving, setSaving] = useState(false);

  const branches = [
    { value: 'CSE', label: 'Computer Science (CSE)' },
    { value: 'AI & DS', label: 'AI & Data Science (AI & DS)' },
    { value: 'IT', label: 'Information Technology (IT)' },
    { value: 'ECE', label: 'Electronics (ECE)' },
    { value: 'EEE', label: 'Electrical (EEE)' },
    { value: 'Mechanical', label: 'Mechanical' },
    { value: 'Civil', label: 'Civil' }
  ];

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        setLoading(true);
        const data = await api.get('/progress/achievements');
        setAllBadges(data.all || []);
        setUnlockedBadges(data.unlocked || []);
        
        if (user) {
          setName(user.name);
          setCollege(user.college);
          setBranch(user.branch);
        }
      } catch (err) {
        console.error('Failed to load achievements:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, [user]);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!name.trim() || !college.trim()) {
      setError('Name and College fields are required.');
      return;
    }

    setSaving(true);
    try {
      await api.put('/auth/profile', {
        name,
        college,
        branch
      });
      await refreshUser(); // Update info in sidebar and navbar
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to update profile:', err);
      setError(err.message || 'Failed to save profile changes.');
    } finally {
      setSaving(false);
    }
  };

  const isBadgeUnlocked = (badgeId) => {
    return unlockedBadges.some(b => b.badgeId === badgeId);
  };

  const getBadgeUnlockDate = (badgeId) => {
    const record = unlockedBadges.find(b => b.badgeId === badgeId);
    return record ? new Date(record.unlockedAt).toLocaleDateString() : '';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
        <div className="w-10 h-10 border-4 border-brand-yellow border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="max-w-5xl mx-auto pb-10 space-y-8">
        
        {/* Header */}
        <div>
          <h2 className="text-3xl font-extrabold flex items-center space-x-3">
            <User className="w-8 h-8 text-brand-yellow" />
            <span>Profile & Achievements</span>
          </h2>
          <p className="text-sm text-dark-textMuted mt-1">
            Manage your student profile details and view the badges you unlocked during your learning journey.
          </p>
        </div>

        {/* Success/Error Alerts */}
        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center space-x-2 text-red-200 text-xs">
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}
        {success && (
          <div className="p-3 bg-brand-green/10 border border-brand-green/30 rounded-xl flex items-center space-x-2 text-brand-green text-xs font-bold">
            <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0" />
            <span>{success}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Profile Card */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-dark-textMuted uppercase tracking-wider px-1">Personal Details</h3>
            
            <GlassCard hover={false} className="space-y-6">
              
              {/* Profile Avatar and Name */}
              <div className="flex flex-col items-center text-center space-y-3 pb-6 border-b border-dark-border/40">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-yellow/30 to-brand-orange/30 border-2 border-brand-yellow flex items-center justify-center text-3xl font-black text-brand-yellow">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h4 className="text-lg font-black text-white">{user?.name}</h4>
                  <p className="text-xs text-dark-textMuted flex items-center justify-center space-x-1 mt-0.5">
                    <Mail className="w-3.5 h-3.5 text-dark-textMuted" />
                    <span>{user?.email}</span>
                  </p>
                </div>
              </div>

              {/* Editing Fields Form */}
              {isEditing ? (
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  {/* Name Input */}
                  <div>
                    <label className="block text-[10px] font-bold text-dark-textMuted uppercase tracking-wide mb-1.5">Full Name</label>
                    <input 
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl glass-input text-xs"
                      required
                    />
                  </div>

                  {/* College Input */}
                  <div>
                    <label className="block text-[10px] font-bold text-dark-textMuted uppercase tracking-wide mb-1.5">College Name</label>
                    <input 
                      type="text"
                      value={college}
                      onChange={(e) => setCollege(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl glass-input text-xs"
                      required
                    />
                  </div>

                  {/* Branch Select */}
                  <div>
                    <label className="block text-[10px] font-bold text-dark-textMuted uppercase tracking-wide mb-1.5">Branch</label>
                    <select
                      value={branch}
                      onChange={(e) => setBranch(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl glass-input text-xs appearance-none bg-dark-bg cursor-pointer"
                      required
                    >
                      {branches.map(br => (
                        <option key={br.value} value={br.value} className="bg-dark-card text-white">
                          {br.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Save/Cancel Buttons */}
                  <div className="flex space-x-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="flex-1 py-2.5 rounded-xl bg-dark-card border border-dark-border text-xs font-bold text-white transition-all duration-150"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={saving}
                      className="flex-1 py-2.5 rounded-xl bg-brand-yellow text-dark-bg hover:bg-brand-yellow/90 text-xs font-black flex items-center justify-center space-x-1 transition-all duration-150"
                    >
                      <Save className="w-3.5 h-3.5 shrink-0" />
                      <span>{saving ? 'Saving...' : 'Save'}</span>
                    </button>
                  </div>
                </form>
              ) : (
                // View Mode
                <div className="space-y-4 text-xs font-medium">
                  <div className="flex items-center space-x-3.5 p-3 bg-dark-bg/40 border border-dark-border/60 rounded-xl">
                    <Building2 className="w-4.5 h-4.5 text-brand-yellow shrink-0" />
                    <div>
                      <p className="text-[10px] text-dark-textMuted uppercase font-bold tracking-wide">College</p>
                      <p className="text-white font-semibold mt-0.5">{user?.college}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3.5 p-3 bg-dark-bg/40 border border-dark-border/60 rounded-xl">
                    <GraduationCap className="w-4.5 h-4.5 text-brand-yellow shrink-0" />
                    <div>
                      <p className="text-[10px] text-dark-textMuted uppercase font-bold tracking-wide">Branch</p>
                      <p className="text-white font-semibold mt-0.5">{user?.branch}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3.5 p-3 bg-dark-bg/40 border border-dark-border/60 rounded-xl">
                    <Calendar className="w-4.5 h-4.5 text-brand-yellow shrink-0" />
                    <div>
                      <p className="text-[10px] text-dark-textMuted uppercase font-bold tracking-wide">Student Since</p>
                      <p className="text-white font-semibold mt-0.5">
                        {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'June 2026'}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsEditing(true)}
                    className="w-full py-2.5 mt-2 rounded-xl bg-dark-card border border-dark-border hover:border-brand-yellow/30 text-xs font-bold text-white flex items-center justify-center space-x-1.5 transition-all duration-150"
                  >
                    <Edit2 className="w-4 h-4 shrink-0" />
                    <span>Edit Profile</span>
                  </button>
                </div>
              )}

            </GlassCard>
          </div>

          {/* Right Column: Achievements Badge Gallery */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex justify-between items-center px-1">
              <h3 className="text-xs font-bold text-dark-textMuted uppercase tracking-wider">Achievements Gallery</h3>
              <span className="text-[10px] font-bold text-brand-yellow bg-brand-yellow/10 px-2 py-0.5 rounded border border-brand-yellow/20">
                {unlockedBadges.length} / {allBadges.length} Unlocked
              </span>
            </div>

            {/* Badges Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {allBadges.map((badge) => {
                const unlocked = isBadgeUnlocked(badge.badgeId);
                const unlockDate = getBadgeUnlockDate(badge.badgeId);
                
                return (
                  <div 
                    key={badge.badgeId}
                    className={`
                      p-4 rounded-2xl border flex items-start space-x-4 transition-all duration-200
                      ${unlocked 
                        ? 'bg-dark-card border-brand-yellow/30 shadow' 
                        : 'bg-dark-card/25 border-dark-border/50 opacity-50'
                      }
                    `}
                  >
                    <span className="text-3.5xl shrink-0 mt-1 select-none">
                      {badge.icon || '🏅'}
                    </span>
                    <div className="overflow-hidden">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-bold text-xs text-white truncate">{badge.title}</h4>
                        {unlocked && (
                          <span className="text-[8px] bg-brand-yellow text-dark-bg font-extrabold uppercase px-1 rounded">
                            Unlocked
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-dark-textMuted mt-1 leading-relaxed">
                        {badge.description}
                      </p>
                      {unlocked && unlockDate && (
                        <p className="text-[9px] text-brand-yellow/80 mt-2 font-semibold">
                          Earned on: {unlockDate}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </PageTransition>
  );
};

export default ProfilePage;
