import Pitch from './Pitch';

export default function LibraryView({ exercises }) {
  if (exercises.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-3xl">
          📋
        </div>
        <h3 className="text-xl font-bold text-slate-200">Aucun exercice pour le moment</h3>
        <p className="text-slate-400 text-sm max-w-sm">
          Ta bibliothèque est vide. Clique sur « Nouvel exercice » dans le menu à gauche pour créer ton tout premier schéma tactique !
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 gap-6 h-full">
      <div className="col-span-4 space-y-4">
        <h2 className="text-xl font-bold tracking-wider uppercase text-slate-100">Bibliothèque</h2>
        <div className="space-y-3">
          {exercises.map((ex) => (
            <div
              key={ex.id}
              className="p-4 rounded-xl border bg-slate-800/40 border-slate-800"
            >
              <h3 className="font-bold text-slate-100">{ex.title}</h3>
              <p className="text-xs text-slate-400 mt-1">{ex.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="col-span-8 bg-slate-800/30 border border-slate-800 rounded-2xl p-6 space-y-6">
        <h1 className="text-3xl font-black text-slate-100 uppercase">{exercises[0]?.title}</h1>
        <Pitch positions={exercises[0]?.positions} />
      </div>
    </div>
  );
}