export default function StatCard({ label, value, icon: Icon, color = 'cyan', subtitle }) {
  const colorMap = {
    cyan: 'from-cyan-500/20 to-cyan-500/5 text-cyan-400 border-cyan-500/30',
    purple: 'from-purple-500/20 to-purple-500/5 text-purple-400 border-purple-500/30',
    emerald: 'from-emerald-500/20 to-emerald-500/5 text-emerald-400 border-emerald-500/30',
  };

  const style = colorMap[color] || colorMap.cyan;

  return (
    <div className="glass-card p-6 rounded-2xl border border-white/10 relative overflow-hidden group">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</span>
        {Icon && (
          <div className={`p-2.5 rounded-xl bg-gradient-to-b border ${style}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
      <div className="text-3xl font-extrabold text-slate-100 tracking-tight mb-1 group-hover:scale-105 transition-transform origin-left">
        {value}
      </div>
      {subtitle && <p className="text-xs text-slate-400">{subtitle}</p>}
    </div>
  );
}
