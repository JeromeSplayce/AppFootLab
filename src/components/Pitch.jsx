import PitchSvg from './PitchSvg';
import { EQUIPMENT_TYPES } from './Equipment';

export default function Pitch({
  positions = [],
  pitchType = 'full',
  showLabels = true,
}) {
  return (
    <div className="relative w-full aspect-[16/10] bg-[#0b1f1c] rounded-2xl border border-emerald-900/50 p-4 overflow-hidden flex items-center justify-center">
      <PitchSvg pitchType={pitchType} />

      {/* Calque des flèches en lecture seule */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <marker
            id="arrow-head-read"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="4"
            markerHeight="4"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
          </marker>
        </defs>

        {positions
          .filter((p) => p.kind === 'arrow')
          .map((arrow) => {
            const controlX =
              arrow.controlX ?? (arrow.startX + arrow.endX) / 2;
            const controlY =
              arrow.controlY ?? (arrow.startY + arrow.endY) / 2;

            return (
              <path
                key={arrow.id}
                d={`M ${arrow.startX} ${arrow.startY} Q ${controlX} ${controlY} ${arrow.endX} ${arrow.endY}`}
                fill="none"
                stroke={arrow.color || '#38bdf8'}
                strokeWidth="0.45"
                strokeDasharray={arrow.isDashed ? '1.5 1' : 'none'}
                markerEnd="url(#arrow-head-read)"
                style={{ color: arrow.color || '#38bdf8' }}
              />
            );
          })}
      </svg>

      {/* Joueurs et Équipements */}
      {positions.map((item) => {
        if (item.kind === 'equipment') {
          const config =
            EQUIPMENT_TYPES[item.equipmentType] || EQUIPMENT_TYPES.ball;

          return (
            <div
              key={item.id}
              style={{ left: `${item.x}%`, top: `${item.y}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 ${config.sizeClass} flex items-center justify-center z-20`}
            >
              {config.icon}
            </div>
          );
        }

        if (item.kind === 'player') {
          return (
            <div
              key={item.id}
              style={{ left: `${item.x}%`, top: `${item.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 w-7 h-9 flex flex-col items-center justify-center filter drop-shadow-md z-20"
            >
              <svg viewBox="0 0 24 28" className="w-full h-full">
                <circle
                  cx="12"
                  cy="4"
                  r="3.5"
                  className="fill-amber-200 stroke-slate-900 stroke-[0.8]"
                />
                <path
                  d="M 5,11 L 8,9 L 12,11 L 16,9 L 19,11 L 18,17 L 15,17 L 15,27 L 9,27 L 9,17 L 6,17 Z"
                  fill={item.hexColor || '#fbbf24'}
                  className="stroke-slate-900 stroke-[1]"
                />
              </svg>

              {showLabels && (
                <span className="absolute top-[13px] text-[8px] font-black text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] select-none">
                  {item.label}
                </span>
              )}
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}
