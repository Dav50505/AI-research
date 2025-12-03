import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'AI Dev Radar - Track the Latest in AI Coding, ML Learning & AI Models',
  description: 'Stay up to date with the latest AI coding tools, machine learning resources, and AI model releases. Updated every 2 hours.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col">
          <header className="border-b">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <Link href="/" className="text-xl font-bold">
                  🔍 AI Dev Radar
                </Link>
                <div className="flex gap-6">
                  <Link
                    href="/"
                    className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    Home
                  </Link>
                  <Link
                    href="/latest"
                    className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    Latest Updates
                  </Link>
                  <Link
                    href="/chat"
                    className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    Ask AI
                  </Link>
                </div>
              </div>
            </nav>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="border-t mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                AI Dev Radar • Tracking AI coding tools, ML resources, and AI models • Updated every 2 hours
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}


