import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router';
import { LogIn } from 'lucide-react';
import { useAuth } from '../../context/useAuth';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import styles from './Login.module.css';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await login(email, password);
    setIsLoading(false);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error ?? 'Error al iniciar sesión');
    }
  };

  return (
    <div className={styles.page}>
      <GlassPanel variant="modal" className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Iniciar Sesión</h1>
          <p className={styles.subtitle}>Bienvenido de vuelta</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            label="Email"
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Contraseña"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className={styles.error}>{error}</p>}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isLoading}
            leftIcon={<LogIn size={18} />}
            className={styles.submitBtn}
          >
            Iniciar Sesión
          </Button>
        </form>

        <p className={styles.footer}>
          ¿No tienes cuenta?{' '}
          <Link to="/register" className={styles.link}>
            Regístrate
          </Link>
        </p>
      </GlassPanel>
    </div>
  );
};
