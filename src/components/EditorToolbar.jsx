import { Plus, Undo2, Redo2, Trash2, Check, Tag, MoveRight, Dices } from 'lucide-react';
import { EQUIPMENT_TYPES } from './Equipment';

export const PLAYER_COLORS = [
  { id: 'red', name: 'Rouge', bg: 'bg-rose-500', hex: '#f43f5e' },
  { id: 'blue', name: 'Bleu', bg: 'bg-blue-500', hex: '#3b82f6' },
  { id: 'green', name: 'Vert', bg: 'bg-emerald-500', hex: '#10b981' },
  { id: 'yellow', name: 'Jaune', bg: 'bg-amber-400', textClass: 'text-slate-950', hex: '#fbbf24' },
  { id: 'purple', name: 'Violet', bg: 'bg-purple-500', hex: '#a855f7' },
  { id: 'orange', name: 'Orange', bg: 'bg-orange-500', hex: '#f97316' },
];

export default function EditorToolbar({
  selectedColor,
  setSelectedColor,
  showLabels,
  setShowLabels,
  onAddPlayer,
  onAddEquipment,
  onAddArrow,
  pitchType,
  setPitchType,
  onUndo,
  onRedo,
  onClear,
  canUndo,
  canRedo,
  hasPositions,
}) {
  const activeColorObj = PLAYER_COLORS.find((c) => c.id === selectedColor) || PLAYER_COLORS[0];

  return (
    <div className="flex flex-wrap items-center justify-between bg-sidebar/50 p-3 rounded-2xl border border-slate-800 gap-3">
      {/* Ajout de Flèches (Passe & Course) */}
      <div className="flex items-center gap-1.5 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800">
        <span className="text-[10px] font-bold uppercase text-slate-500 px-1">Trajectoires :</span>
        <button
          type="button"
          onClick={() => onAddArrow(false)}
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-500/40 text-xs font-bold transition-all cursor-pointer"
          title="Ajouter une passe (Ligne pleine)"
        >
          <Plus size={13} strokeWidth={3} /> <MoveRight size={14} /> Passe
        </button>

        <button
          type="button"
          onClick={() => onAddArrow(true)}
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/40 text-xs font-bold transition-all cursor-pointer"
          title="Ajouter une course (Pointillés)"
        >
          <Plus size={13} strokeWidth={3} /> <Dices size={14} /> Course
        </button>
      </div>

      {/* Joueurs : Nuancier & Bouton */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800">
          {PLAYER_COLORS.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setSelectedColor(c.id)}
              title={c.name}
              className={`w-6 h-6 rounded-full transition-all flex items-center justify-center cursor-pointer ${c.bg} ${
                selectedColor === c.id
                  ? 'ring-2 ring-white scale-110 shadow-md'
                  : 'opacity-60 hover:opacity-100 hover:scale-105'
              }`}
            >
              {selectedColor === c.id && <Check size={12} className={c.id === 'yellow' ? 'text-slate-950' : 'text-white'} strokeWidth={3} />}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={onAddPlayer}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer ${activeColorObj.bg} ${activeColorObj.textClass || 'text-white'}`}
        >
          <Plus size={14} strokeWidth={3} /> Joueur
        </button>
      </div>

      {/* Équipements */}
      <div className="flex items-center gap-1 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800">
        <span className="text-[10px] font-bold uppercase text-slate-500 px-1">Matériel :</span>
        {Object.values(EQUIPMENT_TYPES).map((eq) => (
          <button
            key={eq.id}
            type="button"
            onClick={() => onAddEquipment(eq.id)}
            title={`Ajouter un ${eq.name}`}
            className="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-medium transition-all cursor-pointer"
          >
            <div className="w-4 h-4">{eq.icon}</div>
            <span className="hidden xl:inline text-[11px]">{eq.name}</span>
          </button>
        ))}
      </div>

      {/* Mode d'affichage & Terrain */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setShowLabels(!showLabels)}
          title={showLabels ? "Masquer les numéros" : "Afficher les numéros"}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
            showLabels
              ? 'bg-slate-800 text-slate-100 border-slate-700'
              : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200'
          }`}
        >
          <Tag size={14} />
          {showLabels ? 'J1, J2...' : 'Cercles'}
        </button>

        <div className="flex items-center bg-slate-900/80 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setPitchType('full')}
            className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
              pitchType === 'full'
                ? 'bg-slate-800 text-slate-100 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Terrain
          </button>
          <button
            type="button"
            onClick={() => setPitchType('half')}
            className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
              pitchType === 'half'
                ? 'bg-slate-800 text-slate-100 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Demi
          </button>
        </div>
      </div>

      {/* Historique */}
      <div className="flex gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
        <button
          type="button"
          onClick={onUndo}
          disabled={!canUndo}
          title="Annuler"
          className="p-1.5 rounded-lg text-slate-300 hover:bg-slate-800 disabled:opacity-30 transition-all cursor-pointer"
        >
          <Undo2 size={15} />
        </button>

        <button
          type="button"
          onClick={onRedo}
          disabled={!canRedo}
          title="Rétablir"
          className="p-1.5 rounded-lg text-slate-300 hover:bg-slate-800 disabled:opacity-30 transition-all cursor-pointer"
        >
          <Redo2 size={15} />
        </button>

        <div className="w-[1px] bg-slate-800 my-1 mx-0.5" />

        <button
          type="button"
          onClick={onClear}
          disabled={!hasPositions}
          title="Tout effacer"
          className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 disabled:opacity-30 transition-all cursor-pointer"
        >
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  );
}