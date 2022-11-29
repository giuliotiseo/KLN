import ControlledSelector from "../../../globals/components/dataEntry/ControlledSelector";
import { TRAVEL_TYPE_DESCRIPTION } from "../../../globals/libs/models";

const TravelTypeModel = Object.keys(TRAVEL_TYPE_DESCRIPTION);
export default ({
  onChange,
  label,
  id,
  value,
  className
}) => (
  <ControlledSelector
    id={id} 
    value={value} 
    onChange={onChange}
    label={label}
    styles={className}
  >
    <option key={"EMPTY"} value={""}>
      - Scegli opzione -
    </option>

    { TravelTypeModel.map(travelType => (
      <option key={travelType} value={travelType}>
        {TRAVEL_TYPE_DESCRIPTION[travelType]}
      </option>
    ))}
  </ControlledSelector>
)