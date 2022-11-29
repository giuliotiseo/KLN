import { MediumTitle } from "../../../globals/components/typography/titles"
import { globalStatusColorsText } from "../../../globals/libs/helpers";
import { FiCornerUpLeft } from "react-icons/fi";
import { ImArrowUp2, ImArrowDown2 } from "react-icons/im";
import { COMPLIANCE_DESCRIPTION } from "../../libs/helpers";
import { BiNote } from "react-icons/bi";

// Constants ---------------------------------------------------------------------------------------------------------------------
const quantityTypes = {
  LOAD: {
    text: "Carica",
    text_2: "Carico",
    icon: <ImArrowUp2 className="mr-1" />
  },
  UNLOAD: {
    text: "Scarica",
    text_2: "Scarico",
    icon: <ImArrowDown2 className="mr-1" />
  },
  REVERSAL: {
    text: "Storno",
    text_2: "Storno",
    icon: <FiCornerUpLeft className="mr-1" />
  },
}

const noteReveal = (note, showModal, setNote, type, compliance) => {
  setNote({
    title: quantityTypes[type].text_2,
    text: note,
    compliance: COMPLIANCE_DESCRIPTION[compliance]
  });

  showModal(true);
}

// Main component ---------------------------------------------------------------------------------------------------------------------
const PalletQuantityViewer = ({
  type,
  value,
  nc_value,
  note,
  nc_note,
  showModal,
  setNote,
}) => {
  return (
    <div className="col-span-1 bg-base-100 rounded-md p-4">
      <header className={`flex justify-center items-center mb-2 ${globalStatusColorsText[type]}`}>
        { quantityTypes[type].icon }
        <MediumTitle styles="uppercase">{quantityTypes[type].text}</MediumTitle>
      </header>

      <div className="flex justify-between py-2">
        <p className="text-xl flex items-center">
          { type === "REVERSAL" ? "Quantità stornata" : "Conformi" }
          { note && (
            <button onClick={() => noteReveal(note, showModal, setNote, type, "COMPLIANT")} className="btn btn-ghost text-sm inline-flex items-center ml-2">
              <BiNote className="mr-1" />
          	</button>
          )}
        </p>
        <p className="text-2xl font-bold">
          { value } EPAL
        </p>
      </div>

      { type !== "REVERSAL" && <div className="flex justify-between py-2 border-t border-light-100 dark:border-dark-100">
        <p className="text-xl flex items-center text-gray-300 dark:text-gray-500">
          Non conformi
          { nc_note && (
            <button onClick={() => noteReveal(nc_note, showModal, setNote, type, "DISPOSABLE")} className="btn btn-ghost text-sm inline-flex items-center ml-2">
              <BiNote className="mr-1" />
          	</button>
          )}
        </p>
        <p className="text-2xl text-gray-300 dark:text-gray-500">
          { nc_value }
        </p>
      </div> }
    </div>
  )
}

export default PalletQuantityViewer;