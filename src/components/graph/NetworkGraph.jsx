'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { SkeletonGraph } from '../ui/Skeleton';

// Dynamic import with ssr: false to avoid canvas hydration issues
const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), {
  ssr: false,
  loading: () => <SkeletonGraph />,
});

export default function NetworkGraph({ data, height = 520 }) {
  const [mounted, setMounted] = useState(false);
  const graphRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !data || !data.nodes || data.nodes.length === 0) {
    return <SkeletonGraph />;
  }

  const graphPayload = {
    nodes: data.nodes || [],
    links: data.links || data.edges || [],
  };

  const handleNodeClick = (node) => {
    if (node && node.id) {
      router.push(`/person/${node.id}`);
    }
  };

  return (
    <div className="glass-panel w-full rounded-2xl overflow-hidden border border-white/10 relative shadow-2xl">
      <div className="absolute top-4 left-4 z-10 bg-slate-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10 text-xs text-slate-300 flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
        <span>Interactive Network Canvas ({graphPayload.nodes.length} Nodes)</span>
      </div>

      <ForceGraph2D
        ref={graphRef}
        graphData={graphPayload}
        height={height}
        backgroundColor="#0b0f19"
        nodeRelSize={6}
        nodeVal={(node) => (node.isRoot ? 12 : 6)}
        nodeColor={(node) =>
          node.isRoot ? '#00d2ff' : node.id.includes('person') ? '#8b5cf6' : '#10b981'
        }
        nodeCanvasObject={(node, ctx, globalScale) => {
          const label = node.name || node.id;
          const fontSize = Math.max(10 / globalScale, 3);
          const radius = node.isRoot ? 8 : 5;

          // Draw Glowing Circle Node
          ctx.beginPath();
          ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false);
          ctx.fillStyle = node.isRoot ? '#00d2ff' : '#8b5cf6';
          ctx.shadowColor = node.isRoot ? '#00d2ff' : '#8b5cf6';
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.shadowBlur = 0; // reset

          // Draw Label Text below node if zoomed in
          if (globalScale > 0.8) {
            ctx.font = `${fontSize}px Inter, sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = '#f8fafc';
            ctx.fillText(label, node.x, node.y + radius + 8 / globalScale);
          }
        }}
        linkColor={() => 'rgba(255, 255, 255, 0.15)'}
        linkWidth={1.5}
        linkDirectionalParticles={2}
        linkDirectionalParticleWidth={2}
        linkDirectionalParticleSpeed={0.005}
        onNodeClick={handleNodeClick}
        enableNodeDrag={true}
        enableZoom={true}
      />
    </div>
  );
}
