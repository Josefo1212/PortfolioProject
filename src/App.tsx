import { BrowserRouter, Routes, Route } from 'react-router';
import { AuthProvider } from './context/AuthProvider';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);

export default App;
