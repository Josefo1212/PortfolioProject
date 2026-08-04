import { useState, useCallback, useRef, useEffect, type FormEvent, type FocusEvent } from 'react';
import { useNavigate } from 'react-router';
import { LogIn, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/useAuth';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { ErrorBanner } from '../../components/ui/ErrorBanner';
import { WaitComponent } from '../../components/ui/WaitComponent';
import styles from './AuthPage.module.css';

const inputVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.3 + i * 0.08, duration: 0.35, ease: [0.4, 0, 0.2, 1] as const },
  }),
};

type FieldErrors = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  confirm: string;
};

const EMPTY_ERRORS: FieldErrors = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  confirm: '',
};

const validateEmail = (value: string): string => {
  if (!value.trim()) return 'El email es obligatorio';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Formato de email inválido';
  return '';
};

const validatePassword = (value: string): string => {
  if (!value) return 'La contraseña es obligatoria';
  if (value.length < 8) return 'Mínimo 8 caracteres';
  if (value.length > 15) return 'Máximo 15 caracteres';
  return '';
};

const validateFirstName = (value: string): string => {
  if (!value.trim()) return 'El nombre es obligatorio';
  if (value.trim().length < 2) return 'Mínimo 2 caracteres';
  return '';
};

const validateLastName = (value: string): string => {
  if (!value.trim()) return 'El apellido es obligatorio';
  if (value.trim().length < 2) return 'Mínimo 2 caracteres';
  return '';
};

const validateConfirm = (value: string, password: string): string => {
  if (!value) return 'Confirma tu contraseña';
  if (value !== password) return 'Las contraseñas no coinciden';
  return '';
};

