import { useEffect, useRef, useState } from 'react';
import { Copy, Download, Pencil, Trash2, Upload } from 'lucide-react';
import Pitch from './Pitch';

export default function LibraryView({ exercises, onDelete, onImport, onEdit, onDuplicate }) {
  const [selectedId, setSelectedId] = useState(exercises[0]?.id ?? null);
  const importInputRef = useRef(null);

  useEffect(() => {
    if (exercises.length === 0) {
      setSelectedId(null);
      return;
    }

    const selectedStillExists = exercises.some(
      (exercise) => exercise.id === selectedId
    );

    if (!selectedStillExists) {
      setSelectedId(exercises[0].id);
    }
  }, [exercises, selectedId]);

  const selectedExercise =
    exercises.find((exercise) => exercise.id === selectedId) || exercises[0];

  const downloadJson = (data, filename) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  };

  const handleExportSelected = () => {
    if (!selectedExercise) return;

    const safeTitle = (selectedExercise.title || 'exercice')
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9àâäéèêëîïôöùûüç]+/gi, '-')
      .replace(/^-+|-+$/g, '');

    downloadJson(
      selectedExercise,
      `${safeTitle || 'exercice'}-footlab.json`
    );
  };

  const handleExportAll = () => {
    if (exercises.length === 0) return;
    downloadJson(exercises, 'bibliotheque-footlab.json');
  };

  const handleImportFile = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      const content = await file.text();
      const parsedData = JSON.parse(content);

      if (Array.isArray(parsedData)) {
        const validExercises = parsedData.filter(
          (exercise) => exercise && typeof exercise === 'object'
        );

        if (validExercises.length === 0) {
          throw new Error('Aucun exercice valide dans ce fichier.');
        }

        onImport(validExercises);
      } else if (parsedData && typeof parsedData === 'object') {
        onImport(parsedData);
      } else {
        throw new Error('Format JSON non reconnu.');
      }
    } catch (error) {
      console.error('Erreur import JSON :', error);
      window.alert("Impossible d'importer ce fichier JSON.");
    } finally {
      event.target.value = '';
    }
  };

  const handleDelete = (exercise) => {
    const confirmed = window.confirm(
      `Supprimer définitivement "${exercise.title || 'cet exercice'}" ?`
    );

    if (confirmed) {
      onDelete(exercise.id);
    }
  };

  if (exercises.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => importInputRef.current?.click()}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-sm font-semibold flex items-center gap-2"
          >
            <Upload size={16} />
            Importer JSON
          </button>

          <input
            ref={importInputRef}
            type="file"
            accept=".json,application/json"
            onChange={handleImportFile}
            className="hidden"
          />
        </div>

        <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-3xl">
            📋
          </div>

          <h3 className="text-xl font-bold text-slate-200">
            Aucun exercice pour le moment
          </h3>

          <p className="text-slate-400 text-sm max-w-sm">
            Ta liste d'exercice est vide. Clique sur « Nouvel exercice » dans le
            menu à gauche pour créer ton tout premier schéma tactique, ou importe
            une sauvegarde JSON.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-bold tracking-wider uppercase text-slate-100">
          Mes exercices
        </h2>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => importInputRef.current?.click()}
            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold flex items-center gap-2"
          >
            <Upload size={15} />
            Importer JSON
          </button>

          <button
            type="button"
            onClick={handleExportAll}
            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold flex items-center gap-2"
          >
            <Download size={15} />
            Exporter tout
          </button>

          <input
            ref={importInputRef}
            type="file"
            accept=".json,application/json"
            onChange={handleImportFile}
            className="hidden"
          />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 h-full">
        <div className="col-span-4 space-y-3">
          {exercises.map((ex) => {
            const isSelected = ex.id === selectedExercise?.id;

            return (
              <button
                key={ex.id}
                type="button"
                onClick={() => setSelectedId(ex.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  isSelected
                    ? 'bg-emerald-500/10 border-emerald-500/50'
                    : 'bg-slate-800/40 border-slate-800 hover:border-slate-700'
                }`}
              >
                <h3 className="font-bold text-slate-100">{ex.title}</h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  {ex.description || 'Aucune description'}
                </p>
              </button>
            );
          })}
        </div>

        <div className="col-span-8 bg-slate-800/30 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black text-slate-100 uppercase">
                {selectedExercise?.title}
              </h1>

              <div className="flex flex-wrap gap-2 mt-2 text-xs text-slate-400">
                {selectedExercise?.category && (
                  <span>{selectedExercise.category}</span>
                )}
                {selectedExercise?.duration && (
                  <span>• {selectedExercise.duration} min</span>
                )}
                {selectedExercise?.playersCount && (
                  <span>• {selectedExercise.playersCount} joueurs</span>
                )}
                {selectedExercise?.intensity && (
                  <span>• Intensité {selectedExercise.intensity}</span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => onEdit(selectedExercise)}
                title="Modifier cet exercice"
                className="p-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400"
              >
                <Pencil size={17} />
              </button>

              <button
                type="button"
                onClick={() => onDuplicate(selectedExercise)}
                title="Dupliquer cet exercice"
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200"
              >
                <Copy size={17} />
              </button>

              <button
                type="button"
                onClick={handleExportSelected}
                title="Exporter cet exercice en JSON"
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200"
              >
                <Download size={17} />
              </button>

              <button
                type="button"
                onClick={() => handleDelete(selectedExercise)}
                title="Supprimer cet exercice"
                className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400"
              >
                <Trash2 size={17} />
              </button>
            </div>
          </div>

          <Pitch
            positions={selectedExercise?.positions || []}
            pitchType={selectedExercise?.pitchType || 'full'}
          />

          {selectedExercise?.description && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Description & Consignes
              </h3>
              <p className="text-sm text-slate-200 whitespace-pre-wrap">
                {selectedExercise.description}
              </p>
            </div>
          )}

          {selectedExercise?.objectives && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Objectifs
              </h3>
              <p className="text-sm text-slate-200 whitespace-pre-wrap">
                {selectedExercise.objectives}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
