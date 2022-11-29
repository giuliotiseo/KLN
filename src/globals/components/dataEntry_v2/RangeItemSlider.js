import { useEffect, useState } from "react";

export default function RangeItemSlider({ label, values, value, valueDescriptors, onChange, className }) {
  const [ maxVal, setMaxVal ] = useState(0);
  const [ valuePosition, setValuePosition ] = useState(0);

  useEffect(() => {
    if(values && values?.length > 0) {
      setMaxVal(values.length - 1);
    }
  }, [values]);

  useEffect(() => {
    if(value && values?.length > 0) {
      setValuePosition(() => values.indexOf(value) || 0);
    }
  }, [value, values]);

  return (
    <div className={`${className}`}>
      <label className="label">{label}</label>
      <div className="flex items-center">
        <input
          type="range"
          min={0}
          max={maxVal}
          value={valuePosition}
          className="range flex-1"
          onChange={(e) => values[e.target.value] && onChange(values[e.target.value])}
        />
        <p className="text-sm flex-1 ml-2 tracking-wide text-secondary-200 dark:text-secondary-300">{valueDescriptors[values[valuePosition]]}</p>
      </div>
    </div>
  )
}