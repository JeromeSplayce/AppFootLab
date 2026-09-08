import { useState } from 'react';
import { X } from 'lucide-react';

export default function Arrow({ arrow, onUpdate, onRemove }) {
  const [isDraggingControl, setIsDraggingControl] = useState(false);

  // Position du point de contrôle de courbure
  const controlX = arrow.controlX ?? (arrow.startX + arrow.endX) / 2;
  const controlY = arrow.controlY ?? (arrow.startY + arrow.endY) / 2;

  // Calcul du centre de la courbe pour placer la croix de suppression
  const midX = 0.25 * arrow.startX + 0.5 * controlX + 0.25 * arrow.endX;
  const midY = 0.25 * arrow.startY + 0.5 * controlY + 0.25 * arrow.endY;

  const handleControlMouseDown = (e) => {
    e.stopPropagation();
    setIsDraggingControl(true);

    const pitch = e.currentTarget.closest('.relative');
    if (!pitch) return;
    const rect = pitch.getBoundingClientRect();

    const handleMouseMove = (moveEvent) => {
      const currentX = ((moveEvent.clientX - rect.left) / rect.width) * 100;
      const currentY = ((moveEvent.clientY - rect.top) / rect.height) * 100;

      onUpdate(arrow.id, {
        controlX: Math.max(0, Math.min(100, currentX)),
        controlY: Math.max(0, Math.min(100, currentY)),
      });
    };

    const handleMouseUp = () => {
      setIsDraggingControl(false);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const markerId = `arrowhead-${arrow.id}`;
  const isCurved = arrow.controlX !== undefined || arrow.controlY !== undefined;

  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      <svg className="w-full h-full overflow-visible">
        <defs>
          <marker
            id={markerId}
            markerWidth="8"
            markerHeight="8"
            refX="6"
            refY="4"
            orient="auto"
          >
            <path d="M 0 0 L 8 4 L 0 8 z" fill={arrow.color || '#ffffff'} />
          </marker>
        </defs>

        {/* Tracé de la flèche (droite ou courbe) */}
        {isCurved ? (
          <path
            d={`M ${arrow.startX}% ${arrow.startY}% Q ${controlX}% ${controlY}% ${arrow.endX}% ${arrow.endY}%`}
            fill="none"
            stroke={arrow.color || '#ffffff'}
            strokeWidth="3"
            strokeDasharray={arrow.isDashed ? '6 4' : 'none'}
            markerEnd={`url(#${markerId})`}
            className="pointer-events-auto"
          />
        ) : (
          <line
            x1={`${arrow.startX}%`}
            y1={`${arrow.startY}%`}
            x2={`${arrow.endX}%`}
            y2={`${arrow.endY}%`}
            stroke={arrow.color || '#ffffff'}
            strokeWidth="3"
            strokeDasharray={arrow.isDashed ? '6 4' : 'none'}
            markerEnd={`url(#${markerId})`}
            className="pointer-events-auto"
          />
        )}

        {/* Ligne de guidage quand on ajuste la courbure */}
        {isDraggingControl && (
          <path
            d={`M ${arrow.startX}% ${arrow.startY}% L ${controlX}% ${controlY}% L ${arrow.endX}% ${arrow.endY}%`}
            fill="none"
            stroke="rgba(59, 130, 246, 0.5)"
            strokeWidth="1"
            strokeDasharray="2 2"
          />
        )}
      </svg>

      {/* Poignée bleue pour arrondir (sur les courses pointillées uniquement) */}
      {arrow.isDashed && (
        <button
          type="button"
          onMouseDown={handleControlMouseDown}
          style={{ left: `${controlX}%`, top: `${controlY}%` }}
          title="Glisser pour arrondir la trajectoire"
          className="absolute -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-blue-500 hover:bg-blue-400 border-2 border-white shadow-md pointer-events-auto cursor-grab active:cursor-grabbing z-20 transition-transform hover:scale-125"
        />
      )}

      {/* Bouton pour supprimer la flèche */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(arrow.id);
        }}
        style={{ left: `${midX}%`, top: `${midY}%` }}
        title="Supprimer la flèche"
        className="absolute -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-rose-600 text-white flex items-center justify-center pointer-events-auto opacity-0 hover:opacity-100 transition-all hover:scale-125 border border-white shadow-md cursor-pointer z-30"
      >
        <X size={10} strokeWidth={3} />
      </button>
    </div>
  );
}