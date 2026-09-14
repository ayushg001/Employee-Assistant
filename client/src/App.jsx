import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { ProfileProvider } from './context/ProfileContext';
import { EmployeeProvider } from './context/EmployeeContext';
import { ChatProvider } from './context/ChatContext';

import DashboardLayout from './components/layout/DashboardLayout';
import LandingPage from './pages/LandingPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';
import ChatPage from './pages/ChatPage';
import DirectoryPage from './pages/DirectoryPage';
import AnalyticsPage from './pages/AnalyticsPage';
import SettingsPage from './pages/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ProfileProvider>
          <EmployeeProvider>
            <ChatProvider>
              <BrowserRouter>
                <Routes>
                  {/* Public Pages */}
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/profile" element={<ProfilePage />} />

                  {/* Admin Panel */}
                  <Route path="/admin" element={<AdminPage />} />

                  {/* Dashboard Sub-routes */}
                  <Route path="/dashboard" element={<DashboardLayout />}>
                    <Route index element={<Navigate to="/dashboard/chat" replace />} />
                    <Route path="chat" element={<ChatPage />} />
                    <Route path="directory" element={<DirectoryPage />} />
                    <Route path="analytics" element={<AnalyticsPage />} />
                    <Route path="settings" element={<SettingsPage />} />
                  </Route>

                  {/* Catch-all 404 Route */}
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </BrowserRouter>
            </ChatProvider>
          </EmployeeProvider>
        </ProfileProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
