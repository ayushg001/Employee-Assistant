import React, { useState } from 'react';
import { User, Mail, Briefcase, MapPin, Check, Save } from 'lucide-react';
import Card from '../common/Card';
import Input from '../common/Input';
import Button from '../common/Button';
import { useProfile } from '../../context/ProfileContext';

const AVATAR_PRESETS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80',
];

export default function ProfileForm() {
  const { profile, updateProfile } = useProfile();

  const [formData, setFormData] = useState({
    fullName: profile.fullName || '',
    jobTitle: profile.jobTitle || '',
    department: profile.department || '',
    email: profile.email || '',
    location: profile.location || '',
    bio: profile.bio || '',
    avatar: profile.avatar || AVATAR_PRESETS[0]
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
  };

  return (
    <Card>
      <div className="mb-6">
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
          Personal Information
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Update your public team profile and directory details
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Profile Avatar
          </label>
          <div className="flex flex-wrap items-center gap-3">
            <img
              src={formData.avatar}
              alt="Current avatar"
              className="w-16 h-16 rounded-2xl object-cover ring-4 ring-indigo-500/20 shadow-xs"
            />
            <div className="flex items-center gap-2">
              {AVATAR_PRESETS.map((preset, index) => (
                <button
                  type="button"
                  key={index}
                  onClick={() => handleChange('avatar', preset)}
                  className={`relative w-10 h-10 rounded-xl overflow-hidden ring-2 transition-all cursor-pointer ${
                    formData.avatar === preset
                      ? 'ring-indigo-600 scale-105 shadow-sm'
                      : 'ring-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={preset} alt={`Preset ${index + 1}`} className="w-full h-full object-cover" />
                  {formData.avatar === preset && (
                    <div className="absolute inset-0 bg-indigo-600/30 flex items-center justify-center text-white">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            id="full-name"
            label="Full Name"
            value={formData.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            icon={User}
            required
          />

          <Input
            id="job-title"
            label="Job Title / Position"
            value={formData.jobTitle}
            onChange={(e) => handleChange('jobTitle', e.target.value)}
            icon={Briefcase}
            required
          />

          <Input
            id="email-address"
            label="Company Email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            icon={Mail}
            required
          />

          <Input
            id="location"
            label="Office / City Location"
            value={formData.location}
            onChange={(e) => handleChange('location', e.target.value)}
            icon={MapPin}
          />
        </div>

        <div>
          <label
            htmlFor="user-bio"
            className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
          >
            Professional Bio
          </label>
          <textarea
            id="user-bio"
            rows={3}
            value={formData.bio}
            onChange={(e) => handleChange('bio', e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none"
            placeholder="Tell your colleagues about your skills and current focus..."
          />
        </div>

        <div className="flex justify-end pt-2 border-t border-slate-100 dark:border-slate-800">
          <Button type="submit" size="sm" icon={Save}>
            Save Changes
          </Button>
        </div>
      </form>
    </Card>
  );
}
