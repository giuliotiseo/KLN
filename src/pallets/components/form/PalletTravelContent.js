import { SmallParagraph } from "../../../globals/components/typography/paragraphs";
import { formatDate } from "../../../globals/libs/helpers"
import { TRAVEL_DESCRIPTOR } from "../../../travels/libs/helpers";

const PalletTravelContent = ({
  travel
}) => {
  return <>
    <SmallParagraph>
      <b>Partito il:</b> {formatDate(new Date(travel.departureDate), "Ppp")}
    </SmallParagraph>
    <SmallParagraph>
      <b>Partenza da:</b> {travel.start.checkpoint.location.address}
    </SmallParagraph>
    <SmallParagraph>
      <b>Autista:</b> {travel.driverName}
    </SmallParagraph>
    <div>
      <SmallParagraph>
        <b>Veicoli:</b> {travel.vehicleName} (targa: {travel.licensePlate})
      </SmallParagraph>
    </div>
    <SmallParagraph>
      <b>Stato attuale del viaggio:</b> {TRAVEL_DESCRIPTOR[travel.status]}
    </SmallParagraph>
  </>
}

export default PalletTravelContent;