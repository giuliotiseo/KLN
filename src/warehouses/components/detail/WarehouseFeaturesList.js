import { FiArrowRight } from "react-icons/fi";
import { Paragraph } from "../../../globals/components/typography/paragraphs";
import { SmallTitle } from "../../../globals/components/typography/titles";
import { WAREHOUSE_BUILDING_TYPE, WAREHOUSE_SCOPE, WAREHOUSE_SPECIALIZATION } from "../../libs/helpers";

const WarehouseFeaturesList = ({ type, specialization, scope }) => {
  return (
  <div>
    <SmallTitle styles="mb-2">Caratteristiche magazzino</SmallTitle>
    { type && <Paragraph styles="flex items-center"><FiArrowRight className="mr-1 opacity-50" /> {WAREHOUSE_BUILDING_TYPE[type]}</Paragraph> }
    { scope && scope?.length > 0 && <Paragraph styles="flex items-center"><FiArrowRight className="mr-1 opacity-50" /> { scope.map(s => WAREHOUSE_SCOPE[s]).join(', ')}</Paragraph> }
    { specialization && <Paragraph styles="flex items-center"><FiArrowRight className="mr-1 opacity-50" /> {WAREHOUSE_SPECIALIZATION[specialization]}</Paragraph> }
  </div>
)}

export default WarehouseFeaturesList;