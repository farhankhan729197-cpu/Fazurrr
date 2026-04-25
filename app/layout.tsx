import type {Metadata} from 'next';
import './globals.css';
import { AuthProvider } from '@/components/AuthProvider';
import { Inter, Space_Grotesk } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
});

export const metadata: Metadata = {
  title: 'FAZUR - Premium Digital Services',
  description: 'Elite digital services by FAZUR. Website development, Amazon Seller Services, Graphic Design, and more.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${spaceGrotesk.variable}`}>
      <body suppressHydrationWarning className="bg-black text-white min-h-screen font-sans">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
