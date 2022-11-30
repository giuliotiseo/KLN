import { useEffect } from "react";
import { useState } from "react";
import { FiCheckSquare, FiSquare } from "react-icons/fi";
import Button from "../../../globals/components/buttons_v2/Button";
import InputText from "../../../globals/components/dataEntry_v2/InputText";
import CheckpointManualCompiler from "./form/CheckpointManualCompiler";
import CheckpointThirdCompanySelector from "./form/CheckpointThirdCompanySelector";
import CheckpointThirdCompanyWarehouseSelector from "./form/CheckpointThirdCompanyWarehouseSelector";

export default function CheckpointCompilerForm ({
  checkpoint,
  dispatch,
  confirmCheckpoint,
  reset,
  className = ""
}) {
  const [ thirdCompanyForm, setThirdCompanyForm ] = useState(checkpoint?.thirdCompany?.id ? true : false);

  useEffect(() => {
    if(!checkpoint?.thirdCompany?.id) {
      setThirdCompanyForm(false);
    } else {
      setThirdCompanyForm(true);
    }
  }, [checkpoint?.thirdCompany]);

  return (
    <div className={className}>
      <h4 className="title-4">Imposta nome</h4>
      <InputText
        label="Nome punto di interesse"
        value={checkpoint?.name || ""}
        className="w-full flex-col"
        contentClassName="w-full"
        inputClassName="text-left"
        placeholder="Es. Hub principale"
        callback={({ value }) => dispatch({ type: "change_checkpoint", name: "name", value })}
      />

      <CheckpointThirdCompanySelector
        checkpoint={checkpoint}
        dispatch={dispatch}
      />
      
      { checkpoint?.thirdCompany?.id && <>
          <h4 className="title-4">Cambia metodo di compilazione</h4>
          <Button
          icon={!thirdCompanyForm ? <FiCheckSquare className='mr-2 opacity-100 text-primary-200 dark:text-primary-300' /> : <FiSquare className='mr-2' />}
          text={<div className='flex items-center text-left'>Compilazione manuale</div>}
          className={`
            text-lg flex items-center pl-0 py-0
            ${ !thirdCompanyForm ? 'opacity-100' : 'opacity-70 hover:opacity-100 transition-opacity duration-200'}
          `}
          onClick={() => setThirdCompanyForm(prev => !prev)}
        />
      </>}

      { thirdCompanyForm && checkpoint?.thirdCompany?.id
        ? <CheckpointThirdCompanyWarehouseSelector checkpoint={checkpoint} dispatch={dispatch} />
        : <CheckpointManualCompiler checkpoint={checkpoint} dispatch={dispatch} />
      }

      <div className="flex items-center gap-2">
        <Button
          text="Annulla"
          className="btn-outline flex flex-1 text-center align-items justify-center"
          onClick={reset}
        />

        <Button
          text="Conferma"
          className="btn-primary flex flex-1 text-center align-items justify-center"
          onClick={confirmCheckpoint}
        />
      </div>
    </div>
  )
}