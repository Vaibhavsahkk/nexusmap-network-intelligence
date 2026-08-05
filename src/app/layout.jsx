import './globals.css';
import Navbar from '@/components/ui/Navbar.jsx';
import ErrorBoundary from '@/components/ui/ErrorBoundary.jsx';

export const metadata = {
  title: 'NexusMap — Professional Network Intelligence',
  description:
    'Discover warm introduction paths, explore company networks, and navigate your professional relationships with CognoDB graph intelligence.',
  keywords: ['Graph Database', 'CognoDB', 'Network Intelligence', 'Warm Introduction Path', 'Next.js 15'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0b0f19] text-slate-100 min-h-screen flex flex-col antialiased">
        <Navbar />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <ErrorBoundary>{children}</ErrorBoundary>
        </main>
        <footer className="border-t border-white/10 py-6 mt-12 text-center text-xs text-slate-500">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 px-6">
            <p>© 2026 NexusMap Graph Intelligence. Built for Wexa AI Assessment.</p>
            <div className="flex items-center gap-4 text-slate-400">
              <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono">
                CognoDB Managed Graph
              </span>
              <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 font-mono">
                Next.js 15 App Router
              </span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
