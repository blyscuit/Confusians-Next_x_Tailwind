import { useEffect, useState } from 'react'

const useDarkMode = () => {
    const [theme, setTheme] = useState(null);
    const colorTheme = theme === "dark" ? "dark" : "light";

  useEffect(() => {

    const root = window.document.documentElement;

    root.classList.remove(colorTheme);
    root.classList.add(theme);

    const colorScheme = window.matchMedia('(prefers-color-scheme: dark)')
    const isDarkMode = colorScheme.matches

    if (isDarkMode) {
        setTheme('dark')
    } else {
        setTheme('light')
    }

    colorScheme.onchange = e => {
      if (e.matches) {
        setTheme('dark')
        localStorage.setItem("theme", 'dark');
      } else {
        setTheme('light')
        localStorage.setItem("theme", 'light');
      }
    }
    
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
    }
    return (() => colorScheme.onchange = null)
  }, [theme])

  return [theme, setTheme]
}

function modeBackground(theme) {
    return theme === 'light' ? 'bg-white' : 'bg-gray-800'
}

function modeBackgroundTrueBlack(theme) {
    return theme === 'light' ? 'bg-white' : 'bg-black'
}

function modeBackdrop(theme) {
    return theme === 'light' ? 'light' : 'dark'
}

export { useDarkMode, modeBackground, modeBackdrop, modeBackgroundTrueBlack }
