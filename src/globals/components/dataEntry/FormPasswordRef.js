import React, { useState } from 'react';

export default function FormPassword(props) {
  const [ type, setType ] = useState(false);

  const {
    passwordRef, 
    label,
    placeholder, 
    name,
  } = props;

  return (
    <div className="relative my-2 w-full">
      <label htmlFor={name} className="label">{label}</label>
      <input
        autoComplete="new-password"
        autoCorrect="off"
        spellCheck="off"
        ref={passwordRef}
        className="input w-full" 
        id={name} 
        name={name}
        type={type === false ? 'password' : 'text'}
        placeholder={placeholder || ''}
      />
      <div onClick={() => setType(!type)} className="bg-transparent outline-none border-none cursor-pointer absolute right-4 top-9">
        <ShowHideSvg color={type ? 'on' : 'off'} />
      </div>
    </div>
  )
}

function ShowHideSvg(props) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M12 9a3.02 3.02 0 00-3 3c0 1.642 1.358 3 3 3 1.641 0 3-1.358 3-3 0-1.641-1.359-3-3-3z"
        fill={props.color === 'on' ? '#2883BA' : '#848E9E'}
      />
      <path
        d="M12 5c-7.633 0-9.927 6.617-9.948 6.684L1.946 12l.105.316C2.073 12.383 4.367 19 12 19s9.927-6.617 9.948-6.684l.106-.316-.105-.316C21.927 11.617 19.633 5 12 5zm0 12c-5.351 0-7.424-3.846-7.926-5C4.578 10.842 6.652 7 12 7c5.351 0 7.424 3.846 7.926 5-.504 1.158-2.578 5-7.926 5z"
        fill={props.color === 'on' ? '#2883BA' : '#848E9E'}
      />
    </svg>
  )
}

