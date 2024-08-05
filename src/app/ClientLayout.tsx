'use client';

import { Provider } from 'react-redux';
import store from '../redux/store';
import ThemeProvider from '../components/ThemeProvider';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </Provider>
  );
}


