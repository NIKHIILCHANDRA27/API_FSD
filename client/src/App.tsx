import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import AddCandidatePage from './pages/AddCandidatePage';
import CandidatesPage from './pages/CandidatesPage';
import JobRequirementsPage from './pages/JobRequirementsPage';
import SavedShortlistPage from './pages/SavedShortlistPage';
import NotFoundPage from './pages/NotFoundPage';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-violet-500 selection:text-white">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            <Route path="/candidates/add" element={<ProtectedRoute><AddCandidatePage /></ProtectedRoute>} />
            <Route path="/candidates" element={<ProtectedRoute><CandidatesPage /></ProtectedRoute>} />
            <Route path="/jobs" element={<ProtectedRoute><JobRequirementsPage /></ProtectedRoute>} />
            <Route path="/shortlist" element={<ProtectedRoute><SavedShortlistPage /></ProtectedRoute>} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AnimatePresence>
        <Toaster position="top-right" />
      </div>
    </AuthProvider>
  );
}

export default App;
