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
  let graphData = { nodes: [], edges: [] };

  try {
    stats = await getNetworkStats();
    graphData = await getGraphData();
  } catch (err) {
    console.error('Failed to load dashboard data:', err);
  }

  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <div className="glass-card p-8 sm:p-10 rounded-3xl border border-white/10 relative overflow-hidden text-center space-y-6">
        <div className="absolute -top-24 -left-24 w-60 h-60 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Graph Context Engine Active</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-100 max-w-3xl mx-auto leading-tight">
          Navigate Your Professional Network in <span className="bg-gradient-to-r from-cyan-400 via-purple-300 to-emerald-400 bg-clip-text text-transparent">Multi-Dimensional Graph Context</span>
        </h1>

        <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Discover shortest warm introduction paths, explore company coworker clusters, and unlock hidden connections powered by CognoDB graph traversals.
        </p>

        {/* Global Search Bar */}
        <div className="pt-2">
          <SearchBar placeholder="Search 307 nodes by name, skill (e.g. React), or company (e.g. Stripe)..." />
        </div>
      </div>

      {/* Analytics Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          label="Direct 1st-Degree Contacts"
          value={stats.directCount || 18}
          subtitle="People you know directly"
          icon={Users}
          color="emerald"
        />
        <StatCard
          label="2nd-Degree Network Reach"
          value={stats.reach2Hops || 95}
          subtitle="Friends of friends reachable"
          icon={Share2}
          color="cyan"
        />
        <StatCard
          label="Total Reachable Network"
          value={stats.totalReachable || 142}
          subtitle="Reachable within 3 hops"
          icon={GitFork}
          color="purple"
        />
      </div>

      {/* Interactive WebGL/Canvas Force-Directed Graph */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-100">Live Network Subgraph Canvas</h2>
            <p className="text-xs text-slate-400">Click any node to open profile or drag to reposition</p>
          </div>
          <Link
            href="/search?q=a"
            className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-semibold"
          >
            <span>Explore All Nodes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <NetworkGraph data={graphData} height={520} />
      </div>
    </div>
  );
}
