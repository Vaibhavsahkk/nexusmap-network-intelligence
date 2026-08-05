export function SkeletonCard() {
  return (
    <div className="glass-card p-6 rounded-2xl border border-[#D4AF37]/20 space-y-4 bg-white/80">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full skeleton" />
        <div className="space-y-2 flex-1">
          <div className="h-4 w-1/2 skeleton" />
          <div className="h-3 w-3/4 skeleton" />
        </div>
      </div>
      <div className="h-3 w-full skeleton" />
      <div className="flex gap-2 pt-2">
        <div className="h-7 w-20 skeleton rounded-lg" />
        <div className="h-7 w-28 skeleton rounded-lg" />
      </div>
    </div>
  );
}

export function SkeletonProfile() {
  return (
    <div className="glass-card p-8 rounded-3xl border border-[#D4AF37]/30 space-y-6 bg-white/90">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="w-24 h-24 rounded-full skeleton" />
        <div className="space-y-3 text-center md:text-left flex-1">
          <div className="h-7 w-48 skeleton mx-auto md:mx-0" />
          <div className="h-4 w-64 skeleton mx-auto md:mx-0" />
          <div className="h-3 w-36 skeleton mx-auto md:mx-0" />
        </div>
      </div>
      <div className="h-20 w-full skeleton rounded-2xl" />
    </div>
  );
}

export function SkeletonGraph() {
  return (
    <div className="glass-panel w-full h-[540px] rounded-3xl flex flex-col items-center justify-center gap-4 bg-[#FAF7F2] border border-[#D4AF37]/30">
      <div className="w-12 h-12 rounded-full border-2 border-[#D4AF37]/30 border-t-[#C59B27] animate-spin" />
      <p className="text-xs font-mono font-bold text-[#1A1815]">Traversing CognoDB Cloud Graph Engine...</p>
    </div>
  );
}
