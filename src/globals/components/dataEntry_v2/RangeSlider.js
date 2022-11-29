const RangeSlider = ({
  label,
  min,
  max,
  descriptor,
  step = 1,
  value,
  onChange,
  className = ""
}) => {
  return (
    <div className={`${className}`}>
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

export default RangeSlider;