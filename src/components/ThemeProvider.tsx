'use client';

import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useEffect } from 'react';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  useEffect(() => {
    const classList = document.documentElement.classList;
    if (darkMode) {
      classList.add('dark');
    } else {
      classList.remove('dark');
    }
  }, [darkMode]);

  return <>{children}</>;
}
