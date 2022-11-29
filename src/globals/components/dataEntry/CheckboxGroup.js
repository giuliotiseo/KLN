import { v4 } from "uuid";
import Checkbox from "./Checkbox";
import { capitalize, toggleValues } from "../../libs/helpers";

export default function CheckboxGroup({
  label,
  optionsType,
  values,
  onChange,
  options,
  styles = "",
  checkboxContainerStyles = "", 
  checkboxStyles = "",
  capitalizeText = false,
  optionStyle = "",
  controlled = false
}) {
  if(!optionsType) return null;

  return (
    <fieldset className={styles}>
      <legend className="label whitespace-normal">{label}</legend>
      <div className={checkboxContainerStyles}>
        { optionsType === 'object' && Object.keys(options).map(opt_val => (
          <Checkbox
            key={opt_val}
            id={opt_val}
            name={`checkgroup_${v4()}`}
            label={capitalizeText ? capitalize(options[opt_val]) : options[opt_val]}
            value={opt_val}
            initialStatus={values.includes(opt_val)}
            labelStyle={optionStyle}
            onChange={(value) => toggleValues({value, values, onChange})} 
            controlled={controlled}
          />
        ))}

        { optionsType === 'array' && options.map((opt_val, index) => 
          <Checkbox
            key={opt_val}
            id={opt_val}
            name={`checkgroup_${v4()}`}
            label={capitalizeText ? capitalize(opt_val) : opt_val}
            value={index}
            labelStyle={optionStyle}
            initialStatus={values.includes(index)}
            styles={checkboxStyles}
            onChange={(value) => toggleValues({value, values, onChange})}
            controlled={controlled}
          />
        )}
      </div>
    </fieldset>
  )
}