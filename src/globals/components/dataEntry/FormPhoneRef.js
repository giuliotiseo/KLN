import { useState } from 'react';
import BasicSelector from './BasicSelector';
const allowedPrefix = ["+39"];

export default function FormPhoneRef(props) {
  const [ prefix, setPrefix ] = useState(allowedPrefix[0]);

  const {
    label,
    placeholder,
    name,
    phoneRef,
    hidePrefix,
    prefixRef,
    value,
  } = props;

  return ( 
    <div className="flex relative mt-2 w-full">
      { !hidePrefix && (
        <div className="mr-2 items-center">
          <BasicSelector 
            id="prefix"
            label="Prefisso"
            value={prefix}
            onChange={(value) => setPrefix(value)}
            selectRef={prefixRef}
            styles="input"
          >
            { allowedPrefix.map(p => <option key={p} value={p}>{p}</option>)}
          </BasicSelector>
        </div>
      )}

      <div className="mb-3 w-full">
        <label htmlFor="phone" className="label">
          { label }
        </label>
        <input
          autoComplete="new-password"
          autoCorrect="off"
          spellCheck="off"
          className="input w-full"
          ref={phoneRef}
          defaultValue={value}
          id={name}
          name={name}
          type="text"
          placeholder={placeholder}
        />
      </div>
    </div>
  )
}