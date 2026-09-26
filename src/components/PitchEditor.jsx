import { useRef, useState } from 'react';
import { X } from 'lucide-react';
import Player from './Player';
import Equipment from './Equipment';
import PitchSvg from './PitchSvg';
export default function PitchEditor({
  positions,
  pitchType,
  showLabels = true,
  updatePositions,
}) {
  const [draggingId, setDraggingId] = useState(null);
  const [dragHandle, setDragHandle] = useState(null); // 'body', 'head' ou 'curve'
  const [draggedPositions, setDraggedPositions] = useState(null);
  const [selectedArrowId, setSelectedArrowId] = useState(null);
  const pitchRef = useRef(null);
  const activePositions = draggedPositions || positions;
  const getCoordinates = (e) => {
    if (!pitchRef.current) return { x: 0, y: 0 };
    const rect = pitchRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, Math.round(((e.clientX - rect.left) / rect.width) * 100)));
    const y = Math.max(0, Math.min(100, Math.round(((e.clientY - rect.top) / rect.height) * 100)));
    return { x, y };
  };
  const handleArrowClick = (id, e) => {
    e.stopPropagation();
    setSelectedArrowId(id);
  };
  const handlePitchMouseDown = () => {
    setSelectedArrowId(null);
  };
  const handleMouseDown = (id, e, handle = 'body') => {
    e.stopPropagation();
    e.preventDefault();
    setDraggingId(id);
    setDragHandle(handle);
    setDraggedPositions([...positions]);
    const item = positions.find((p) => p.id === id);
    if (item && item.kind === 'arrow') {
      setSelectedArrowId(id);
    }
  };
  const handleMouseMove = (e) => {
    if (!draggingId || !draggedPositions) return;
    const { x, y } = getCoordinates(e);
    setDraggedPositions(
      draggedPositions.map((p) => {
        if (p.id !== draggingId) return p;
        if (p.kind === 'arrow') {
          // Ajustement de la tête de flèche (Fin)
          if (dragHandle === 'head') {
            return { ...p, endX: x, endY: y };
          }
          // Ajustement du point de courbure (Courbe/Arrondi)
          if (dragHandle === 'curve') {
            return { ...p, controlX: x, controlY: y };
          }
          // Déplacement global du corps de la flèche
          const dx = x - p.startX;
          const dy = y - p.startY;
          const prevControlX = p.controlX ?? (p.startX + p.endX) / 2;
          const prevControlY = p.controlY ?? (p.startY + p.endY) / 2;
          return {
            ...p,
            startX: x,
            startY: y,
            endX: Math.max(0, Math.min(100, p.endX + dx)),
            endY: Math.max(0, Math.min(100, p.endY + dy)),
            controlX: Math.max(0, Math.min(100, prevControlX + dx)),
            controlY: Math.max(0, Math.min(100, prevControlY + dy)),
          };
        }
        return { ...p, x, y };
      })
    );
  };
  const handleMouseUp = () => {
    if (draggingId && draggedPositions) {
      updatePositions(draggedPositions);
      setDraggingId(null);
      setDragHandle(null);
      setDraggedPositions(null);
    }
  };
  const removeItem = (id, e) => {
    e.stopPropagation();
    updatePositions(positions.filter((p) => p.p_id !== id && p.id !== id));
    if (selectedArrowId === id) setSelectedArrowId(null);
  };
  return (
    <div className="space-y-2 w-full overflow-hidden">
      <div
        ref={pitchRef}
        onMouseDown={handlePitchMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="relative w-full aspect-[16/10] bg-[#0b1f1c] rounded-2xl border-2 border-dashed border-emerald-800/60 p-4 overflow-hidden shadow-inner select-none touch-none"
      >
        <PitchSvg pitchType={pitchType} />
        {/* Calque SVG des flèches */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-hidden"
        >
          <defs>
            <marker
              id="arrow-head"
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
          {activePositions
            .filter((p) => p.kind === 'arrow')
            .map((arrow) => {
              const isSelected = selectedArrowId === arrow.id || draggingId === arrow.id;
              // Points de contrôle pour l'arrondi (par défaut au milieu)
              const controlX = arrow.controlX ?? (arrow.startX + arrow.endX) / 2;
              const controlY = arrow.controlY ?? (arrow.startY + arrow.endY) / 2;
              return (
                <g key={arrow.id} className="pointer-events-auto">
                  {/* Flèche de course (Pointillée et Arrondie) */}
                  {arrow.isDashed ? (
                    <>
                      {/* Zone large invisible pour cliquer/sélectionner facilement */}
                      <path
                        d={`M ${arrow.startX} ${arrow.startY} Q ${controlX} ${controlY} ${arrow.endX} ${arrow.endY}`}
                        fill="none"
                        stroke="transparent"
                        strokeWidth="14"
                        className="cursor-grab active:cursor-grabbing"
                        onClick={(e) => handleArrowClick(arrow.id, e)}
                        onMouseDown={(e) => handleMouseDown(arrow.id, e, 'body')}
                      />
                      {/* Tracé visible courbe pointillé */}
                      <path
                        d={`M ${arrow.startX} ${arrow.startY} Q ${controlX} ${controlY} ${arrow.endX} ${arrow.endY}`}
                        fill="none"
                        stroke={arrow.color || '#38bdf8'}
                        strokeWidth={isSelected ? '0.7' : '0.45'}
                        strokeDasharray="1.5 1"
                        markerEnd="url(#arrow-head)"
                        style={{ color: arrow.color || '#38bdf8' }}
                        className="cursor-grab active:cursor-grabbing"
                      />
                    </>
                  ) : (
                    /* Flèche de passe (Pleine et courbable) */
                    <>
                      <path
                        d={`M ${arrow.startX} ${arrow.startY} Q ${controlX} ${controlY} ${arrow.endX} ${arrow.endY}`}
                        fill="none"
                        stroke="transparent"
                        strokeWidth="14"
                        className="cursor-grab active:cursor-grabbing"
                        onClick={(e) => handleArrowClick(arrow.id, e)}
                        onMouseDown={(e) => handleMouseDown(arrow.id, e, 'body')}
                      />
                      <path
                        d={`M ${arrow.startX} ${arrow.startY} Q ${controlX} ${controlY} ${arrow.endX} ${arrow.endY}`}
                        fill="none"
                        stroke={arrow.color || '#38bdf8'}
                        strokeWidth={isSelected ? '0.7' : '0.45'}
                        markerEnd="url(#arrow-head)"
                        style={{ color: arrow.color || '#38bdf8' }}
                        className="cursor-grab active:cursor-grabbing"
                      />
                    </>
                  )}
                  {/* Poignée d'extrémité (Régler la longueur/orientation) */}
                  {isSelected && (
                    <circle
                      cx={arrow.endX}
                      cy={arrow.endY}
                      r="8"
                      className="fill-transparent stroke-transparent cursor-nwse-resize"
                      onMouseDown={(e) => handleMouseDown(arrow.id, e, 'head')}
                    />
                  )}
                </g>
              );
            })}
        </svg>
        {/* Contrôles HTML superposés pour la flèche sélectionnée */}
        {activePositions
          .filter((p) => p.kind === 'arrow')
          .map((arrow) => {
            const isSelected = selectedArrowId === arrow.id || draggingId === arrow.id;
            if (!isSelected) return null;
            const controlX = arrow.controlX ?? (arrow.startX + arrow.endX) / 2;
            const controlY = arrow.controlY ?? (arrow.startY + arrow.endY) / 2;
            // Calcul du milieu réel de la courbe pour positionner la croix rouge
            const midX = 0.25 * arrow.startX + 0.5 * controlX + 0.25 * arrow.endX;
            const midY = 0.25 * arrow.startY + 0.5 * controlY + 0.25 * arrow.endY;
            return (
              <div key={`controls-${arrow.id}`}>
                {/* Poignée bleue pour arrondir la flèche */}
                <button
                  type="button"
                  onMouseDown={(e) => handleMouseDown(arrow.id, e, 'curve')}
                  style={{ left: `${controlX}%`, top: `${controlY}%` }}
                  title="Maintenir et glisser pour arrondir"
                  className="absolute -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-blue-500 hover:bg-blue-400 border-2 border-white shadow-md cursor-grab active:cursor-grabbing z-30 transition-transform hover:scale-125"
                />
                {/* Bouton rouge de suppression au milieu de la courbe */}
                <button
                  type="button"
                  onClick={(e) => removeItem(arrow.id, e)}
                  onMouseDown={(e) => e.stopPropagation()}
                  title="Supprimer la flèche"
                  style={{ left: `${midX}%`, top: `${midY}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-rose-600 text-white flex items-center justify-center border border-white shadow-md cursor-pointer z-30 hover:scale-125 transition-transform"
                >
                  <X size={10} strokeWidth={3} />
                </button>
              </div>
            );
          })}
        {/* Joueurs et Équipements */}
        {activePositions.map((item) => {
          if (item.kind === 'equipment') {
            return (
              <Equipment
                key={item.id}
                item={item}
                isDragging={draggingId === item.id}
                onMouseDown={handleMouseDown}
                onRemove={removeItem}
              />
            );
          }
          if (item.kind === 'player') {
            return (
              <Player
                key={item.id}
                player={item}
                showLabels={showLabels}
                isDragging={draggingId === item.id}
                onMouseDown={handleMouseDown}
                onRemove={removeItem}
              />
            );
          }
          return null;
        })}
      </div>
      <p className="text-xs text-slate-500 text-center">
        Clique sur une flèche pour la sélectionner. Glisse le <b>point bleu</b> pour l’arrondir.
      </p>
    </div>
  );
}
