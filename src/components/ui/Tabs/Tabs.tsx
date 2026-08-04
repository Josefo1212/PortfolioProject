import { createContext, useContext, useState, useCallback, useRef, useEffect, type ReactNode, type RefObject } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Tabs.module.css';

// === CONTEXT ===

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (value: string) => void;
  registerTab: (value: string, el: HTMLButtonElement | null) => void;
  tabRefs: RefObject<Map<string, HTMLButtonElement>>;
}

const TabsContext = createContext<TabsContextValue | null>(null);

const useTabsContext = () => {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('Tabs compound components must be used within <Tabs>');
  return ctx;
};

// === TABS (Container) ===

interface TabsProps {
  children: ReactNode;
  defaultValue: string;
  className?: string;
}

export const Tabs = ({ children, defaultValue, className = '' }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultValue);
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const registerTab = useCallback((value: string, el: HTMLButtonElement | null) => {
    if (el) tabRefs.current.set(value, el);
    else tabRefs.current.delete(value);
  }, []);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab, registerTab, tabRefs }}>
      <div className={`${styles.tabs} ${className}`}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

// === TAB LIST ===

interface TabListProps {
  children: ReactNode;
  className?: string;
}

export const TabList = ({ children, className = '' }: TabListProps) => {
  const { activeTab, setActiveTab, tabRefs } = useTabsContext();
  const indicatorRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const activeEl = tabRefs.current.get(activeTab);
    const container = containerRef.current;
    if (!activeEl || !container) return;

    const containerRect = container.getBoundingClientRect();
    const tabRect = activeEl.getBoundingClientRect();

    indicatorRef.current?.style.setProperty('--indicator-left', `${tabRect.left - containerRect.left}px`);
    indicatorRef.current?.style.setProperty('--indicator-width', `${tabRect.width}px`);
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const tabs = Array.from(tabRefs.current.keys());
    const currentIndex = tabs.indexOf(activeTab);

    let nextIndex: number;
    if (e.key === 'ArrowRight') nextIndex = (currentIndex + 1) % tabs.length;
    else if (e.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    else if (e.key === 'Home') nextIndex = 0;
    else if (e.key === 'End') nextIndex = tabs.length - 1;
    else return;

    e.preventDefault();
    const nextTab = tabs[nextIndex];
    setActiveTab(nextTab);
    tabRefs.current.get(nextTab)?.focus();
  };

  return (
    <div
      ref={containerRef}
      className={`${styles.tabList} ${className}`}
      role="tablist"
      onKeyDown={handleKeyDown}
    >
      {children}
      <div ref={indicatorRef} className={styles.indicator} aria-hidden="true" />
    </div>
  );
};

// === TAB ===

interface TabProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export const Tab = ({ value, children, className = '' }: TabProps) => {
  const { activeTab, setActiveTab, registerTab } = useTabsContext();
  const ref = useRef<HTMLButtonElement>(null);
  const isActive = activeTab === value;

  useEffect(() => {
    registerTab(value, ref.current);
    return () => registerTab(value, null);
  }, [value, registerTab]);

  return (
    <button
      ref={ref}
      role="tab"
      id={`tab-${value}`}
      aria-selected={isActive}
      aria-controls={`tabpanel-${value}`}
      tabIndex={isActive ? 0 : -1}
      className={`${styles.tab} ${isActive ? styles.active : ''} ${className}`}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  );
};

// === TAB PANEL ===

interface TabPanelProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export const TabPanel = ({ value, children, className = '' }: TabPanelProps) => {
  const { activeTab } = useTabsContext();

  return (
    <AnimatePresence mode="wait">
      {activeTab === value && (
        <motion.div
          key={value}
          role="tabpanel"
          id={`tabpanel-${value}`}
          aria-labelledby={`tab-${value}`}
          className={`${styles.tabPanel} ${className}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
