import ActionButton from "../buttons/ActionButton"
// import { SmallParagraph } from "../typography/paragraphs"
import { FiX, FiFilter } from "react-icons/fi";

export default function FloatingBoxButton({
  isOpen = () => false,
  setIsOpen = () => console.log('Default log callback for: <FloatinBoxButton />'),
  labelOpen = "Apri",
  labelClose = "Chiudi"
  // isFilterActive,
}) {
  return (
    <div className="fixed right-6 bottom-6 flex justify-end" data-tip={`${isOpen ? labelClose : labelOpen }`}>
      <ActionButton
        styles="btn-primary mr-2"
        onClick={() => setIsOpen(prev => !prev)}
        icon={() => isOpen ? <FiX /> : <FiFilter />}
      />
    </div>
  )
}