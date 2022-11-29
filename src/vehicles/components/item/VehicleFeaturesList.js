import { FiArrowRight, FiCheck, FiX } from "react-icons/fi";
import { Paragraph } from "../../../globals/components/typography/paragraphs";
import { SmallTitle } from "../../../globals/components/typography/titles";
import { intNuberWithSpaces } from "../../../globals/libs/helpers";
import { BULKHEAD_DESCRIPTION } from "../../libs/helpers";

const VehicleFeaturesList = (props) => { 
  const { axle, bulkhead, fuel, kilometers, tailLift } = props;
  return (
    <div>
      <SmallTitle styles="mb-2">Caratteristiche basilari veicolo</SmallTitle>
      { axle && <Paragraph styles="flex items-center"><FiArrowRight className="mr-1 opacity-50" /> {axle} assi</Paragraph> }
      { tailLift !== null 
        ? tailLift === 1
          ? <Paragraph styles="flex items-center"><FiCheck className="mr-1 opacity-50" /> Presenza di sponda idraulica</Paragraph> 
          : <Paragraph styles="flex items-center"><FiX className="mr-1 opacity-50" /> Assenza di sponda idraulica</Paragraph> 
        : null
      }
      { bulkhead && <Paragraph styles="flex items-center"><FiArrowRight className="mr-1 opacity-50" /> {BULKHEAD_DESCRIPTION[bulkhead]}</Paragraph> }
      { kilometers && <Paragraph styles="flex items-center"><FiArrowRight className="mr-1 opacity-50" /> {intNuberWithSpaces(parseFloat(kilometers))} km registrati</Paragraph> }
      { fuel && <Paragraph styles="flex items-center"><FiArrowRight className="mr-1 opacity-50" /> Carburante {fuel}</Paragraph> }
    </div>
  )
}

export default VehicleFeaturesList;