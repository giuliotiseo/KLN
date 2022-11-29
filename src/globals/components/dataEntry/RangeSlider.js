export default function RangeSlider({ label, min, max, descriptor, step = 1, value, onChange, styles }) {
  return (
    <div className={`${styles}`}>
      <label className="label">{label}</label>
      <div className="flex items-center">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          className="range flex-1"
          onChange={(e) => onChange(e.target.value)}
          step={step}
        />
      </div>
      <p className="text-lg mt-2">{descriptor}</p>
    </div>
  )
}