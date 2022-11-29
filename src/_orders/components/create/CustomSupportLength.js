import { useState } from "react";
import { FiX } from "react-icons/fi";
import FormBoundNumber from "../../../globals/components/dataEntry/FormBoundNumber";

/*
  QUESTO MODULO È ANCORA DA SVILUPPARE E AL MOMENTO NON È COLLEGATO
*/

function handleCustomConfirm({ length, wide, updateForm }) {
  console.log('Aggiorna lo stato');
}

export default function CustomSupportLength({ updateForm }) {
  const [length, setLength] = useState(1);
  const [wide, setWide] = useState(1);

  return (
    <div className="block max-w-full">
      {/* <TinyTitle>Imposta dimensioni</TinyTitle> */}
      <div className="flex items-center">
        <FormBoundNumber
          // label="Lunghezza"
          error="Valore non consentito"
          min={1}
          max={999}
          onChange={val => setLength(val)}
          inputValue={length}
          inputStyle="w-12"
        />
        <span className="inline-flex mx-2 font-bold"><FiX /></span>
        <FormBoundNumber
          // label="Larghezza"
          error="Valore non consentito: il valore deve essere pari o inferiore alla lunghrzza"
          min={1}
          max={length}
          onChange={val => setWide(val)}
          inputValue={wide}
          styles="mr-2"
          inputStyle="w-12"
        />
        <button className="btn inline-block bg-primary-200 dark:bg-primary-300 text-light-300" onClick={() => handleCustomConfirm({ length, wide, updateForm })}>Conferma</button>
      </div>
    </div>
  )
}