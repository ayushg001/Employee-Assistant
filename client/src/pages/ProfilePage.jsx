import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Shield, Calendar, LogOut, ArrowLeft, RefreshCw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';

export default function ProfilePage() {
  const { user, token, logout, loading: authLoading } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch('/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error('Failed to load profile');
        }

        const data = await res.json();
        setProfileData(data.user);
      } catch (err) {
        setError(err.message || 'Error fetching user profile');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [token]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-center gap-3 text-slate-500">
            <RefreshCw className="w-5 h-5 animate-spin text-indigo-600" />
            <span>Loading user profile...</span>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!user && !profileData) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-md w-full text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
            <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <User className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Sign In Required
            </h2>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              Please sign in to view your protected account profile.
            </p>
            <div className="mt-6 flex flex-col gap-2.5">
              <Link to="/login">
                <Button className="w-full">Sign In</Button>
              </Link>
              <Link to="/">
                <Button variant="secondary" className="w-full">
                  Return Home
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const currentUser = profileData || user;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="mb-6 flex items-center justify-between">
            <Link
              to="/"
              className="inline-flex items-center text-xs text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-1" /> Back to Home
            </Link>

            {currentUser.role === 'admin' && (
              <Link to="/admin">
                <Button size="sm" variant="secondary">
                  Go to Admin Panel
                </Button>
              </Link>
            )}
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 text-xs text-red-700 dark:text-red-400">
              {error}
            </div>
          )}

          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row items-center gap-5 pb-8 border-b border-slate-100 dark:border-slate-800 text-center sm:text-left">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white flex items-center justify-center text-2xl font-bold shadow-lg shadow-indigo-500/20">
                {currentUser.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                  <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-50">
                    {currentUser.name}
                  </h1>
                  <Badge variant={currentUser.role === 'admin' ? 'indigo' : 'slate'}>
                    {currentUser.role}
                  </Badge>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Protected user account authenticated via JWT
                </p>
              </div>

              <div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40 border-red-200 dark:border-red-900/50"
                >
                  <LogOut className="w-4 h-4 mr-1.5" /> Log Out
                </Button>
              </div>
            </div>

            {/* Profile fields */}
            <div className="mt-8 space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Account Credentials & Role
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800">
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
                    <User className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Full Name</span>
                  </div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {currentUser.name}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800">
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
                    <Mail className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Email Address</span>
                  </div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {currentUser.email}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800">
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
                    <Shield className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Access Role</span>
                  </div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 capitalize">
                    {currentUser.role}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800">
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
                    <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Member Since</span>
                  </div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {currentUser.createdAt ? new Date(currentUser.createdAt).toLocaleDateString() : 'Active'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
