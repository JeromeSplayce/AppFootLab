import { X } from 'lucide-react';

export const EQUIPMENT_TYPES = {
  ball: {
    id: 'ball',
    name: 'Ballon',
    sizeClass: 'w-5 h-5',
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full drop-shadow">
        <ellipse cx="12" cy="22" rx="7" ry="2" className="fill-black/30" />
        <circle cx="12" cy="11" r="9.5" className="fill-white stroke-slate-900 stroke-[1.2]" />
        <polygon points="12,7 9,9.2 10.1,12.8 13.9,12.8 15,9.2" className="fill-slate-900" />
        <polygon points="12,1.5 10.2,3.8 12,7 15,3.8" className="fill-slate-900" />
        <polygon points="21.5,11 19.2,9.2 15,9.2 17.5,12.8" className="fill-slate-900" />
        <polygon points="17.8,18.5 16,15.8 13.9,12.8 15.5,17.2" className="fill-slate-900" />
        <polygon points="6.2,18.5 8,15.8 10.1,12.8 8.5,17.2" className="fill-slate-900" />
        <polygon points="2.5,11 4.8,9.2 9,9.2 6.5,12.8" className="fill-slate-900" />
        <line x1="12" y1="1.5" x2="12" y2="7" className="stroke-slate-400 stroke-[0.8]" />
        <line x1="21.5" y1="11" x2="15" y2="9.2" className="stroke-slate-400 stroke-[0.8]" />
        <line x1="17.8" y1="18.5" x2="13.9" y2="12.8" className="stroke-slate-400 stroke-[0.8]" />
        <line x1="6.2" y1="18.5" x2="10.1" y2="12.8" className="stroke-slate-400 stroke-[0.8]" />
        <line x1="2.5" y1="11" x2="9" y2="9.2" className="stroke-slate-400 stroke-[0.8]" />
      </svg>
    ),
  },
  cone: {
    id: 'cone',
    name: 'Cône',
    sizeClass: 'w-5 h-5',
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full drop-shadow">
        <ellipse cx="12" cy="21" rx="8" ry="2" className="fill-black/20" />
        <path d="M12 2L4 20h16L12 2z" className="fill-orange-500 stroke-amber-200 stroke-[0.8]" />
        <rect x="3" y="19" width="18" height="2.5" rx="1" className="fill-amber-600" />
      </svg>
    ),
  },
  saucer: {
    id: 'saucer',
    name: 'Coupelle',
    sizeClass: 'w-5 h-4',
    icon: (
      <svg viewBox="0 0 24 16" className="w-full h-full drop-shadow">
        <ellipse cx="12" cy="14" rx="8" ry="1.5" className="fill-black/20" />
        <path d="M 3 12 Q 12 4 21 12 L 18 13.5 Q 12 8 6 13.5 Z" className="fill-yellow-400 stroke-amber-500 stroke-[0.5]" />
        <ellipse cx="12" cy="8.5" rx="2.5" ry="1" className="fill-amber-600" />
      </svg>
    ),
  },
  hoop: {
    id: 'hoop',
    name: 'Cerceau',
    sizeClass: 'w-6 h-6',
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full drop-shadow">
        <ellipse cx="12" cy="21" rx="9" ry="2" className="fill-black/20" />
        <circle cx="12" cy="12" r="9" className="fill-none stroke-red-500 stroke-[2.5]" />
      </svg>
    ),
  },
  ladder: {
    id: 'ladder',
    name: 'Échelle de rythme',
    sizeClass: 'w-5 h-10',
    icon: (
      <svg viewBox="0 0 16 32" className="w-full h-full drop-shadow">
        <line x1="3" y1="2" x2="3" y2="30" className="stroke-yellow-400 stroke-[2]" />
        <line x1="13" y1="2" x2="13" y2="30" className="stroke-yellow-400 stroke-[2]" />
        <line x1="3" y1="6" x2="13" y2="6" className="stroke-slate-200 stroke-[1.5]" />
        <line x1="3" y1="12" x2="13" y2="12" className="stroke-slate-200 stroke-[1.5]" />
        <line x1="3" y1="18" x2="13" y2="18" className="stroke-slate-200 stroke-[1.5]" />
        <line x1="3" y1="24" x2="13" y2="24" className="stroke-slate-200 stroke-[1.5]" />
      </svg>
    ),
  },
  bar: {
    id: 'bar',
    name: 'Barre',
    sizeClass: 'w-8 h-3',
    icon: (
      <svg viewBox="0 0 32 12" className="w-full h-full drop-shadow">
        <ellipse cx="16" cy="10" rx="14" ry="1.5" className="fill-black/20" />
        <rect x="2" y="4" width="28" height="3" rx="1.5" className="fill-sky-400 stroke-sky-200 stroke-[0.5]" />
      </svg>
    ),
  },
  hurdle: {
    id: 'hurdle',
    name: 'Mini Haie',
    sizeClass: 'w-7 h-5',
    icon: (
      <svg viewBox="0 0 28 20" className="w-full h-full drop-shadow">
        <ellipse cx="14" cy="18" rx="11" ry="1.5" className="fill-black/20" />
        <path d="M 4 17 L 4 6 Q 14 3 24 6 L 24 17" className="fill-none stroke-emerald-400 stroke-[2.5] stroke-linecap-round stroke-linejoin-round" />
      </svg>
    ),
  },
  dummy: {
    id: 'dummy',
    name: 'Mannequin',
    sizeClass: 'w-5 h-8',
    icon: (
      <svg viewBox="0 0 20 32" className="w-full h-full drop-shadow">
        <ellipse cx="10" cy="30" rx="6" ry="1.5" className="fill-black/30" />
        <circle cx="10" cy="6" r="3.5" className="fill-red-600 stroke-red-800 stroke-[0.8]" />
        <path d="M 4 11 L 16 11 L 14 24 L 6 24 Z" className="fill-red-500 stroke-red-700 stroke-[0.8]" />
        <line x1="8" y1="24" x2="8" y2="29" className="stroke-slate-800 stroke-[2]" />
        <line x1="12" y1="24" x2="12" y2="29" className="stroke-slate-800 stroke-[2]" />
      </svg>
    ),
  },
  goal: {
    id: 'goal',
    name: 'Mini But',
    sizeClass: 'w-8 h-6',
    icon: (
      <svg viewBox="0 0 32 24" className="w-full h-full drop-shadow">
        <pattern id="net" width="3" height="3" patternUnits="userSpaceOnUse">
          <path d="M 3 0 L 0 3 M 0 0 L 3 3" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
        </pattern>
        <rect x="3" y="3" width="26" height="18" fill="url(#net)" className="opacity-80" />
        <rect x="2" y="2" width="28" height="20" rx="2" className="stroke-amber-400 stroke-[2] fill-none" />
      </svg>
    ),
  },
  pole: {
    id: 'pole',
    name: 'Piquet',
    sizeClass: 'w-3 h-8',
    icon: (
      <svg viewBox="0 0 12 32" className="w-full h-full drop-shadow">
        <ellipse cx="6" cy="30" rx="4" ry="1.5" className="fill-black/30" />
        <line x1="6" y1="2" x2="6" y2="29" className="stroke-yellow-400 stroke-[3.5] stroke-linecap-round" />
        <circle cx="6" cy="3" r="2.5" className="fill-amber-500" />
        <path d="M4 29 L6 31 L8 29 Z" className="fill-slate-800" />
      </svg>
    ),
  },
};

export default function Equipment({
  item,
  isDragging,
  onMouseDown,
  onRemove,
}) {
  const config = EQUIPMENT_TYPES[item.equipmentType] || EQUIPMENT_TYPES.ball;

  return (
    <div
      style={{ left: `${item.x}%`, top: `${item.y}%` }}
      onMouseDown={(e) => onMouseDown(item.id, e)}
      className={`group absolute -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing ${
        isDragging ? 'z-50 scale-125' : 'z-10'
      }`}
    >
      <div className={`${config.sizeClass} flex items-center justify-center`}>
        {config.icon}
      </div>

      {!isDragging && (
        <button
          type="button"
          onClick={(e) => onRemove(item.id, e)}
          onMouseDown={(e) => e.stopPropagation()}
          title="Supprimer cet équipement"
          className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full bg-rose-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-125 border border-white/50 shadow-md cursor-pointer z-20"
        >
          <X size={9} strokeWidth={3} />
        </button>
      )}
    </div>
  );
}