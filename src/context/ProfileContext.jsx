import React, { createContext, useContext, useState, useEffect } from 'react';

const ProfileContext = createContext();

const DEFAULT_PROFILE = {
  fullName: 'Ayush Sharma',
  jobTitle: 'Senior Frontend Engineer',
  department: 'Engineering',
  email: 'ayush.sharma@company.com',
  location: 'Bengaluru, India',
  bio: 'Building intuitive user interfaces and AI-powered dashboards for modern teams.',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80'
};

const DEFAULT_NOTIFICATIONS = {
  emailNotifications: true,
  assistantDailySummary: true,
  directoryUpdates: false,
  soundEffects: true,
};

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('pulseai_user_profile');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_PROFILE;
  });

  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem('pulseai_notifications');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_NOTIFICATIONS;
  });

  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const updateProfile = (updatedFields) => {
    const updated = { ...profile, ...updatedFields };
    setProfile(updated);
    try {
      localStorage.setItem('pulseai_user_profile', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    setToast({ type: 'success', message: 'Profile updated successfully!' });
  };

  const updateNotification = (key, value) => {
    const updated = { ...notifications, [key]: value };
    setNotifications(updated);
    try {
      localStorage.setItem('pulseai_notifications', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    setToast({ type: 'info', message: 'Preference saved.' });
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        notifications,
        updateProfile,
        updateNotification,
        toast,
        dismissToast: () => setToast(null)
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}
