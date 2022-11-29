import ActionButton from "../../../../globals/components/buttons/ActionButton";
import WindowCompiler from "../../../../warehouses/components/WindowCompiler";
import { SmallTitle, TinyTitle } from "../../../../globals/components/typography/titles";
import { forcedCapitalize } from "../../../../globals/libs/helpers";
import { windowOppositeTypes } from "../../../libs/reducers";
import { starterWindow } from "../../../libs/helpers";
import { FiCopy } from "react-icons/fi";

export default ({ checkpoint, dispatch, styles }) => (
  <section className={styles}>
    <SmallTitle styles="mb-2">Disponibilità punto di interesse</SmallTitle>

    { Object.keys(checkpoint.windows).map(type => (
      <div key={type}>
        <div className="flex items-center justify-between mt-2">
          <TinyTitle>{forcedCapitalize(type)}</TinyTitle>
          <ActionButton
            text={`Copia ${windowOppositeTypes[type].toLowerCase()}`}
            icon={() => <FiCopy />}
            styles="btn-primary-outline text-sm"
            onClick={() => dispatch({ type: "copy_paste", windowType: windowOppositeTypes[type] })}
          />
        </div>
        <label className="label">Indica finestre di <b>{type.toLowerCase()}</b></label>

        { checkpoint.windows?.[type] && checkpoint.windows[type].map((win, index) => (
          <WindowCompiler
            key={index}
            title={`Finestra di ${type.toLowerCase()}`}
            index={index}
            window={win}
            dispatchWindows={dispatch}
            styles={`border border-light-100 dark:border-dark-200 p-4 rounded-md ${ index < 1 && 'mb-6'}`}
          />
        ))}

        { checkpoint.windows?.[type]?.length < 2 && <ActionButton
          styles="btn-primary mt-4 mb-6"
          text={`Aggiungi finestra di ${type.toLowerCase()}`}
          onClick={() => dispatch({ type: "add_window", value: {...starterWindow, type }})}
        /> }
      </div>
    ))}
  </section>
)