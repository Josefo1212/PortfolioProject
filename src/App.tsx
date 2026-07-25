import { BrowserRouter, Routes, Route } from 'react-router';
import { AuthProvider } from './context/AuthProvider';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { AuthPage } from './pages/Auth';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);

export default App;
