import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { MainLayout } from '../components';
import { AboutPage, AITutorPage, CoursesPage, DashboardPage, ForgotPasswordPage, HomePage, LoginPage, NotFoundPage, OtpPage, PracticePage, QuizPage, QuizResultsPage, RegisterPage, ResourcesPage, StudentProfilePage } from '../pages';

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="courses" element={<CoursesPage />} />
        <Route path="ai-tutor" element={<AITutorPage />} />
        <Route path="practice" element={<PracticePage />} />
        <Route path="quiz" element={<QuizPage />} />
        <Route path="quiz/results" element={<QuizResultsPage />} />
        <Route path="resources" element={<ResourcesPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="profile" element={<StudentProfilePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="otp" element={<OtpPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/home" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);
