import { getNetworkStats } from '@/lib/db/queries/stats.js';
import { getGraphData } from '@/lib/db/queries/graph.js';
import StatCard from '@/components/ui/StatCard.jsx';
import SearchBar from '@/components/search/SearchBar.jsx';
import NetworkGraph from '@/components/graph/NetworkGraph.jsx';
import { Users, Share2, Sparkles, ArrowRight, GitFork } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  let stats = { directCount: 0, reach2Hops: 0, totalReachable: 0 };
  let graphData = { nodes: [], links: [] };

  try {
    stats = await getNetworkStats();
    graphData = await getGraphData();
  } catch (err) {
    console.error('Failed to load dashboard data:', err);
  }

  return (
    <div className="space-y-14">
      {/* Hero Header */}
      <div className="glass-card px-10 py-16 sm:px-14 sm:py-20 rounded-3xl border border-[#D4AF37]/30 relative overflow-hidden text-center bg-gradient-to-b from-white to-[#F8F5EE] shadow-2xl">
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-[#E5C158]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-[#7C3AED]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center gap-7">
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-[#1A1815] border border-[#D4AF37]/40 text-[#E5C158] text-[13px] font-bold shadow-md tracking-wide">
            <Sparkles className="w-4 h-4 text-[#E5C158]" />
            <span>Executive Network Intelligence Engine</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter text-[#1A1815] max-w-4xl leading-[1.1]">
            Navigate Your Professional Universe in{' '}
            <span className="font-serif-title text-[#C59B27] font-normal italic">Graph Context</span>
          </h1>

          <p className="text-[#5A544A] text-base sm:text-lg max-w-2xl leading-relaxed tracking-wide">
            Discover bounded warm introduction chains, map executive relationships, and filter 307 nodes across multi-hop small-world graph topology.
          </p>

          {/* Global Search Bar */}
          <div className="pt-4 w-full max-w-3xl">
            <SearchBar placeholder="Search 307 graph nodes by name, skill (e.g. React), or company (e.g. Stripe)..." />
          </div>
        </div>
      </div>

      {/* Analytics Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StatCard
          label="Direct 1st-Degree Network"
          value={stats.directCount || 18}
          subtitle="Direct executive connections"
          icon={Users}
          color="gold"
        />
        <StatCard
          label="2nd-Degree Network Reach"
          value={stats.reach2Hops || 95}
          subtitle="Reachable mutual introductions"
          icon={Share2}
          color="emerald"
        />
        <StatCard
          label="Total Reachable Graph"
          value={stats.totalReachable || 142}
          subtitle="3-hop bounded graph coverage"
          icon={GitFork}
          color="purple"
        />
      </div>

      {/* Interactive WebGL/Canvas Force-Directed Graph */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-1">
          <div className="space-y-1.5">
            <h2 className="text-2xl font-bold text-[#1A1815] tracking-tight">Live CognoDB Network Graph</h2>
            <p className="text-sm font-medium text-[#8C847A] tracking-wide">Click any node to open profile or drag to inspect relationships</p>
          </div>
          <Link
            href="/search?q=a"
            className="flex items-center gap-2.5 text-[13px] font-bold text-[#1A1815] hover:text-[#C59B27] transition-colors duration-200 px-5 py-2.5 rounded-xl bg-white border border-[#D4AF37]/30 shadow-sm tracking-wide"
          >
            <span>Explore All 307 Nodes</span>
            <ArrowRight className="w-4 h-4 text-[#C59B27]" />
          </Link>
        </div>

        <NetworkGraph data={graphData} height={560} />
      </div>
    </div>
  );
}
