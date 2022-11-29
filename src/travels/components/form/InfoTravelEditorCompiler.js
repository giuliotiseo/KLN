import { useDispatch, useSelector } from "react-redux";
import ActionButton from "../../../globals/components/buttons/ActionButton";
import { SmallParagraph } from "../../../globals/components/typography/paragraphs";
import { SmallTitle } from "../../../globals/components/typography/titles";
import { changeTravelEditorDepartureDate, changeTravelEditorTravelType, selectTravelEditorDepartureDate, selectTravelEditorEstimatedTravelLength, selectTravelEditorEstimatedTravelTime, selectTravelEditorTravelType } from "../../slices/travelEditorSlice";
import TravelDepartureDate from "./TravelDepartureDate";
import TravelTypeSelector from "./TravelTypeSelector";

export default function InfoTravelEditorCompiler({
  className = "",
  calculateRoute,
  trip,
}) {
  const travelType = useSelector(selectTravelEditorTravelType);
  const departureDate = useSelector(selectTravelEditorDepartureDate);
  const estimatedTravelTime = useSelector(selectTravelEditorEstimatedTravelTime)
  const estimatedTravelLength = useSelector(selectTravelEditorEstimatedTravelLength)
  const dispatch = useDispatch();
  
  return (
    <div className={className}>
      <div className="bg-base-100 mt-4 p-4 rounded-md">
        <SmallTitle>Info di viaggio</SmallTitle>
        <TravelTypeSelector
          id="travelType"
          value={travelType}
          onChange={(value) => dispatch(changeTravelEditorTravelType(value))}
          label={"Indica tipologia viaggio"}
          className="w-full"
        />

        <TravelDepartureDate
          className="flex-col mt-4"
          label="Data di partenza"
          placeholder="Indica data e orario di inizio viaggio"
          value={departureDate}
          callback={({ value }) => dispatch(changeTravelEditorDepartureDate(value))}
        />
        
        <div className="mt-4">
          { estimatedTravelTime && <SmallParagraph>Tempo di percorrenza stimato: {estimatedTravelTime.text}</SmallParagraph> }
          { estimatedTravelLength && <SmallParagraph>Distanza calcolata: {estimatedTravelLength.text}</SmallParagraph> }
        </div>

        { trip && Object.keys(trip)?.length > 2 &&
          <ActionButton
            text="Calcola percorso"
            onClick={calculateRoute}
            styles="btn-primary mt-4"
          />
        }
      </div>
    </div>
  )
}