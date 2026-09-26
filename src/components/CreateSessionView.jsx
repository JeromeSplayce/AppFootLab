import { useMemo, useState } from 'react';
import {
  ArrowDown,
  ArrowUp,
  Check,
  Clock3,
  Plus,
  Save,
  Search,
  Trash2,
} from 'lucide-react';

export default function CreateSessionView({
  exercises,
  onSave,
  sessionToEdit = null,
}) {
  const [title, setTitle] = useState(sessionToEdit?.title || '');
  const [description, setDescription] = useState(
    sessionToEdit?.description || ''
  );
  const [exerciseIds, setExerciseIds] = useState(
    Array.isArray(sessionToEdit?.exerciseIds)
      ? [...sessionToEdit.exerciseIds]
      : []
  );
  const [search, setSearch] = useState('');

  const exerciseMap = useMemo(
    () => new Map(exercises.map((exercise) => [exercise.id, exercise])),
    [exercises]
  );

  const selectedExercises = exerciseIds
    .map((id) => exerciseMap.get(id))
    .filter(Boolean);

  const availableExercises = exercises.filter((exercise) => {
    if (exerciseIds.includes(exercise.id)) return false;

    const query = search.trim().toLowerCase();

    if (!query) return true;

    return (
      exercise.title?.toLowerCase().includes(query) ||
      exercise.category?.toLowerCase().includes(query)
    );
  });

  const totalDuration = selectedExercises.reduce((total, exercise) => {
    const duration = Number.parseInt(exercise.duration, 10);
    return total + (Number.isNaN(duration) ? 0 : duration);
  }, 0);

  const addExercise = (exerciseId) => {
    setExerciseIds((currentIds) =>
      currentIds.includes(exerciseId)
        ? currentIds
        : [...currentIds, exerciseId]
    );
  };

  const removeExercise = (exerciseId) => {
    setExerciseIds((currentIds) =>
      currentIds.filter((id) => id !== exerciseId)
    );
  };

  const moveExercise = (index, direction) => {
    const targetIndex = index + direction;

    if (targetIndex < 0 || targetIndex >= exerciseIds.length) return;

    setExerciseIds((currentIds) => {
      const reordered = [...currentIds];
      [reordered[index], reordered[targetIndex]] = [
        reordered[targetIndex],
        reordered[index],
      ];
      return reordered;
    });
  };

  const handleSave = () => {
    const cleanTitle = title.trim();

    if (!cleanTitle) {
      window.alert('Donne un titre à la séance avant de l’enregistrer.');
      return;
    }

    if (exerciseIds.length === 0) {
      window.alert('Ajoute au moins un exercice à la séance.');
      return;
    }

    const now = new Date().toISOString();

    onSave({
      id: sessionToEdit?.id || `session-${Date.now()}`,
      title: cleanTitle,
      description: description.trim(),
      exerciseIds,
      createdAt: sessionToEdit?.createdAt || now,
      updatedAt: sessionToEdit ? now : undefined,
    });
  };

  return (
    <div className="max-w-[1200px] mx-auto space-y-6 pb-12">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wide">
            {sessionToEdit ? 'MODIFIER LA SÉANCE' : 'CRÉATEUR DE SÉANCE'}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Assemble plusieurs exercices et définis leur ordre dans la séance.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all"
        >
          {sessionToEdit ? <Check size={18} /> : <Save size={18} />}
          {sessionToEdit
            ? 'Enregistrer les modifications'
            : 'Enregistrer la séance'}
        </button>
      </div>

      <div className="bg-[#111c24] border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2 space-y-1">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Titre de la séance
            </label>
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Ex : Séance U15 - Conservation et finition"
              className="w-full bg-[#0b1319] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="md:col-span-2 space-y-1">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Thème, groupe, objectifs généraux de la séance..."
              className="w-full bg-[#0b1319] border border-slate-800 rounded-xl p-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 resize-none"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <section className="bg-[#111c24] border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-white">
                Exercices disponibles
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Clique sur un exercice pour l’ajouter à la séance.
              </p>
            </div>
            <span className="text-xs text-slate-500">
              {availableExercises.length} disponible
              {availableExercises.length > 1 ? 's' : ''}
            </span>
          </div>

          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            />
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Rechercher un exercice..."
              className="w-full bg-[#0b1319] border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="space-y-2 max-h-[520px] overflow-y-auto pr-1">
            {availableExercises.length === 0 ? (
              <div className="p-6 rounded-xl border border-dashed border-slate-700 text-center text-sm text-slate-500">
                {exercises.length === 0
                  ? 'Crée d’abord des exercices dans ta bibliothèque.'
                  : 'Tous les exercices correspondants sont déjà dans la séance.'}
              </div>
            ) : (
              availableExercises.map((exercise) => (
                <button
                  key={exercise.id}
                  type="button"
                  onClick={() => addExercise(exercise.id)}
                  className="w-full text-left p-4 rounded-xl bg-slate-800/40 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/40 transition-all group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="font-bold text-slate-100 truncate">
                        {exercise.title}
                      </h3>
                      <div className="flex flex-wrap gap-2 mt-1 text-xs text-slate-500">
                        {exercise.category && <span>{exercise.category}</span>}
                        {exercise.duration && (
                          <span>• {exercise.duration} min</span>
                        )}
                        {exercise.playersCount && (
                          <span>• {exercise.playersCount} joueurs</span>
                        )}
                      </div>
                    </div>

                    <span className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
                      <Plus size={16} />
                    </span>
                  </div>
                </button>
              ))
            )}
          </div>
        </section>

        <section className="bg-[#111c24] border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-white">
                Ma séance
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                L’ordre affiché sera l’ordre de déroulement.
              </p>
            </div>

            <div className="text-right">
              <p className="text-sm font-bold text-emerald-400">
                {selectedExercises.length} exercice
                {selectedExercises.length > 1 ? 's' : ''}
              </p>
              <p className="text-xs text-slate-500 flex items-center justify-end gap-1">
                <Clock3 size={12} />
                {totalDuration} min
              </p>
            </div>
          </div>

          <div className="space-y-2">
            {selectedExercises.length === 0 ? (
              <div className="p-8 rounded-xl border border-dashed border-slate-700 text-center">
                <p className="text-slate-400 font-medium">
                  Aucun exercice ajouté
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Sélectionne des exercices dans la colonne de gauche.
                </p>
              </div>
            ) : (
              selectedExercises.map((exercise, index) => (
                <div
                  key={exercise.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/40 border border-slate-800"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 font-black flex items-center justify-center shrink-0">
                    {index + 1}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-slate-100 truncate">
                      {exercise.title}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {exercise.duration || 0} min
                      {exercise.category ? ` • ${exercise.category}` : ''}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() => moveExercise(index, -1)}
                      title="Monter"
                      className="p-1.5 rounded-lg bg-slate-900/70 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300"
                    >
                      <ArrowUp size={15} />
                    </button>

                    <button
                      type="button"
                      disabled={index === selectedExercises.length - 1}
                      onClick={() => moveExercise(index, 1)}
                      title="Descendre"
                      className="p-1.5 rounded-lg bg-slate-900/70 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300"
                    >
                      <ArrowDown size={15} />
                    </button>

                    <button
                      type="button"
                      onClick={() => removeExercise(exercise.id)}
                      title="Retirer de la séance"
                      className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
