export default function ExerciseForm({ formData, setFormData }) {
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
          Titre de l'exercice
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="Ex: Circuit de passe"
          className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-primary"
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
            Catégorie
          </label>
          <select
            value={formData.category}
            onChange={(e) => handleChange('category', e.target.value)}
            className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-2.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-primary"
          >
            <option value="TECHNIQUE">Technique</option>
            <option value="TACTIQUE">Tactique</option>
            <option value="PHYSIQUE">Physique</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
            Intensité
          </label>
          <select
            value={formData.intensity}
            onChange={(e) => handleChange('intensity', e.target.value)}
            className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-2.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-primary"
          >
            <option value="Faible">Faible</option>
            <option value="Moyenne">Moyenne</option>
            <option value="Élevée">Élevée</option>
            <option value="Maximale">Maximale</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
            Durée (min)
          </label>
          <input
            type="number"
            value={formData.duration}
            onChange={(e) => handleChange('duration', e.target.value)}
            className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
            Joueurs
          </label>
          <input
            type="number"
            value={formData.playersCount}
            onChange={(e) => handleChange('playersCount', e.target.value)}
            className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
          Description
        </label>
        <textarea
          rows={4}
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Consignes de l'exercice..."
          className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-primary resize-none"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
          Objectifs
        </label>
        <textarea
          rows={3}
          value={formData.objectives}
          onChange={(e) => handleChange('objectives', e.target.value)}
          placeholder="Objectifs tactiques..."
          className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-primary resize-none"
        />
      </div>
    </div>
  );
}