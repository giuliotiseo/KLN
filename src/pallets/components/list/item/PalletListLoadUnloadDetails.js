import { SmallParagraph } from "../../../../globals/components/typography/paragraphs"
import { RiArrowLeftRightFill } from "react-icons/ri";

const PalletListLoadUnloadDetails = ({
  loadQuantity,
  unloadQuantity,
}) => {
  return (
    <div className="inline-flex items-center uppercase mt-2 text-dark-50 dark:text-light-300">
      <SmallParagraph>Carica <b>{loadQuantity}</b></SmallParagraph>
      <RiArrowLeftRightFill className="mx-1" />
      <SmallParagraph>Scarica <b>{unloadQuantity}</b></SmallParagraph>
    </div>
  )
}

export default PalletListLoadUnloadDetails;