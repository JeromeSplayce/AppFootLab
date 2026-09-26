import { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import LibraryView from './components/LibraryView';
import CreateExerciseView from './components/CreateExerciseView';
import { initialExercises } from './data/mockExercises';

const STORAGE_KEY = 'footlab_exercises';

export default function App() {
  const [activeTab, setActiveTab] = useState('library');

  const [exercises, setExercises] = useState(() => {
    try {
      const savedExercises = localStorage.getItem(STORAGE_KEY);

      if (savedExercises) {
        const parsedExercises = JSON.parse(savedExercises);
        return Array.isArray(parsedExercises) ? parsedExercises : initialExercises;
      }
    } catch (error) {
      console.error('Erreur lors du chargement des exercices :', error);
    }

    return initialExercises;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(exercises));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des exercices :', error);
    }
  }, [exercises]);

  const handleSaveExercise = (newEx) => {
    setExercises((currentExercises) => [newEx, ...currentExercises]);
    setActiveTab('library');
  };

  const handleDeleteExercise = (exerciseId) => {
    setExercises((currentExercises) =>
      currentExercises.filter((exercise) => exercise.id !== exerciseId)
    );
  };

  const handleImportExercises = (importedExercises) => {
    const exercisesToImport = Array.isArray(importedExercises)
      ? importedExercises
      : [importedExercises];

    setExercises((currentExercises) => {
      const currentIds = new Set(currentExercises.map((exercise) => exercise.id));

      const normalizedExercises = exercisesToImport.map((exercise, index) => {
        const importedId = exercise?.id?.toString();
        const id =
          importedId && !currentIds.has(importedId)
            ? importedId
            : `${Date.now()}-${index}`;

        currentIds.add(id);

        return {
          ...exercise,
          id,
          positions: Array.isArray(exercise?.positions) ? exercise.positions : [],
          pitchType: exercise?.pitchType || 'full',
        };
      });

      return [...normalizedExercises, ...currentExercises];
    });
  };

  return (
    <div className="flex h-screen bg-main text-slate-100 overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 overflow-y-auto p-8">
        {activeTab === 'library' && (
          <LibraryView
            exercises={exercises}
            onDelete={handleDeleteExercise}
            onImport={handleImportExercises}
          />
        )}

        {activeTab === 'create' && (
          <CreateExerciseView onSave={handleSaveExercise} />
        )}
      </main>
    </div>
  );
}
