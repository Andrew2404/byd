import './globals.css';
import { ThemeScript } from '@/components/ui/theme-script';

export const metadata = {
  title: 'BYD Georgia | GT Group',
  description: 'Premium bilingual BYD automotive website for Georgia built with Next.js, Tailwind CSS, and scalable configurator architecture.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ka" suppressHydrationWarning>
      <body>
        <ThemeScript />
        {children}
      </body>
    </html>
  );
}
