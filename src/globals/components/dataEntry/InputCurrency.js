import { useEffect, useState } from "react";
import { v4 } from "uuid";
import CurrencyInput from 'react-currency-input-field';
import ActionButton from "../../../globals/components/buttons/ActionButton";
import InputStatusLabel from "./InputStatusLabel";
import { locales } from "../../libs/helpers";

// Main components -------------------------------------------------------------------------------------------------------------------
export default function InputCurrency({
  id = v4(),
  label = "Input di testo",
  selected = "",
  placeholder = "",
  className = "",
  labelClassName = "",
  textButton = "",
  iconButton = null,
  currency = "EUR",
  onBlurCallback = false,
  callback = (value) => console.log('Conferma testo <InputCurrency />', value)
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
  }, [selected]);

  return (
    <div className={`flex items-center ${className}`}>
      <p className={`label ${labelClassName}`}>{label}</p>
      <div className="input w-full flex items-center">
        <InputStatusLabel
          id={id}
          isEdit={isEdit}
          isEmpty={isEmpty}
          isConfirmed={isConfirmed}
          className="mr-2"
        />

        <CurrencyInput
          id={id}
          name={id}
          placeholder={placeholder}
          value={value}
          decimalsLimit={2}
          onBlur={() => onBlurCallback ? callback({ value, id }) : null}
          onValueChange={(value) => setValue(value)}
          intlConfig={{ locale: locales[window.__localeId__], currency }}
          className="bg-transparent w-full outline-none"
          onKeyPress={(e) => e.key === 'Enter' && callback({value, id })}
        />
      </div>
      
      <ActionButton
        styles="btn-primary ml-2"
        text={textButton}
        icon={iconButton}
        onClick={() => callback({value, id })}
        disabled={isConfirmed}
      />
    </div>
  )
}