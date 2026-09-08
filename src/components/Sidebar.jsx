import { BookOpen, Plus } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  return (
    <aside className="w-64 bg-sidebar h-screen p-6 flex flex-col justify-between border-r border-slate-800 shrink-0">
      <div className="space-y-8">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-bold text-xl">
            ⚽
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-wide text-slate-100">FOOTLAB</h1>
            <p className="text-xs text-slate-400">Coach Studio</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          <button
            onClick={() => setActiveTab('library')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
              activeTab === 'library'
                ? 'bg-primary/10 text-primary border border-primary/20'
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <BookOpen size={18} />
            Bibliothèque
          </button>

          <button
            onClick={() => setActiveTab('create')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
              activeTab === 'create'
                ? 'bg-primary/10 text-primary border border-primary/20'
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <Plus size={18} />
            Nouvel exercice
          </button>
        </nav>
      </div>

      {/* Stats rapides */}
      <div className="grid grid-cols-2 gap-3 pt-6 border-t border-slate-800">
        <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-800/80 text-center">
          <span className="block text-xl font-bold text-slate-100">3</span>
          <span className="text-[10px] text-slate-400 uppercase tracking-wider">Exercices</span>
        </div>
        <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-800/80 text-center">
          <span className="block text-xl font-bold text-slate-100">5</span>
          <span className="text-[10px] text-slate-400 uppercase tracking-wider">Catégories</span>
        </div>
      </div>
    </aside>
  );
}