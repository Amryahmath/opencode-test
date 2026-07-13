import { Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useAuth } from './context/AuthContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { PageLayout } from './components/layout/PageLayout';
import { AuthLayout } from './components/layout/AuthLayout';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { GuestRoute } from './components/auth/GuestRoute';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { CoursesPage } from './pages/CoursesPage';
import { AITutorPage } from './pages/AITutorPage';
import { PracticePage } from './pages/PracticePage';
import { QuizPage } from './pages/QuizPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { DashboardPage } from './pages/DashboardPage';
import { ProfilePage } from './pages/ProfilePage';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';
import { OtpPage } from './pages/auth/OtpPage';
import { NotFoundPage } from './pages/NotFoundPage';

function App() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-bg">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-dark-bg">
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<PageLayout><HomePage /></PageLayout>} />
            <Route path="/about" element={<PageLayout><AboutPage /></PageLayout>} />
            <Route path="/courses" element={<PageLayout><CoursesPage /></PageLayout>} />
            <Route path="/ai-tutor" element={<PageLayout><AITutorPage /></PageLayout>} />
            <Route path="/practice" element={<PageLayout><PracticePage /></PageLayout>} />
            <Route path="/quiz" element={<PageLayout><QuizPage /></PageLayout>} />
            <Route path="/resources" element={<PageLayout><ResourcesPage /></PageLayout>} />
            
            {/* Auth Routes */}
            <Route
              path="/login"
              element={
                <GuestRoute>
                  <AuthLayout><LoginPage /></AuthLayout>
                </GuestRoute>
              }
            />
            <Route
              path="/register"
              element={
                <GuestRoute>
                  <AuthLayout><RegisterPage /></AuthLayout>
                </GuestRoute>
              }
            />
            <Route
              path="/forgot-password"
              element={
                <GuestRoute>
                  <AuthLayout><ForgotPasswordPage /></AuthLayout>
                </GuestRoute>
              }
            />
            <Route
              path="/verify-otp"
              element={
                <GuestRoute>
                  <AuthLayout><OtpPage /></AuthLayout>
                </GuestRoute>
              }
            />
            
            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <PageLayout><DashboardPage /></PageLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <PageLayout><ProfilePage /></PageLayout>
                </ProtectedRoute>
              }
            />
            
            {/* 404 */}
            <Route path="*" element={<PageLayout><NotFoundPage /></PageLayout>} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

export default App;