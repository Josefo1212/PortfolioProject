import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import styles from './TypeWriter.module.css';

interface TypeWriterProps {
  words: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseAfterType?: number;
  pauseAfterDelete?: number;
  className?: string;
}

export const TypeWriter = ({
  words,
  typeSpeed = 70,
  deleteSpeed = 40,
  pauseAfterType = 1600,
  pauseAfterDelete = 300,
  className = '',
}: TypeWriterProps) => {
  const prefersReducedMotion = useReducedMotion();
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const current = words[wordIndex % words.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting) {
      if (text.length < current.length) {
        timeout = setTimeout(
          () => setText(current.slice(0, text.length + 1)),
          typeSpeed
        );
      } else {
        timeout = setTimeout(() => setDeleting(true), pauseAfterType);
      }
    } else if (text.length > 0) {
      timeout = setTimeout(
        () => setText(current.slice(0, text.length - 1)),
        deleteSpeed
      );
    } else {
      timeout = setTimeout(() => {
        setDeleting(false);
        setWordIndex((i) => (i + 1) % words.length);
      }, pauseAfterDelete);
    }

    return () => clearTimeout(timeout);
  }, [
    text,
    deleting,
    wordIndex,
    words,
    typeSpeed,
    deleteSpeed,
    pauseAfterType,
    pauseAfterDelete,
    prefersReducedMotion,
  ]);

  const displayed = prefersReducedMotion ? (words[0] ?? '') : text;

  return (
    <span className={`${styles.typewriter} ${className}`}>
      <span className={styles.text}>{displayed}</span>
      <span className={styles.caret} aria-hidden="true">
        |
      </span>
    </span>
  );
};
