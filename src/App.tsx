import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme';
import { LoginPage } from './app/auth/LoginPage';
import { AppLayout } from './components/layout/AppLayout';
import { ToastProvider } from './components/common/ToastContext';

import { ProjectLayout } from './components/layout/ProjectLayout';

// Placeholder components for pages
import { HomePage } from './app/home/HomePage';
import { ProjectsPage } from './app/projects/ProjectsPage';
import { BoardPage } from './app/projects/BoardPage';
import { BacklogPage } from './app/projects/BacklogPage';
import { IssueDetailPage } from './app/issues/IssueDetailPage';
import { MyIssuesPage } from './app/home/MyIssuesPage';
import { AssignedToMePage } from './app/home/AssignedToMePage';
import { PeoplePage } from './app/home/PeoplePage';
import { SettingsPage } from './app/home/SettingsPage';
import { ProfilePage } from './app/home/ProfilePage';
import { StarredPage } from './app/home/StarredPage';

import { RoadmapPage } from './app/projects/RoadmapPage';
import { ReportsPage } from './app/projects/ReportsPage';

import { ProjectSettingsPage } from './app/projects/ProjectSettingsPage';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<div>Register Page</div>} />
            
            <Route element={<AppLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              
              <Route path="/projects/:projectKey" element={<ProjectLayout />}>
                <Route path="board" element={<BoardPage />} />
                <Route path="backlog" element={<BacklogPage />} />
                <Route path="roadmap" element={<RoadmapPage />} />
                <Route path="reports" element={<ReportsPage />} />
                <Route path="settings" element={<ProjectSettingsPage />} />
              </Route>
  
              <Route path="/issues/:issueId" element={<IssueDetailPage />} />
              <Route path="/my-issues" element={<MyIssuesPage />} />
              <Route path="/assigned" element={<AssignedToMePage />} />
              <Route path="/starred" element={<StarredPage />} />
              <Route path="/people" element={<PeoplePage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
  
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </ToastProvider>
    </ThemeProvider>
  );
}
