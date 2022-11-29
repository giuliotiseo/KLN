export default function SearchFilter({ label, icon, placeholder = 'es. Mario Rossi', searchString, setSearchString, onPressEnter }) {
  return (
    <div className="w-full">
      <label className="flex items-center mb-2 w-full text-sm opacity-70 bold text-dark-300 dark:text-light-100">
        { icon && icon() }
        <span className="inline-block">{label}</span>
      </label>
      <input 
        type="text"
        value={searchString} 
        placeholder={placeholder}
        onChange={(e) => setSearchString(e.target.value)} 
        className="input w-full"
        onKeyPress={(e) => e.key === 'Enter' && onPressEnter()}
      />
    </div>
  )
}