export const AuthPage = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardHeight, setCardHeight] = useState<number | 'auto'>('auto');
  const [showLoader, setShowLoader] = useState(false);
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { login, register } = useAuth();

  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Register state
  const [regFirstName, setRegFirstName] = useState('');
  const [regLastName, setRegLastName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirm, setRegConfirm] = useState('');
  const [regError, setRegError] = useState('');
  const [regLoading, setRegLoading] = useState(false);

  // Per-field errors
  const [loginFieldErrors, setLoginFieldErrors] = useState<typeof EMPTY_ERRORS>(EMPTY_ERRORS);
  const [regFieldErrors, setRegFieldErrors] = useState<typeof EMPTY_ERRORS>(EMPTY_ERRORS);

  // Track which fields have been touched (blurred) for showing inline errors
  const [loginTouched, setLoginTouched] = useState<Record<string, boolean>>({});
  const [regTouched, setRegTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const front = frontRef.current;
    const back = backRef.current;
    if (!front || !back) return;

    const frontHeight = front.scrollHeight;
    const backHeight = back.scrollHeight;
    setCardHeight(Math.max(frontHeight, backHeight));
  }, [
    loginEmail, loginPassword, loginError, loginFieldErrors,
    regFirstName, regLastName, regEmail, regPassword, regConfirm, regError, regFieldErrors,
  ]);

  const handleFlip = useCallback(() => {
    setLoginError('');
    setLoginSuccess('');
    setRegError('');
    setLoginFieldErrors(EMPTY_ERRORS);
    setRegFieldErrors(EMPTY_ERRORS);
    setLoginTouched({});
    setRegTouched({});
    setIsFlipped((prev) => !prev);
  }, []);

  // --- Login field blur handlers ---
  const handleLoginEmailBlur = (e: FocusEvent<HTMLInputElement>) => {
    setLoginTouched((prev) => ({ ...prev, email: true }));
    setLoginFieldErrors((prev: typeof EMPTY_ERRORS) => ({ ...prev, email: validateEmail(e.target.value) }));
  };

  const handleLoginPasswordBlur = (e: FocusEvent<HTMLInputElement>) => {
    setLoginTouched((prev) => ({ ...prev, password: true }));
    setLoginFieldErrors((prev: typeof EMPTY_ERRORS) => ({ ...prev, password: validatePassword(e.target.value) }));
  };

  // --- Register field blur handlers ---
  const handleRegFirstNameBlur = (e: FocusEvent<HTMLInputElement>) => {
    setRegTouched((prev) => ({ ...prev, firstName: true }));
    setRegFieldErrors((prev: typeof EMPTY_ERRORS) => ({ ...prev, firstName: validateFirstName(e.target.value) }));
  };

  const handleRegLastNameBlur = (e: FocusEvent<HTMLInputElement>) => {
    setRegTouched((prev) => ({ ...prev, lastName: true }));
    setRegFieldErrors((prev: typeof EMPTY_ERRORS) => ({ ...prev, lastName: validateLastName(e.target.value) }));
  };

  const handleRegEmailBlur = (e: FocusEvent<HTMLInputElement>) => {
    setRegTouched((prev) => ({ ...prev, email: true }));
    setRegFieldErrors((prev: typeof EMPTY_ERRORS) => ({ ...prev, email: validateEmail(e.target.value) }));
  };

  const handleRegPasswordBlur = (e: FocusEvent<HTMLInputElement>) => {
    setRegTouched((prev) => ({ ...prev, password: true }));
    setRegFieldErrors((prev: typeof EMPTY_ERRORS) => ({ ...prev, password: validatePassword(e.target.value) }));
  };

  const handleRegConfirmBlur = (e: FocusEvent<HTMLInputElement>) => {
    setRegTouched((prev) => ({ ...prev, confirm: true }));
    setRegFieldErrors((prev: typeof EMPTY_ERRORS) => ({ ...prev, confirm: validateConfirm(e.target.value, regPassword) }));
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginSuccess('');

    // Validate all fields
    const emailErr = validateEmail(loginEmail);
    const passwordErr = validatePassword(loginPassword);
    setLoginFieldErrors({ email: emailErr, password: passwordErr, firstName: '', lastName: '', confirm: '' });
    setLoginTouched({ email: true, password: true });

    if (emailErr || passwordErr) return;

    setLoginLoading(true);
    const result = await login(loginEmail, loginPassword);
    setLoginLoading(false);
    if (result.success) {
      setShowLoader(true);
      setTimeout(() => navigate('/home'), 2000);
    } else {
      setLoginError(result.error ?? 'Error al iniciar sesión');
    }
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setRegError('');

    const firstNameErr = validateFirstName(regFirstName);
    const lastNameErr = validateLastName(regLastName);
    const emailErr = validateEmail(regEmail);
    const passwordErr = validatePassword(regPassword);
    const confirmErr = validateConfirm(regConfirm, regPassword);

    setRegFieldErrors({
      firstName: firstNameErr,
      lastName: lastNameErr,
      email: emailErr,
      password: passwordErr,
      confirm: confirmErr,
    });
    setRegTouched({ firstName: true, lastName: true, email: true, password: true, confirm: true });

    if (firstNameErr || lastNameErr || emailErr || passwordErr || confirmErr) return;

    setRegLoading(true);
    const result = await register(regFirstName.trim(), regLastName.trim(), regEmail, regPassword);
    setRegLoading(false);

    if (result.success) {
      setIsFlipped(false);
      setRegFirstName('');
      setRegLastName('');
      setRegEmail('');
      setRegPassword('');
      setRegConfirm('');
      setLoginError('');
      setLoginSuccess('Cuenta creada exitosamente. Ya puedes iniciar sesión.');
      setRegFieldErrors(EMPTY_ERRORS);
      setRegTouched({});
    } else {
      setRegError(result.error ?? 'Error al crear la cuenta');
    }
  };

  return (
    <div className={styles.page}>
      {showLoader && <WaitComponent />}
      <div className={styles.orbs}>
        <div className={`${styles.orb} ${styles.orb1}`} />
        <div className={`${styles.orb} ${styles.orb2}`} />
        <div className={`${styles.orb} ${styles.orb3}`} />
      </div>
      <div className={styles.particles} aria-hidden="true">
        {Array.from({ length: 15 }, (_, i) => (
          <div
            key={i}
            className={styles.particle}
            style={{
              '--x': `${10 + ((i * 6) % 80)}%`,
              '--size': `${2 + (i % 3)}px`,
              '--duration': `${15 + ((i * 3) % 20)}s`,
              '--delay': `${(i * 1.5) % 12}s`,
              '--drift': `${-15 + ((i * 7) % 30)}px`,
            } as React.CSSProperties}
          />
        ))}
      </div>
      <div className={styles.scene}>
        <div
          className={`${styles.card} ${isFlipped ? styles.flipped : ''}`}
          style={{ height: cardHeight }}
        >
          {/* === FACE: LOGIN === */}
          <div className={`${styles.face} ${styles.front}`} ref={frontRef}>
            <GlassPanel variant="modal" className={styles.panel}>
              <div className={styles.header}>
                <h1 className={styles.title}>Iniciar Sesión</h1>
                <p className={styles.subtitle}>Bienvenido de vuelta</p>
              </div>

              <form onSubmit={handleLogin} className={styles.form}>
                <motion.div custom={0} variants={inputVariants} initial="hidden" animate="visible">
                  <Input
                    label="Email"
                    type="email"
                    placeholder="tu@email.com"
                    value={loginEmail}
                    onChange={(e) => { setLoginEmail(e.target.value); setLoginSuccess(''); }}
                    onBlur={handleLoginEmailBlur}
                    error={loginTouched.email ? loginFieldErrors.email : undefined}
                    required
                  />
                </motion.div>
                <motion.div custom={1} variants={inputVariants} initial="hidden" animate="visible">
                  <Input
                    label="Contraseña"
                    type="password"
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => { setLoginPassword(e.target.value); setLoginSuccess(''); }}
                    onBlur={handleLoginPasswordBlur}
                    error={loginTouched.password ? loginFieldErrors.password : undefined}
                    required
                  />
                </motion.div>

                {loginSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ErrorBanner message={loginSuccess} variant="success" />
                  </motion.div>
                )}

                {loginError && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ErrorBanner message={loginError} />
                  </motion.div>
                )}

                <motion.div custom={2} variants={inputVariants} initial="hidden" animate="visible">
                  <Button
                    type="submit"
                    variant="glow"
                    size="lg"
                    isLoading={loginLoading}
                    leftIcon={<LogIn size={18} />}
                    className={styles.submitBtn}
                  >
                    Iniciar Sesión
                  </Button>
                </motion.div>
              </form>

              <motion.p
                className={styles.footer}
                custom={3}
                variants={inputVariants}
                initial="hidden"
                animate="visible"
              >
                ¿No tienes cuenta?{' '}
                <button type="button" onClick={handleFlip} className={styles.link}>
                  Regístrate
                </button>
              </motion.p>
            </GlassPanel>
          </div>

          {/* === FACE: REGISTER === */}
          <div className={`${styles.face} ${styles.back}`} ref={backRef}>
            <GlassPanel variant="modal" className={styles.panel}>
              <div className={styles.header}>
                <h1 className={styles.title}>Crear Cuenta</h1>
              </div>

              <form onSubmit={handleRegister} className={styles.form}>
                <div className={styles.nameRow}>
                  <motion.div custom={0} variants={inputVariants} initial="hidden" animate="visible">
                    <Input
                      label="Nombre"
                      type="text"
                      placeholder="Juan"
                      value={regFirstName}
                      onChange={(e) => setRegFirstName(e.target.value)}
                      onBlur={handleRegFirstNameBlur}
                      error={regTouched.firstName ? regFieldErrors.firstName : undefined}
                      required
                    />
                  </motion.div>
                  <motion.div custom={1} variants={inputVariants} initial="hidden" animate="visible">
                    <Input
                      label="Apellido"
                      type="text"
                      placeholder="Pérez"
                      value={regLastName}
                      onChange={(e) => setRegLastName(e.target.value)}
                      onBlur={handleRegLastNameBlur}
                      error={regTouched.lastName ? regFieldErrors.lastName : undefined}
                      required
                    />
                  </motion.div>
                </div>
                <motion.div custom={2} variants={inputVariants} initial="hidden" animate="visible">
                  <Input
                    label="Email"
                    type="email"
                    placeholder="tu@email.com"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    onBlur={handleRegEmailBlur}
                    error={regTouched.email ? regFieldErrors.email : undefined}
                    required
                  />
                </motion.div>
                <motion.div custom={3} variants={inputVariants} initial="hidden" animate="visible">
                  <Input
                    label="Contraseña"
                    type="password"
                    placeholder="••••••••"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    onBlur={handleRegPasswordBlur}
                    error={regTouched.password ? regFieldErrors.password : undefined}
                    hint="Entre 8 y 15 caracteres"
                    required
                  />
                </motion.div>
                <motion.div custom={4} variants={inputVariants} initial="hidden" animate="visible">
                  <Input
                    label="Confirmar Contraseña"
                    type="password"
                    placeholder="••••••••"
                    value={regConfirm}
                    onChange={(e) => setRegConfirm(e.target.value)}
                    onBlur={handleRegConfirmBlur}
                    error={regTouched.confirm ? regFieldErrors.confirm : undefined}
                    required
                  />
                </motion.div>

                {regError && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ErrorBanner message={regError} />
                  </motion.div>
                )}

                <motion.div custom={5} variants={inputVariants} initial="hidden" animate="visible">
                  <Button
                    type="submit"
                    variant="glow"
                    size="lg"
                    isLoading={regLoading}
                    leftIcon={<UserPlus size={18} />}
                    className={styles.submitBtn}
                  >
                    Crear Cuenta
                  </Button>
                </motion.div>
              </form>

              <motion.p
                className={styles.footer}
                custom={6}
                variants={inputVariants}
                initial="hidden"
                animate="visible"
              >
                ¿Ya tienes cuenta?{' '}
                <button type="button" onClick={handleFlip} className={styles.link}>
                  Inicia sesión
                </button>
              </motion.p>
            </GlassPanel>
          </div>
        </div>
      </div>
    </div>
  );
};
