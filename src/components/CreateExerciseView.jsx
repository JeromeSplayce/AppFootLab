import { useState } from 'react';
import PitchEditor from './PitchEditor';
import {
  Plus,
  ArrowRight,
  MoveRight,
  CornerUpRight,
  Layers,
  ChevronDown,
  ChevronUp,
  Undo2,
  Redo2,
  Trash2,
} from 'lucide-react';

export default function CreateExerciseView() {
  const [pitchType, setPitchType] = useState('full');
  const [activeColor, setActiveColor] = useState('yellow');
  const [positions, setPositions] = useState([]);
  const [history, setHistory] = useState([]);
  const [showMoreEquipment, setShowMoreEquipment] = useState(false);

  // Formulaire d'exercice
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Technique');
  const [intensity, setIntensity] = useState('Moyenne');
  const [duration, setDuration] = useState('15');
  const [playersCount, setPlayersCount] = useState('8');
  const [description, setDescription] = useState('');
  const [objectives, setObjectives] = useState('');

  const colors = [
    { id: 'red', hex: '#ef4444', name: 'Rouge' },
    { id: 'blue', hex: '#3b82f6', name: 'Bleu' },
    { id: 'yellow', hex: '#eab308', name: 'Jaune' },
    { id: 'green', hex: '#22c55e', name: 'Vert' },
  ];

  const updatePositionsWithHistory = (newPositions) => {
    setPositions(newPositions);
    setHistory([]);
  };

  const handleAddPlayer = () => {
    const selectedColorObj = colors.find((c) => c.id === activeColor) || colors[0];
    const newPlayer = {
      id: Date.now().toString(),
      kind: 'player',
      x: 50,
      y: 50,
      color: activeColor,
      hexColor: selectedColorObj.hex,
    };
    updatePositionsWithHistory([...positions, newPlayer]);
  };

  const handleAddEquipment = (type) => {
    const newEquipment = {
      id: Date.now().toString(),
      kind: 'equipment',
      equipmentType: type,
      x: 50,
      y: 50,
    };
    updatePositionsWithHistory([...positions, newEquipment]);
  };

  const handleAddArrow = (e, isDashed = false, makeCurved = false) => {
    if (e && e.preventDefault) e.preventDefault();
    const activeColorObj = colors.find((c) => c.id === activeColor) || colors[0];
    const startX = 40;
    const startY = 50;
    const endX = 60;
    const endY = 50;

    const controlX = (startX + endX) / 2;
    const controlY = makeCurved ? startY - 12 : (startY + endY) / 2;

    const newArrow = {
      id: Date.now().toString(),
      kind: 'arrow',
      startX,
      startY,
      endX,
      endY,
      controlX,
      controlY,
      isDashed,
      color: activeColorObj.hex,
    };

    updatePositionsWithHistory([...positions, newArrow]);
  };

  const handleUndo = () => {
    if (positions.length === 0) return;
    const lastItem = positions[positions.length - 1];
    setHistory((prev) => [...prev, lastItem]);
    setPositions((prev) => prev.slice(0, -1));
  };

  const handleRedo = () => {
    if (history.length === 0) return;
    const itemToRestore = history[history.length - 1];
    setPositions((prev) => [...prev, itemToRestore]);
    setHistory((prev) => prev.slice(0, -1));
  };

  const handleClearAll = () => {
    if (positions.length === 0) return;
    if (window.confirm('Voulez-vous vraiment effacer tous les éléments du terrain ?')) {
      setHistory((prev) => [...prev, ...positions]);
      setPositions([]);
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto space-y-6 pb-12 select-none">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wide">CRÉATEUR D'EXERCICE</h1>
          <p className="text-xs text-slate-400">Place et glisse les joueurs et matériels sur le terrain.</p>
        </div>
        <button
          type="button"
          className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
        >
          Enregistrer l'exercice
        </button>
      </div>

      {/* BLOC CENTRAL */}
      <div className="space-y-3 max-w-[900px] mx-auto">
        <div className="bg-[#111c24] border border-slate-800 rounded-xl p-3 space-y-3 shadow-md">
          {/* Ligne 1 : Couleurs, Joueur, Commandes (Undo, Redo, Poubelle) + Terrain */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {colors.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setActiveColor(c.id)}
                  style={{ backgroundColor: c.hex }}
                  className={`w-6 h-6 rounded-full transition-all cursor-pointer ${
                    activeColor === c.id
                      ? 'ring-2 ring-white scale-110 shadow-lg'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                  title={c.name}
                />
              ))}

              <button
                type="button"
                onClick={handleAddPlayer}
                className="ml-2 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-medium text-xs flex items-center gap-1 transition-all cursor-pointer shadow-sm"
              >
                <Plus size={14} /> Joueur
              </button>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 border-r border-slate-800 pr-2 mr-1">
                <button
                  type="button"
                  onClick={handleUndo}
                  disabled={positions.length === 0}
                  title="Retour arrière (Annuler)"
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-200 border border-slate-700 transition-all cursor-pointer"
                >
                  <Undo2 size={16} />
                </button>
                <button
                  type="button"
                  onClick={handleRedo}
                  disabled={history.length === 0}
                  title="Retour en avant (Rétablir)"
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-200 border border-slate-700 transition-all cursor-pointer"
                >
                  <Redo2 size={16} />
                </button>
                <button
                  type="button"
                  onClick={handleClearAll}
                  disabled={positions.length === 0}
                  title="Tout supprimer"
                  className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 disabled:opacity-40 disabled:cursor-not-allowed text-rose-400 border border-rose-500/30 transition-all cursor-pointer"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="flex items-center bg-[#0b1319] p-1 rounded-lg border border-slate-800 text-xs">
                <button
                  type="button"
                  onClick={() => setPitchType('full')}
                  className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                    pitchType === 'full' ? 'bg-emerald-600 text-white font-medium' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Terrain
                </button>
                <button
                  type="button"
                  onClick={() => setPitchType('half')}
                  className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                    pitchType === 'half' ? 'bg-emerald-600 text-white font-medium' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Demi
                </button>
              </div>
            </div>
          </div>

          {/* Ligne 2 : Équipements + Flèches */}
          <div className="flex items-center justify-between gap-2 text-xs border-t border-slate-800/80 pt-2.5">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-slate-400 font-medium hidden sm:inline mr-1">MATÉRIEL :</span>

              <button
                type="button"
                onClick={() => handleAddEquipment('ball')}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all flex items-center gap-1 cursor-pointer"
              >
                ⚽ Ballon
              </button>

              <button
                type="button"
                onClick={() => handleAddEquipment('cone')}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all flex items-center gap-1 cursor-pointer"
              >
                🔶 Cône
              </button>

              <button
                type="button"
                onClick={() => handleAddEquipment('saucer')}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all flex items-center gap-1 cursor-pointer"
              >
                🟡 Coupelle
              </button>

              <button
                type="button"
                onClick={() => handleAddEquipment('goal')}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all flex items-center gap-1 cursor-pointer"
              >
                🥅 Mini But
              </button>

              <button
                type="button"
                onClick={() => setShowMoreEquipment(!showMoreEquipment)}
                className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-emerald-400 border border-emerald-500/30 transition-all flex items-center gap-1 cursor-pointer font-medium"
              >
                {showMoreEquipment ? (
                  <>Moins <ChevronUp size={14} /></>
                ) : (
                  <>+ Plus <ChevronDown size={14} /></>
                )}
              </button>
            </div>

            {/* BOUTONS FLÈCHES */}
            <div className="flex items-center gap-1 border-l border-slate-700 pl-2 ml-1 shrink-0">
              <button
                type="button"
                onClick={(e) => handleAddArrow(e, false, false)}
                title="Passe (Ligne droite)"
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all cursor-pointer"
              >
                <ArrowRight size={14} />
              </button>

              <button
                type="button"
                onClick={(e) => handleAddArrow(e, true, false)}
                title="Course (Ligne droite)"
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all cursor-pointer"
              >
                <MoveRight size={14} />
              </button>
            </div>
          </div>

          {/* Ligne 3 (Dépliée) */}
          {showMoreEquipment && (
            <div className="flex items-center gap-1.5 flex-wrap text-xs pt-1 border-t border-slate-800/50">
              <button
                type="button"
                onClick={() => handleAddEquipment('hoop')}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all flex items-center gap-1 cursor-pointer"
              >
                ⭕ Cerceau
              </button>
              <button
                type="button"
                onClick={() => handleAddEquipment('ladder')}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all flex items-center gap-1 cursor-pointer"
              >
                🪜 Échelle
              </button>
              <button
                type="button"
                onClick={() => handleAddEquipment('bar')}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all flex items-center gap-1 cursor-pointer"
              >
                ➖ Barre
              </button>
              <button
                type="button"
                onClick={() => handleAddEquipment('hurdle')}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all flex items-center gap-1 cursor-pointer"
              >
                🚧 Haie
              </button>
              <button
                type="button"
                onClick={() => handleAddEquipment('dummy')}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all flex items-center gap-1 cursor-pointer"
              >
                🧍 Mannequin
              </button>
              <button
                type="button"
                onClick={() => handleAddEquipment('pole')}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all flex items-center gap-1 cursor-pointer"
              >
                🚩 Piquet
              </button>
            </div>
          )}
        </div>

        <PitchEditor
          positions={positions}
          pitchType={pitchType}
          showLabels={false}
          updatePositions={updatePositionsWithHistory}
        />
      </div>

      {/* FORMULAIRE D'INFORMATIONS */}
      <div className="bg-[#111c24] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
        <h2 className="text-lg font-semibold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
          <Layers size={18} className="text-emerald-400" /> Informations de l'exercice
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2 space-y-1">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Titre de l'exercice</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Circuit de passe et finition..."
              className="w-full bg-[#0b1319] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Catégorie</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-[#0b1319] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors cursor-pointer"
            >
              <option value="Technique">Technique</option>
              <option value="Tactique">Tactique</option>
              <option value="Physique">Physique</option>
              <option value="Psychomotricité">Psychomotricité</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Intensité</label>
            <select
              value={intensity}
              onChange={(e) => setIntensity(e.target.value)}
              className="w-full bg-[#0b1319] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors cursor-pointer"
            >
              <option value="Faible">Faible</option>
              <option value="Moyenne">Moyenne</option>
              <option value="Élevée">Élevée</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Durée (min)</label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full bg-[#0b1319] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Nombre de Joueurs</label>
            <input
              type="number"
              value={playersCount}
              onChange={(e) => setPlayersCount(e.target.value)}
              className="w-full bg-[#0b1319] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          <div className="space-y-1 md:col-span-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Description & Consignes</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Consignes de l'exercice..."
              className="w-full bg-[#0b1319] border border-slate-800 rounded-xl p-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
            />
          </div>

          <div className="space-y-1 md:col-span-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Objectifs</label>
            <textarea
              rows={2}
              value={objectives}
              onChange={(e) => setObjectives(e.target.value)}
              placeholder="Objectifs tactiques/techniques..."
              className="w-full bg-[#0b1319] border border-slate-800 rounded-xl p-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}