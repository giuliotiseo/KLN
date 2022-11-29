import { useState, useEffect } from "react";

export default function SearchText({ label, placeholder, research, styles }) {
  const [ search, setSearch ] = useState('');
  const [ loading, setLoading ] = useState(false);

  useEffect(() => {
    setSearch('');
  }, [research]);

  const runEnter = () => {
    setLoading(true);
    if(research) {
      research(search);
    } else {
      console.error('Errore: funzione research non trovata');
    }
    setLoading(false);
  }

  return (
    <div className={`relative ${styles}`}>
      { label && (
        <label className="block mb-2 w-full opacity-70 text-sm">
          {label}
        </label>
      )}

      <div className="flex flex-row items-center my-1">
        <input
          type="search"
          className="input w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          disabled={loading}
          placeholder={placeholder || 'Cerca...'}
          onKeyPress={(e) => e.key === 'Enter' && runEnter()}
        />
      </div>
    </div>
  )
}