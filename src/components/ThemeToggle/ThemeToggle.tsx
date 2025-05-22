'use client';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import styles from './ThemeToggle.module.css';

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className={styles.themeToggle}
      aria-label="Перемкнути тему"
    >
      <Sun className={`${styles.icon} ${styles.sunIcon}`} size={20} />
      <Moon className={`${styles.icon} ${styles.moonIcon}`} size={20} />
    </button>
  );
}
