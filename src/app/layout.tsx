import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClientLayout from './ClientLayout';
import ThemeToggle from '../components/ThemeToggle';
import { GoogleMapsProvider } from '../components/GoogleMapsProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Smart Task Manager',
  description: 'Assignment done by Ankit Singh',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
        <GoogleMapsProvider>
          <ClientLayout>
            <header className="bg-blue-600 text-white shadow-md">
              <nav className="container mx-auto flex justify-between items-center p-4">
                <div className="flex space-x-6">
                  <Link href="/" className="text-xl font-semibold hover:text-blue-300 transition-colors">
                    Home
                  </Link>
                  <Link href="/dashboard" className="text-xl font-semibold hover:text-blue-300 transition-colors">
                    Dashboard
                  </Link>
                  <Link href="/tasklist" className="text-xl font-semibold hover:text-blue-300 transition-colors">
                    Task List
                  </Link>
                </div>
                <ThemeToggle />
              </nav>
            </header>
            <main className="container mx-auto p-6">
              {children}
            </main>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </ClientLayout>
        </GoogleMapsProvider>
      </body>
    </html>
  );
}
