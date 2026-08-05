export function SkeletonCard() {
  return (
    <div className="glass-card p-5 rounded-xl border border-white/5 space-y-4">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full skeleton" />
        <div className="space-y-2 flex-1">
          <div className="h-4 w-1/2 skeleton" />
          <div className="h-3 w-3/4 skeleton" />
        </div>
      </div>
      <div className="h-3 w-full skeleton" />
      <div className="flex gap-2 pt-2">
        <div className="h-6 w-16 skeleton rounded-md" />
        <div className="h-6 w-24 skeleton rounded-md" />
      </div>
    </div>
  );
}

export function SkeletonProfile() {
  return (
    <div className="glass-card p-8 rounded-2xl border border-white/10 space-y-6">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="w-24 h-24 rounded-full skeleton" />
        <div className="space-y-3 text-center md:text-left flex-1">
          <div className="h-7 w-48 skeleton mx-auto md:mx-0" />
          <div className="h-4 w-64 skeleton mx-auto md:mx-0" />
          <div className="h-3 w-36 skeleton mx-auto md:mx-0" />
        </div>
      </div>
      <div className="h-20 w-full skeleton rounded-xl" />
    </div>
  );
}

export function SkeletonGraph() {
  return (
    <div className="glass-panel w-full h-[500px] rounded-2xl flex flex-col items-center justify-center gap-4">
      <div className="w-16 h-16 rounded-full border-2 border-cyan-500/30 border-t-cyan-400 animate-spin" />
      <p className="text-sm font-mono text-cyan-300">Traversing CognoDB Graph Engine...</p>
    </div>
  );
}
