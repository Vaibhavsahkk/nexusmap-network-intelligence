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
        <main className="flex-1 max-w-7xl w-full mx-auto px-6 sm:px-8 lg:px-10 pt-8 pb-16">
          <ErrorBoundary>{children}</ErrorBoundary>
        </main>
        <footer className="border-t border-[#D4AF37]/15 py-10 mt-20 text-center text-[13px] text-[#8C847A] bg-white/50 backdrop-blur-lg">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5 px-8">
            <p className="tracking-wide">© 2026 NexusMap Executive Graph Intelligence.</p>
            <div className="flex items-center gap-3">
              <span className="px-4 py-1.5 rounded-full bg-[#1A1815] text-[#E5C158] border border-[#D4AF37]/30 font-mono font-bold text-[11px] tracking-wider">
                CognoDB Cloud Engine
              </span>
              <span className="px-4 py-1.5 rounded-full bg-[#F3EFE6] text-[#5A544A] border border-[#D4AF37]/20 font-mono font-semibold text-[11px] tracking-wider">
                Next.js 15 App Router
              </span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
