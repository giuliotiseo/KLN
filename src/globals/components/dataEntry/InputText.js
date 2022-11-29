import { useEffect, useState } from "react";
import { v4 } from "uuid";
import ActionButton from "../../../globals/components/buttons/ActionButton";
import InputStatusLabel from "./InputStatusLabel";

// Main components -------------------------------------------------------------------------------------------------------------------
export default function InputText({
  id = v4(),
  label = null,
  selected = null,
  placeholder = "",
  className = "",
  labelClassName="",
  textButton = "",
  iconButton = null,
  forceUpperCase = false,
  statusLabel = true,
  loading,
  contentClassName = "",
  onBlurCallback = false,
  callback = (value) => console.log('Conferma testo <InputText />', value),
  isError = false,
}){
  const [ value, setValue ] = useState(selected);
  const isEdit = value !== selected;
  const isConfirmed = value !== "" && value === selected;
  const isEmpty = value === "";

  useEffect(() => {
    if(!selected) setValue("")
    else {
      setValue(selected);
    };
  }, [selected]);

  return (
    <div className={`flex items-center ${className}`}>
      { label && <p className={`label ${labelClassName}`}>{label}</p> }
      <div className={`flex items-center ${contentClassName}`}>
        <div className={`flex items-center input w-full ${isError && 'input--error'}`}>
          { statusLabel && <InputStatusLabel
            id={id}
            isEdit={isEdit}
            isEmpty={isEmpty}
            isConfirmed={isConfirmed}
            className="mr-2"
            isError={isError}
          /> }

          <input
            id={id}
            value={value}
            onChange={({ target: { value }}) => !loading && setValue(forceUpperCase ? value.toUpperCase() : value )}
            className={`bg-transparent block w-full outline-none ${loading && 'pointer-events-none'}`}
            placeholder={placeholder}
            onBlur={() => onBlurCallback && !loading ? callback({ value, id }) : null}
            onKeyPress={(e) => e.key === 'Enter' && !loading && callback({ value, id })}
          />
        </div>

        <ActionButton
          styles="btn-primary ml-2"
          icon={iconButton}
          text={textButton}
          onClick={() => callback({ value, id })}
          disabled={isConfirmed}
          loading={loading}
        />
      </div>
    </div>
  )
}