import { FiCodepen } from "react-icons/fi";
import { AiOutlineColumnHeight, AiOutlineColumnWidth, AiOutlineImport } from "react-icons/ai";
import { Paragraph } from "../../../globals/components/typography/paragraphs";
import { SmallTitle } from "../../../globals/components/typography/titles";

const VehicleDimensions = ({ dimensions: { x, y, z }, trailType}) => {
  return (
    <div className="flex mx-2">
    <FiCodepen className="text-3xl text-primary-200 dark:text-primary-300" />
    <div className="flex flex-col ml-2">
      <SmallTitle>Dimensioni del {trailType}</SmallTitle>
      <Paragraph><AiOutlineColumnWidth className="inline-block mr-1" /> Larghezza: { parseFloat(x).toFixed(2) }m </Paragraph>
      <Paragraph><AiOutlineColumnHeight className="inline-block mr-1" /> Altezza: { parseFloat(z).toFixed(2) }m </Paragraph>
      <Paragraph><AiOutlineImport className="inline-block mr-1 rotate-180" /> Profondità: { parseFloat(y).toFixed(2) }m </Paragraph>
    </div>
  </div>
  )
}

export default VehicleDimensions;