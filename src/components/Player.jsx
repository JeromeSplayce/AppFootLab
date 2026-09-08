import { X } from 'lucide-react';

export default function Player({
  player,
  isDragging,
  onMouseDown,
  onRemove,
}) {
  const colorMap = {
    red: '#ef4444',
    blue: '#3b82f6',
    yellow: '#eab308',
    green: '#22c55e',
  };

  const shirtColor =
    player.hexColor ||
    colorMap[player.color] ||
    (player.color?.startsWith('#') ? player.color : '#eab308');

  return (
    <div
      style={{ left: `${player.x}%`, top: `${player.y}%` }}
      onMouseDown={(e) => onMouseDown(player.id, e)}
      className={`group absolute -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing ${
        isDragging ? 'z-50 scale-125' : 'z-10'
      }`}
    >
      <div className="relative w-7 h-9 flex flex-col items-center justify-center filter drop-shadow-md">
        <svg viewBox="0 0 24 28" className="w-full h-full">
          {/* Tête */}
          <circle cx="12" cy="4" r="3.5" className="fill-amber-200 stroke-slate-900 stroke-[0.8]" />
          
          {/* Maillot sans numéro */}
          <path
            d="M 5,11 L 8,9 L 12,11 L 16,9 L 19,11 L 18,17 L 15,17 L 15,27 L 9,27 L 9,17 L 6,17 Z"
            fill={shirtColor}
            className="stroke-slate-900 stroke-[1]"
          />
        </svg>
      </div>

      {!isDragging && (
        <button
          type="button"
          onClick={(e) => onRemove(player.id, e)}
          onMouseDown={(e) => e.stopPropagation()}
          title="Supprimer ce joueur"
          className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-rose-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-125 border border-white/50 shadow-md cursor-pointer z-20"
        >
          <X size={9} strokeWidth={3} />
        </button>
      )}
    </div>
  );
}