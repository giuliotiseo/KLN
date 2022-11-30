import { FiCheckSquare, FiSquare } from "react-icons/fi";
import Button from "../../../../globals/components/buttons_v2/Button";
import InputBoundNumber from "../../../../globals/components/dataEntry_v2/InputBoundNumber";
import TextEditor from "../../../../globals/components/dataEntry_v2/TextEditor";
import CheckpointTradeSelector from "../summary/CheckpointTradeSelector";
import CheckpointAccessForm from "./CheckpointAccessForm";
import CheckpointAssetsForm from "./CheckpointAssetsForm";
import CheckpointAvailabilityForm from "./CheckpointAvailabilityForm";
import CheckpointBasicInfo from "./CheckpointBasicInfo";
import CheckpointContactsForm from "./CheckpointContactsForm";

const CheckpointManualCompiler = ({
  className = "",
  checkpoint,
  dispatch
}) => {
  return (
    <div className={className}>
      <h4 className="title-4">Trova indirizzo</h4>
      <CheckpointBasicInfo
        checkpoint={checkpoint}
        dispatch={dispatch}
      />

      <CheckpointAccessForm
        checkpoint={checkpoint}
        dispatch={dispatch}
        className="flex flex-col mt-6"
      />

      <CheckpointAvailabilityForm
        checkpoint={checkpoint}
        dispatch={dispatch}
        className="mt-4"
      />

      <h4 className="title-4">Dettagli punto di interesse</h4>
      <CheckpointTradeSelector
        selectedTrades={checkpoint?.trades || []}
        setSelectedTrades={trade => dispatch({ type: "change_checkpoint", name: "trades", value: checkpoint?.trades?.includes(trade)
          ? checkpoint.trades.filter(t => t !== trade)
          : checkpoint.trades.concat(trade)
        })}
        label="Ambito di utilizzo"
      />

      <InputBoundNumber
        label="Numero baie di carico"
        error="Valore non ammesso"
        inputValue={checkpoint.cargoBay}
        showZero={true}
        onChange={value => dispatch({ type: "change_checkpoint", name: "cargoBay", value })}
        min={0}
        max={99}
      />

      <Button
        icon={checkpoint?.containerUnloading ? <FiCheckSquare className='mr-2 opacity-100 text-primary-200 dark:text-primary-300' /> : <FiSquare className='mr-2' />}
        text={<div className='flex items-center text-left'>Disponibilità scarico container</div>}
        className={`
          text-lg flex items-center pl-0 py-0 mt-8
          ${ checkpoint?.containerUnloading ? 'opacity-100' : 'opacity-70 hover:opacity-100 transition-opacity duration-200'}
        `}
        onClick={() => dispatch({ type: "change_checkpoint", name: "containerUnloading", value: !checkpoint?.containerUnloading })}
      />

      <CheckpointAssetsForm
        checkpoint={checkpoint}
        dispatch={dispatch}
        className="mt-6"
      />

      <CheckpointContactsForm
        checkpoint={checkpoint}
        dispatch={dispatch}
        className="mt-6"
      />

      <div className="mt-6 pb-4">
        <TextEditor
          title="Annotazioni contatto"
          titleClassName="title-4 block"
          content={checkpoint?.note}
          onSaveTextEditor={(content) => dispatch({ type: "change_checkpoint", name: "note",  value: content })}
          label="Note punto di interesse"
          actionButtonPosition="INTERNAL"
          showList={true}
        />
      </div>
    </div>
  )
}

export default CheckpointManualCompiler
