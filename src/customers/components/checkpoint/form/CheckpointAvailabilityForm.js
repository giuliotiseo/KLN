import Button from "../../../../globals/components/buttons_v2/Button";
import WindowCompiler from "../../../../globals/components/dataEntry_v2/WindowCompiler";
import { forcedCapitalize } from "../../../../globals/libs/helpers";
import { starterWindow, windowOppositeTypes } from "../../../libs/constants";
import { FiCopy, FiPlus } from "react-icons/fi";

const CheckpointAvailabilityForm = ({ checkpoint, dispatch, className }) => {
  return (
    <section className={className}>
      <h4 className="title-4">Disponibilità punto di interesse</h4>

      { Object.keys(checkpoint.windows).map(type => (
        <div key={type}>
          <div className="flex items-center justify-between mt-2">
            <h5 className="title-5">{forcedCapitalize(type)}</h5>
            <Button
              text={`Copia ${windowOppositeTypes[type].toLowerCase()}`}
              icon={<FiCopy />}
              className="btn-ghost text-sm"
              onClick={() => dispatch({ type: "copy_paste", windowType: windowOppositeTypes[type] })}
            />
          </div>
          <label className="label">Indica finestre di <b>{type.toLowerCase()}</b></label>

          { checkpoint.windows?.[type] && checkpoint.windows[type].map((win, index) => (
            <WindowCompiler
              key={index}
              title={`Finestra di ${type.toLowerCase()}`}
              titleClassName="text-sm uppercase font-bold text-secondary-200 dark:text-secondary-300 mb-4"
              index={index}
              window={win}
              days={win?.days || []}
              dispatchWindows={dispatch}
              className={`bg-light-200 dark:bg-dark-200 border border-light-50 dark:border-dark-200 p-4 rounded-md ${ index < 1 && 'mb-6'}`}
            />
          ))}

          { checkpoint.windows?.[type]?.length < 2 && (
            <Button
              className="btn-secondary-outline mb-8"
              icon={<FiPlus />}
              text={`Aggiungi ${type.toLowerCase()}`}
              onClick={() => dispatch({ type: "add_window", value: {...starterWindow, type }})}
            />
          )}
        </div>
      ))}
    </section>
  )
}

export default CheckpointAvailabilityForm;