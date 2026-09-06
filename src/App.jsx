import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ProfileProvider } from './context/ProfileContext';
import { EmployeeProvider } from './context/EmployeeContext';
import { ChatProvider } from './context/ChatContext';

import DashboardLayout from './components/layout/DashboardLayout';
import LandingPage from './pages/LandingPage';
import ChatPage from './pages/ChatPage';
import DirectoryPage from './pages/DirectoryPage';
import AnalyticsPage from './pages/AnalyticsPage';
import SettingsPage from './pages/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <ThemeProvider>
      <ProfileProvider>
        <EmployeeProvider>
          <ChatProvider>
            <BrowserRouter>
              <Routes>
                {/* Landing Page */}
                <Route path="/" element={<LandingPage />} />

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
    </ThemeProvider>
  );
}
