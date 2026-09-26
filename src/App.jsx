import { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import LibraryView from './components/LibraryView';
import CreateExerciseView from './components/CreateExerciseView';
import SessionLibraryView from './components/SessionLibraryView';
import CreateSessionView from './components/CreateSessionView';
import { initialExercises } from './data/mockExercises';

const EXERCISES_STORAGE_KEY = 'footlab_exercises';
const SESSIONS_STORAGE_KEY = 'footlab_sessions';

export default function App() {
  const [activeTab, setActiveTab] = useState('library');
  const [editingExercise, setEditingExercise] = useState(null);
  const [editingSession, setEditingSession] = useState(null);

  const [exercises, setExercises] = useState(() => {
    try {
      const savedExercises = localStorage.getItem(EXERCISES_STORAGE_KEY);

      if (savedExercises) {
        const parsedExercises = JSON.parse(savedExercises);
        return Array.isArray(parsedExercises) ? parsedExercises : initialExercises;
      }
    } catch (error) {
      console.error('Erreur lors du chargement des exercices :', error);
    }

    return initialExercises;
  });

  const [sessions, setSessions] = useState(() => {
    try {
      const savedSessions = localStorage.getItem(SESSIONS_STORAGE_KEY);

      if (savedSessions) {
        const parsedSessions = JSON.parse(savedSessions);
        return Array.isArray(parsedSessions) ? parsedSessions : [];
      }
    } catch (error) {
      console.error('Erreur lors du chargement des séances :', error);
    }

    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(EXERCISES_STORAGE_KEY, JSON.stringify(exercises));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des exercices :', error);
    }
  }, [exercises]);

  useEffect(() => {
    try {
      localStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(sessions));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des séances :', error);
    }
  }, [sessions]);

  const handleNavigate = (tab) => {
    if (tab === 'create') {
      setEditingExercise(null);
    }

    if (tab === 'create-session') {
      setEditingSession(null);
    }

    setActiveTab(tab);
  };

  const handleSaveExercise = (savedExercise) => {
    setExercises((currentExercises) => {
      const alreadyExists = currentExercises.some(
        (exercise) => exercise.id === savedExercise.id
      );

      if (alreadyExists) {
        return currentExercises.map((exercise) =>
          exercise.id === savedExercise.id ? savedExercise : exercise
        );
      }

      return [savedExercise, ...currentExercises];
    });

    setEditingExercise(null);
    setActiveTab('library');
  };

  const handleEditExercise = (exercise) => {
    setEditingExercise(exercise);
    setActiveTab('create');
  };

  const handleDuplicateExercise = (exercise) => {
    const duplicatedExercise = {
      ...exercise,
      id: Date.now().toString(),
      title: `${exercise.title || 'Exercice'} - Copie`,
      positions: Array.isArray(exercise.positions)
        ? exercise.positions.map((position) => ({ ...position }))
        : [],
      createdAt: new Date().toISOString(),
      updatedAt: undefined,
    };

    setExercises((currentExercises) => [duplicatedExercise, ...currentExercises]);
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

  const handleSaveSession = (savedSession) => {
    setSessions((currentSessions) => {
      const alreadyExists = currentSessions.some(
        (session) => session.id === savedSession.id
      );

      if (alreadyExists) {
        return currentSessions.map((session) =>
          session.id === savedSession.id ? savedSession : session
        );
      }

      return [savedSession, ...currentSessions];
    });

    setEditingSession(null);
    setActiveTab('sessions');
  };

  const handleEditSession = (session) => {
    setEditingSession(session);
    setActiveTab('create-session');
  };

  const handleDuplicateSession = (session) => {
    const duplicatedSession = {
      ...session,
      id: `session-${Date.now()}`,
      title: `${session.title || 'Séance'} - Copie`,
      exerciseIds: Array.isArray(session.exerciseIds)
        ? [...session.exerciseIds]
        : [],
      createdAt: new Date().toISOString(),
      updatedAt: undefined,
    };

    setSessions((currentSessions) => [duplicatedSession, ...currentSessions]);
  };

  const handleDeleteSession = (sessionId) => {
    setSessions((currentSessions) =>
      currentSessions.filter((session) => session.id !== sessionId)
    );
  };

  const handleRemoveExerciseFromSession = (sessionId, exerciseId) => {
    setSessions((currentSessions) =>
      currentSessions.map((session) => {
        if (session.id !== sessionId) return session;

        return {
          ...session,
          exerciseIds: (session.exerciseIds || []).filter(
            (id) => id !== exerciseId
          ),
          updatedAt: new Date().toISOString(),
        };
      })
    );
  };

  return (
    <div className="flex h-screen bg-main text-slate-100 overflow-hidden">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={handleNavigate}
        exerciseCount={exercises.length}
        sessionCount={sessions.length}
      />

      <main className="flex-1 overflow-y-auto p-8">
        {activeTab === 'library' && (
          <LibraryView
            exercises={exercises}
            onDelete={handleDeleteExercise}
            onImport={handleImportExercises}
            onEdit={handleEditExercise}
            onDuplicate={handleDuplicateExercise}
          />
        )}

        {activeTab === 'create' && (
          <CreateExerciseView
            onSave={handleSaveExercise}
            exerciseToEdit={editingExercise}
          />
        )}

        {activeTab === 'sessions' && (
          <SessionLibraryView
            sessions={sessions}
            exercises={exercises}
            onDelete={handleDeleteSession}
            onEdit={handleEditSession}
            onDuplicate={handleDuplicateSession}
            onRemoveExercise={handleRemoveExerciseFromSession}
          />
        )}

        {activeTab === 'create-session' && (
          <CreateSessionView
            exercises={exercises}
            onSave={handleSaveSession}
            sessionToEdit={editingSession}
          />
        )}
      </main>
    </div>
  );
}
