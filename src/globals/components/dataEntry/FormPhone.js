import BasicSelector from './BasicSelector';
const allowedPrefix = ["+39"];

export default function FormPhone(props) {
  const {
    label,
    placeholder,
    name,
    disabled,
    value,
    onChange,
    prefix,
    onChangePrefix,
  } = props;

  return ( 
    <div className="flex w-full my-2">
      { prefix && ( <div className="items-center mr-2">
        <BasicSelector 
          id="prefix"
          label="Prefisso"
          disabled={disabled}
          value={prefix}
          onChange={(value) => onChangePrefix(value)}
          styles="input"
        >
          { allowedPrefix.map(p => <option key={p} value={p}>{p}</option>)}
        </BasicSelector>
      </div> )}

      <div className="mb-3 w-full">
        <label htmlFor="phone" className="label">
          { label }
        </label>
        <input
          className="input w-full"
          disabled={disabled}
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(e)}
          type="text"
          placeholder={placeholder}
          autoComplete="new-password"
          autoCorrect="off"
          spellCheck="off"
        />
      </div>
    </div>
  )
}