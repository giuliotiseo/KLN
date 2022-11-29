import CardDetails from "../../../globals/components/dataDisplay/CardDetails";
import PalletTravelPicker from "./PalletTravelPicker";
import InputText from "../../../globals/components/dataEntry/InputText";
import { FiCheck  } from "react-icons/fi"; 
import InlineSpinner from "../../../globals/components/spinners/InlineSpinner";

export default function PalletTravelFinder({
  title = "Identificativo viaggio",
  travelStamp,
  travel_id,
  onChangeStamp = () => console.log('Default update travel stamp in <PalletTravelFinder />'),
}) {
  return (
    <CardDetails
      className="my-4"
      header={<b className="block py-2">{travel_id ? 'Caricamento viaggio' : title}</b>}
    >
      { travel_id
        ? <InlineSpinner />
        : <>
          <InputText
            id="travelStamp"
            label="ID Viaggio"
            selected={travelStamp || ""}
            callback={(value) => onChangeStamp(value)}
            className="mb-2"
            labelClassName="w-[80px] mr-2"
            iconButton={() => <FiCheck />}
            contentClassName="w-full"
            forceUpperCase={true}
            onBlurCallback={true}
          />

          <PalletTravelPicker
            stamp={travelStamp || ""}
            root="create"
          />
        </>
      }

    </CardDetails>
  )
}