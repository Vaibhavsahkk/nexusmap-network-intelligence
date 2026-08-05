'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, Search, GitFork, User, ShieldCheck } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Network Graph', path: '/', icon: Sparkles },
    { label: 'Search', path: '/search', icon: Search },
    { label: 'Warm Intro Path', path: '/path', icon: GitFork },
  ];

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-[#D4AF37]/15 px-8 py-5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-4 group">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#1A1815] to-[#3D3528] flex items-center justify-center border border-[#D4AF37]/40 shadow-lg shadow-[#D4AF37]/10 group-hover:scale-105 transition-transform duration-300">
            <Sparkles className="w-5 h-5 text-[#E5C158]" />
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-2.5">
              <span className="text-xl font-bold tracking-tight text-[#1A1815]">
                Nexus<span className="font-serif-title text-[#C59B27] font-normal">Map</span>
              </span>
              <span className="hidden sm:inline-block px-2.5 py-1 text-[10px] uppercase font-mono tracking-[0.15em] bg-[#D4AF37]/10 text-[#C59B27] border border-[#D4AF37]/30 rounded-full font-semibold">
                CognoDB 2.0
              </span>
            </div>
            <span className="text-[10px] text-[#8C847A] tracking-[0.12em] uppercase font-medium">Graph Network Intelligence</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-1.5 bg-[#F3EFE6]/80 p-1.5 rounded-2xl border border-[#D4AF37]/15">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-semibold tracking-wide transition-all duration-200 ${
                  isActive
                    ? 'bg-[#1A1815] text-[#E5C158] shadow-md shadow-[#1A1815]/20 border border-[#D4AF37]/40'
                    : 'text-[#5A544A] hover:text-[#1A1815] hover:bg-white/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#E5C158]' : 'text-[#8C847A]'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Profile Badge */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/80 border border-[#D4AF37]/25 text-[13px] font-medium text-[#5A544A] shadow-sm">
            <ShieldCheck className="w-4 h-4 text-[#0D8A58]" />
            <span className="tracking-wide">CognoDB Active</span>
          </div>
          <Link
            href="/person/root-user-id"
            className="w-11 h-11 rounded-full bg-[#1A1815] border-2 border-[#D4AF37]/50 flex items-center justify-center hover:border-[#E5C158] transition-colors duration-200 shadow-md shadow-[#1A1815]/10"
            title="View Your Node Profile"
          >
            <User className="w-4.5 h-4.5 text-[#E5C158]" />
          </Link>
        </div>
      </div>
    </header>
  );
}
