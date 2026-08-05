'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { SkeletonGraph } from '../ui/Skeleton';

// Dynamic import with ssr: false to avoid canvas hydration issues
const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), {
  ssr: false,
  loading: () => <SkeletonGraph />,
});

export default function NetworkGraph({ data, height = 540 }) {
  const [mounted, setMounted] = useState(false);
  const graphRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Safely construct & sanitize graph payload for d3-force
  const graphPayload = useMemo(() => {
    if (!data || !data.nodes || !Array.isArray(data.nodes)) {
      return { nodes: [], links: [] };
    }

    const nodes = data.nodes.map((n) => ({ ...n }));
    const nodeIds = new Set(nodes.map((n) => n.id));

    const rawLinks = data.links || data.edges || [];
    const links = rawLinks
      .filter((l) => {
        const sourceId = typeof l.source === 'object' ? l.source?.id : l.source;
        const targetId = typeof l.target === 'object' ? l.target?.id : l.target;
        return nodeIds.has(sourceId) && nodeIds.has(targetId);
      })
      .map((l) => ({ ...l }));

    return { nodes, links };
  }, [data]);

  if (!mounted || graphPayload.nodes.length === 0) {
    return <SkeletonGraph />;
  }

  const handleNodeClick = (node) => {
    if (node && node.id) {
      router.push(`/person/${node.id}`);
    }
  };

  return (
    <div className="glass-panel w-full rounded-3xl overflow-hidden border border-[#D4AF37]/30 relative shadow-2xl bg-[#FAF7F2]">
      <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-[#D4AF37]/30 text-xs font-semibold text-[#1A1815] flex items-center gap-2.5 shadow-md">
        <span className="w-2.5 h-2.5 rounded-full bg-[#C59B27] animate-pulse" />
        <span>Interactive CognoDB Network Canvas ({graphPayload.nodes.length} Nodes)</span>
      </div>

      <ForceGraph2D
        ref={graphRef}
        graphData={graphPayload}
        height={height}
        backgroundColor="#FAF7F2"
        nodeRelSize={6}
        nodeVal={(node) => (node.isRoot ? 12 : 6)}
        nodeColor={(node) =>
          node.isRoot ? '#1A1815' : node.id?.includes('person') ? '#C59B27' : '#0D8A58'
        }
        nodeCanvasObject={(node, ctx, globalScale) => {
          const label = node.name || node.id;
          const fontSize = Math.max(10 / globalScale, 3.5);
          const radius = node.isRoot ? 9 : 5.5;

          // Draw Glowing Champagne Gold Circle Node
          ctx.beginPath();
          ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false);
          ctx.fillStyle = node.isRoot ? '#1A1815' : '#C59B27';
          ctx.shadowColor = node.isRoot ? '#D4AF37' : '#C59B27';
          ctx.shadowBlur = node.isRoot ? 14 : 8;
          ctx.fill();
          ctx.shadowBlur = 0; // reset

          // Inner Golden Dot for Root User
          if (node.isRoot) {
            ctx.beginPath();
            ctx.arc(node.x, node.y, 3, 0, 2 * Math.PI, false);
            ctx.fillStyle = '#E5C158';
            ctx.fill();
          }

          // Draw Label Text below node if zoomed in
          if (globalScale > 0.8 && label) {
            ctx.font = `600 ${fontSize}px "Plus Jakarta Sans", sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = '#1A1815';
            ctx.fillText(label, node.x, node.y + radius + 9 / globalScale);
          }
        }}
        linkColor={() => 'rgba(197, 155, 39, 0.25)'}
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
