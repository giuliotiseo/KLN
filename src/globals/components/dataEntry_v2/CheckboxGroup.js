import { v4 } from "uuid";
import InputCheckbox from "./InputCheckbox";
import { capitalize } from "../../libs/helpers";

export default function CheckboxGroup({
  label,
  optionsType,
  values = [],
  onChange,
  options,
  className = "",
  checkboxContainerClassName = "",
  capitalizeText = false,
  optionClassName = ""
}) {
  if(!optionsType) return null;

  return (
    <fieldset className={className}>
      <legend className="label whitespace-normal">{label}</legend>
      <div className={checkboxContainerClassName}>
        { optionsType === 'object' && Object.keys(options).map(opt_val => (
          <InputCheckbox
            key={opt_val}
            id={opt_val}
            name={`checkgroup_${v4()}`}
            label={capitalizeText ? capitalize(options[opt_val]) : options[opt_val]}
            value={opt_val}
            initialValues={values}
            className={optionClassName}
            callback={() => onChange(opt_val)}
          />
        ))}

        { optionsType === 'array' && options.map((opt_val, index) => 
          <InputCheckbox
            key={opt_val}
            id={opt_val}
            name={`checkgroup_${v4()}`}
            label={capitalizeText ? capitalize(opt_val) : opt_val}
            value={index}
            className={optionClassName}
            initialValues={values}
            callback={(value) => values.includes(value) 
              ? onChange(values.filter(v => v !== value))
              : onChange(values.concat(value))
            }
          />
        )}
      </div>
    </fieldset>
  )
}