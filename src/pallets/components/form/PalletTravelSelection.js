import CardDetails from "../../../globals/components/dataDisplay/CardDetails";
import PalletTravelContent from "./PalletTravelContent";

const PalletTravelSelection = ({
  title,
  travel,
  clear,
}) => {
  return (
    <CardDetails
      className="my-4"
      header={<b className="block py-2">{title}</b>}
      clear={clear}
    >
      <PalletTravelContent travel={travel} />
    </CardDetails>
  )
}

export default PalletTravelSelection;