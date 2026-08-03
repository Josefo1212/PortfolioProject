import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
  type ReactNode,
  type RefObject,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import styles from './Accordion.module.css';

// === CONTEXT ===

interface AccordionContextValue {
  isOpen: (value: string) => boolean;
  toggleItem: (value: string) => void;
  registerTrigger: (value: string, el: HTMLButtonElement | null) => void;
  triggerRefs: RefObject<Map<string, HTMLButtonElement>>;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

function useAccordionContext() {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error('Accordion compound components must be used within <Accordion>');
  return ctx;
}

const ItemContext = createContext<string | null>(null);

function useItemValue() {
  const value = useContext(ItemContext);
  if (value === null) throw new Error('AccordionItem parts must be used within <AccordionItem>');
  return value;
}

// === ACCORDION (Container) ===

interface AccordionProps {
  children: ReactNode;
  defaultValue?: string | string[];
  multiple?: boolean;
  className?: string;
}

export const Accordion = ({
  children,
  defaultValue = [],
  multiple = false,
  className = '',
}: AccordionProps) => {
  const initial = Array.isArray(defaultValue) ? defaultValue : [defaultValue];
  const [openItems, setOpenItems] = useState<string[]>(initial);
  const triggerRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const isOpen = useCallback((value: string) => openItems.includes(value), [openItems]);

  const toggleItem = useCallback(
    (value: string) => {
      setOpenItems((prev) => {
        if (prev.includes(value)) return prev.filter((v) => v !== value);
        return multiple ? [...prev, value] : [value];
      });
    },
    [multiple]
  );

  const registerTrigger = useCallback((value: string, el: HTMLButtonElement | null) => {
    if (el) triggerRefs.current.set(value, el);
    else triggerRefs.current.delete(value);
  }, []);

  return (
    <AccordionContext.Provider value={{ isOpen, toggleItem, registerTrigger, triggerRefs }}>
      <div className={`${styles.accordion} ${className}`}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

// === ACCORDION ITEM ===

interface AccordionItemProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export const AccordionItem = ({ value, children, className = '' }: AccordionItemProps) => {
  const { isOpen } = useAccordionContext();
  const open = isOpen(value);

  return (
    <ItemContext.Provider value={value}>
      <div className={`${styles.item} ${open ? styles.itemOpen : ''} ${className}`}>
        {children}
      </div>
    </ItemContext.Provider>
  );
};

// === ACCORDION TRIGGER ===

interface AccordionTriggerProps {
  children: ReactNode;
  className?: string;
}

export const AccordionTrigger = ({ children, className = '' }: AccordionTriggerProps) => {
  const { isOpen, toggleItem, registerTrigger, triggerRefs } = useAccordionContext();
  const value = useItemValue();
  const open = isOpen(value);
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    registerTrigger(value, ref.current);
    return () => registerTrigger(value, null);
  }, [value, registerTrigger]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    const keys = Array.from(triggerRefs.current.keys());
    const index = keys.indexOf(value);

    let next: string | undefined;
    if (e.key === 'ArrowDown') next = keys[(index + 1) % keys.length];
    else if (e.key === 'ArrowUp') next = keys[(index - 1 + keys.length) % keys.length];
    else if (e.key === 'Home') next = keys[0];
    else if (e.key === 'End') next = keys[keys.length - 1];
    else return;

    e.preventDefault();
    triggerRefs.current.get(next as string)?.focus();
  };

  return (
    <button
      ref={ref}
      type="button"
      id={`accordion-trigger-${value}`}
      aria-expanded={open}
      aria-controls={`accordion-content-${value}`}
      className={`${styles.trigger} ${open ? styles.triggerOpen : ''} ${className}`}
      onClick={() => toggleItem(value)}
      onKeyDown={handleKeyDown}
    >
      <span className={styles.triggerLabel}>{children}</span>
      <ChevronDown size={16} className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`} />
    </button>
  );
};

// === ACCORDION CONTENT ===

interface AccordionContentProps {
  children: ReactNode;
  className?: string;
}

export const AccordionContent = ({ children, className = '' }: AccordionContentProps) => {
  const { isOpen } = useAccordionContext();
  const value = useItemValue();
  const open = isOpen(value);

  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          key={value}
          id={`accordion-content-${value}`}
          role="region"
          aria-labelledby={`accordion-trigger-${value}`}
          className={`${styles.content} ${className}`}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className={styles.contentInner}>{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
