import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router';
import { UserPlus } from 'lucide-react';
import { useAuth } from '../../context/useAuth';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import styles from './Register.module.css';

export const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const validate = (): string | null => {
    if (!firstName.trim() || !lastName.trim()) return 'Nombre y apellido son obligatorios';
    if (password.length < 6) return 'La contraseña debe tener al menos 6 caracteres';
    if (password !== confirmPassword) return 'Las contraseñas no coinciden';
    return null;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    const result = await register(firstName.trim(), lastName.trim(), email, password);
    setIsLoading(false);

    if (result.success) {
      navigate('/home');
    } else {
      setError(result.error ?? 'Error al crear la cuenta');
    }
  };

  return (
    <div className={styles.page}>
      <GlassPanel variant="modal" className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Crear Cuenta</h1>
          <p className={styles.subtitle}>Únete al portafolio</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.nameRow}>
            <Input
              label="Nombre"
              type="text"
              placeholder="Juan"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <Input
              label="Apellido"
              type="text"
              placeholder="Pérez"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
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
          <Input
            label="Confirmar Contraseña"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          {error && <p className={styles.error}>{error}</p>}

          <Button
            type="submit"
            variant="glow"
            size="lg"
            isLoading={isLoading}
            leftIcon={<UserPlus size={18} />}
            className={styles.submitBtn}
          >
            Crear Cuenta
          </Button>
        </form>

        <p className={styles.footer}>
          ¿Ya tienes cuenta?{' '}
          <Link to="/" className={styles.link}>
            Inicia sesión
          </Link>
        </p>
      </GlassPanel>
    </div>
  );
};
