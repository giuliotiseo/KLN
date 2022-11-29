import { LargeParagraph } from "../../../globals/components/typography/paragraphs";
import TravelStatusDropdown from "./TravelStatusDropdown";
import UpdateLastPositionTravel from "./UpdateLastPositionTravel";
import { TRAVEL_DESCRIPTOR } from "../../libs/helpers";
import { capitalize, globalStatusColorsBorder } from "../../../globals/libs/helpers";

export default function TravelStatusPosition({ travel, updateLastPosition }) {
  const { status } = travel;
  if(!status) return null;

  return (
    <div className={`p-4 bg-light-300 dark:bg-dark-300 rounded-md mt-4 border-l-4 ${globalStatusColorsBorder[status]}`}>
      <div className={`
        flex items-center justify-between`}>
        <LargeParagraph>{ capitalize(TRAVEL_DESCRIPTOR[status]) }</LargeParagraph>
        <TravelStatusDropdown
          travel={travel}
          status={status}
        />
      </div>

      <UpdateLastPositionTravel
        lastPosition={travel?.lastPosition}
        updateLastPosition={updateLastPosition}
      />
    </div>
  )
}