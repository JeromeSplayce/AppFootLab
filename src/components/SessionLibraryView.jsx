import { useEffect, useMemo, useState } from 'react';
import {
  Clock3,
  Copy,
  Dumbbell,
  Pencil,
  Trash2,
} from 'lucide-react';

export default function SessionLibraryView({
  sessions,
  exercises,
  onDelete,
  onEdit,
  onDuplicate,
  onRemoveExercise,
}) {
  const [selectedId, setSelectedId] = useState(sessions[0]?.id ?? null);

  useEffect(() => {
    if (sessions.length === 0) {
      setSelectedId(null);
      return;
    }

    const selectedStillExists = sessions.some(
      (session) => session.id === selectedId
    );

    if (!selectedStillExists) {
      setSelectedId(sessions[0].id);
    }
  }, [sessions, selectedId]);

  const exerciseMap = useMemo(
    () => new Map(exercises.map((exercise) => [exercise.id, exercise])),
    [exercises]
  );

  const selectedSession =
    sessions.find((session) => session.id === selectedId) || sessions[0];

  const sessionItems = (selectedSession?.exerciseIds || []).map((id) => ({
    id,
    exercise: exerciseMap.get(id) || null,
  }));

  const selectedExercises = sessionItems
    .map((item) => item.exercise)
    .filter(Boolean);

  const missingExercisesCount = sessionItems.filter(
    (item) => !item.exercise
  ).length;

  const totalDuration = selectedExercises.reduce((total, exercise) => {
    const duration = Number.parseInt(exercise.duration, 10);
    return total + (Number.isNaN(duration) ? 0 : duration);
  }, 0);

  const handleDelete = (session) => {
    const confirmed = window.confirm(
      `Supprimer définitivement "${session.title || 'cette séance'}" ?`
    );

    if (confirmed) {
      onDelete(session.id);
    }
  };

  if (sessions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-3xl">
          🗓️
        </div>
        <h3 className="text-xl font-bold text-slate-200">
          Aucune séance pour le moment
        </h3>
        <p className="text-slate-400 text-sm max-w-sm">
          Va dans « Créer une séance » pour assembler plusieurs exercices de ta
          bibliothèque.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 gap-6 h-full">
      <div className="col-span-4 space-y-4">
        <h2 className="text-xl font-bold tracking-wider uppercase text-slate-100">
          Mes séances
        </h2>

        <div className="space-y-3">
          {sessions.map((session) => {
            const isSelected = session.id === selectedSession?.id;
            const sessionExerciseIds = session.exerciseIds || [];
            const sessionExercises = sessionExerciseIds
              .map((id) => exerciseMap.get(id))
              .filter(Boolean);

            const sessionDuration = sessionExercises.reduce((total, exercise) => {
              const duration = Number.parseInt(exercise.duration, 10);
              return total + (Number.isNaN(duration) ? 0 : duration);
            }, 0);

            return (
              <button
                key={session.id}
                type="button"
                onClick={() => setSelectedId(session.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  isSelected
                    ? 'bg-emerald-500/10 border-emerald-500/50'
                    : 'bg-slate-800/40 border-slate-800 hover:border-slate-700'
                }`}
              >
                <h3 className="font-bold text-slate-100">
                  {session.title}
                </h3>

                <div className="flex flex-wrap gap-2 mt-2 text-xs text-slate-500">
                  <span>
                    {sessionExerciseIds.length} exercice
                    {sessionExerciseIds.length > 1 ? 's' : ''}
                  </span>
                  <span>• {sessionDuration} min</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="col-span-8 bg-slate-800/30 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-100 uppercase">
              {selectedSession?.title}
            </h1>

            <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Dumbbell size={13} />
                {selectedExercises.length} exercice
                {selectedExercises.length > 1 ? 's' : ''}
              </span>

              <span className="flex items-center gap-1">
                <Clock3 size={13} />
                {totalDuration} min
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => onEdit(selectedSession)}
              title="Modifier la séance"
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200"
            >
              <Pencil size={17} />
            </button>

            <button
              type="button"
              onClick={() => onDuplicate(selectedSession)}
              title="Dupliquer la séance"
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200"
            >
              <Copy size={17} />
            </button>

            <button
              type="button"
              onClick={() => handleDelete(selectedSession)}
              title="Supprimer la séance"
              className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400"
            >
              <Trash2 size={17} />
            </button>
          </div>
        </div>

        {selectedSession?.description && (
          <p className="text-sm text-slate-300 whitespace-pre-wrap">
            {selectedSession.description}
          </p>
        )}

        {missingExercisesCount > 0 && (
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-sm">
            {missingExercisesCount} emplacement
            {missingExercisesCount > 1 ? 's' : ''} de cette séance
            {missingExercisesCount > 1 ? ' correspondent' : ' correspond'} à
            {missingExercisesCount > 1 ? ' des exercices supprimés.' : ' un exercice supprimé.'}
          </div>
        )}

        <div className="space-y-3">
          {sessionItems.map((item, index) => {
            if (!item.exercise) {
              return (
                <div
                  key={`${item.id}-${index}`}
                  className="flex items-start gap-4 p-4 rounded-xl bg-rose-500/5 border border-rose-500/30"
                >
                  <div className="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-400 font-black flex items-center justify-center shrink-0">
                    {index + 1}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-rose-300">
                      Exercice supprimé de la bibliothèque
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Cet emplacement reste dans la séance tant que tu ne le retires pas.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      onRemoveExercise(selectedSession.id, item.id)
                    }
                    className="px-3 py-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-semibold shrink-0"
                  >
                    Retirer de la séance
                  </button>
                </div>
              );
            }

            const exercise = item.exercise;

            return (
              <div
                key={`${item.id}-${index}`}
                className="flex items-start gap-4 p-4 rounded-xl bg-[#111c24] border border-slate-800"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 font-black flex items-center justify-center shrink-0">
                  {index + 1}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-slate-100">
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

                  {exercise.description && (
                    <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                      {exercise.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
