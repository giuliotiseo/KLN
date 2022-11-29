import { useEffect, useState } from "react";
import { v4 } from "uuid";
import ActionButton from "../../../globals/components/buttons/ActionButton";
import InputStatusLabel from "./InputStatusLabel";

// Main components -------------------------------------------------------------------------------------------------------------------
export default function InputIban({
  id = v4(),
  label = "IBAN",
  selected = "",
  placeholder = "",
  className = "",
  labelClassName="",
  textButton = "",
  iconButton = null,
  forceUpperCase = false,
  onBlurCallback = false,
  callback = (value) => console.log('Default text result <InputIban />', value),
  isError = false,
}){
  const [ value, setValue ] = useState(selected);
  const isEdit = value !== selected;
  const isConfirmed = value !== "" && value === selected;
  const isEmpty = value === "";

  useEffect(() => {
    if(!selected) {
      setValue("");
    } else {
      setValue(selected);
    }
  }, [selected, id]);

  return (
    <div className={`flex items-center ${className}`}>
      <p className={`label ${labelClassName}`}>{label}</p>
      <div className={`input w-full flex items-center ${isError && 'input--error'}`}>
        <InputStatusLabel
          id={id}
          isEdit={isEdit}
          isEmpty={isEmpty}
          isError={isError}
          isConfirmed={isConfirmed}
          className="mr-2"
        />

        <input
          id={id}
          value={value}
          onChange={({ target: { value }}) => setValue(forceUpperCase ? value.toUpperCase() : value )}
          className="bg-transparent block w-full outline-none"
          placeholder={placeholder}
          onKeyPress={(e) => e.key === 'Enter' && callback({ id, value })}
          onBlur={() => onBlurCallback ? callback({ id, value }) : null}
        />
      </div>
      
      <ActionButton
        styles="btn-primary ml-2"
        icon={iconButton}
        text={textButton}
        onClick={() => callback({ id, value })}
        disabled={isConfirmed}
      />
    </div>
  )
}