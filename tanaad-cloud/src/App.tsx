import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Layout } from '@/components/Layout';
import { LoginPage } from '@/pages/LoginPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { StudentsPage } from '@/pages/StudentsPage';
import { TeachersPage } from '@/pages/TeachersPage';
import { CoursesPage } from '@/pages/CoursesPage';
import { PaymentsPage } from '@/pages/PaymentsPage';
import { ExamsPage } from '@/pages/ExamsPage';
import { UsersPage } from '@/pages/UsersPage';
import { SettingsPage } from '@/pages/SettingsPage';

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="page-header">
      <div><h1>{title}</h1><p>This module is coming soon</p></div>
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        {/* Protected routes with sidebar layout */}
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/students" element={<StudentsPage />} />
          <Route path="/teachers" element={<TeachersPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/payments" element={<PaymentsPage />} />
          <Route path="/exams" element={<ExamsPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/attendance" element={<PlaceholderPage title="Attendance" />} />
          <Route path="/grades" element={<PlaceholderPage title="Grades" />} />
          <Route path="/certificates" element={<PlaceholderPage title="Certificates" />} />
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
