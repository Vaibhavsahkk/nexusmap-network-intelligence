import './globals.css';
import Navbar from '@/components/ui/Navbar.jsx';
import ErrorBoundary from '@/components/ui/ErrorBoundary.jsx';

export const metadata = {
  title: 'NexusMap Executive Network Intelligence',
  description:
    'Discover warm introduction paths, explore executive company networks, and navigate multi-dimensional relationships powered by CognoDB graph intelligence.',
  keywords: ['Graph Database', 'CognoDB', 'Network Intelligence', 'Warm Introduction Path', 'Next.js 15'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#FAF7F2] text-[#1A1815] min-h-screen flex flex-col antialiased selection:bg-[#E5C158]/30 selection:text-[#1A1815]">
        <Navbar />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <ErrorBoundary>{children}</ErrorBoundary>
        </main>
        <footer className="border-t border-[#D4AF37]/20 py-8 mt-16 text-center text-xs text-[#8C847A] bg-white/60 backdrop-blur-md">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 px-6">
            <p>© 2026 NexusMap Executive Graph Intelligence.</p>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-[#1A1815] text-[#E5C158] border border-[#D4AF37]/30 font-mono font-bold text-[11px]">
                CognoDB Cloud Engine
              </span>
              <span className="px-3 py-1 rounded-full bg-[#F3EFE6] text-[#5A544A] border border-[#D4AF37]/20 font-mono font-semibold text-[11px]">
                Next.js 15 App Router
              </span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
