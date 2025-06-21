import { useEffect, useState } from 'react';

const useDarkMode = () => {
  const [theme, setTheme] = useState(null);

  // Set theme based on localStorage or system preference on first mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const storedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const initialTheme = storedTheme || (systemPrefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
  }, []);

  // Apply theme to <html> and listen for system changes
  useEffect(() => {
    if (!theme) return;

    const root = document.documentElement;
    const oppositeTheme = theme === 'dark' ? 'light' : 'dark';

    root.classList.remove(oppositeTheme);
    root.classList.add(theme);
    localStorage.setItem('theme', theme);

    const colorScheme = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e) => {
      const newTheme = e.matches ? 'dark' : 'light';
      setTheme(newTheme);
      localStorage.setItem('theme', newTheme);
    };

    colorScheme.addEventListener('change', handleChange);

    return () => {
      colorScheme.removeEventListener('change', handleChange);
    };
  }, [theme]);

  return [theme, setTheme];
};

function modeBackground(theme) {
  return theme === 'light' ? 'bg-white' : 'bg-gray-800';
}

function modeBackgroundTrueBlack(theme) {
  return theme === 'light' ? 'bg-white' : 'bg-black';
}

function modeBackdrop(theme) {
  return theme === 'light' ? 'light' : 'dark';
}

export { useDarkMode, modeBackground, modeBackdrop, modeBackgroundTrueBlack };
