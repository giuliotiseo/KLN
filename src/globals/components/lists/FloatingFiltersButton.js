import ActionButton from "../buttons/ActionButton"
// import { SmallParagraph } from "../typography/paragraphs"
import { FiX, FiFilter } from "react-icons/fi";

export default function FloatingFiltersButton({
  isOpenFilters,
  setIsOpenFilters,
  // isFilterActive,
}) {
  return (
    <div className="fixed right-6 bottom-6 flex justify-end" data-tip={`${isOpenFilters ? 'Chiudi' : 'Filtra elenco'}`}>
      {/* { isFilterActive && <SmallParagraph styles="chip-neutral">Filtri attivi</SmallParagraph> } */}
      <ActionButton
        styles="btn-primary mr-2"
        onClick={() => setIsOpenFilters(prev => !prev)}
        icon={() => isOpenFilters ? <FiX /> : <FiFilter />}
      />
    </div>
  )
}