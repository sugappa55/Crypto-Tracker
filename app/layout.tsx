import { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import ThemeClientProvider from '@/providers/ThemeClient';
import Alert from '@/components/Alert';
import UserContext from '@/providers/UserContext';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '700'], // Load specific weights
  display: 'swap' // Optional: Use "swap" to improve loading performance
});

export const metadata: Metadata = {
  title: 'Crypto tracker',
  description: 'A website to track the crypto coins'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={`${montserrat.className}`}>
        <ThemeClientProvider>
          <UserContext>
            <Header />
            {children}
            <Alert />
          </UserContext>
        </ThemeClientProvider>
      </body>
    </html>
  );
}
