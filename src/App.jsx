import { useState } from 'react';
import Sidebar from './components/Sidebar';
import LibraryView from './components/LibraryView';
import CreateExerciseView from './components/CreateExerciseView';
import { initialExercises } from './data/mockExercises';

export default function App() {
  const [activeTab, setActiveTab] = useState('library');
  const [exercises, setExercises] = useState(initialExercises);

  // Ajoute un nouvel exercice et bascule directement sur la bibliothèque pour le voir
  const handleSaveExercise = (newEx) => {
    setExercises([newEx, ...exercises]);
    setActiveTab('library');
  };

  return (
    <div className="flex h-screen bg-main text-slate-100 overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 overflow-y-auto p-8">
        {activeTab === 'library' && <LibraryView exercises={exercises} />}
        {activeTab === 'create' && <CreateExerciseView onSave={handleSaveExercise} />}
      </main>
    </div>
  );
}