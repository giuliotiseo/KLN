import { useEffect, useState } from "react";
import { v4 } from "uuid";
import CurrencyInput from 'react-currency-input-field';
import { locales } from "../../libs/helpers";

// Main components -------------------------------------------------------------------------------------------------------------------
export default function InputCurrency({
  id = v4(),
  label = "Input di testo",
  value = 0,
  placeholder = "",
  className = "",
  labelClassName = "",
  currency = "EUR",
  onBlurCallback = false,
  callback = (value) => console.log('Conferma testo <InputCurrency />', value)
}){
  return (
    <div className={`flex items-center ${className}`}>
      <p className={`label ${labelClassName}`}>{label}</p>
      <div className="input w-full flex items-center">
        <CurrencyInput
          id={id}
          name={id}
          placeholder={placeholder}
          value={value}
          decimalsLimit={2}
          onBlur={() => onBlurCallback ? callback({ value, id, name: id }) : null}
          onValueChange={(value) => callback({ value, id, name: id })}
          intlConfig={{ locale: locales[window.__localeId__], currency }}
          className="bg-transparent w-full outline-none"
          onKeyPress={(e) => e.key === 'Enter' && callback({ value, id, name: id })}
        />
      </div>
    </div>
  )
}