import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import ListItem from "../../../globals/components/lists/ListItem";
import EmptyResultPage from "../../../globals/components/layout/EmptyResultPage";
import LinkButton from "../../../globals/components/buttons_v2/LinkButton";
import Button from "../../../globals/components/buttons_v2/Button";
import { SmallParagraph } from "../../../globals/components/typography/paragraphs";
import { BsDiamondHalf, BsDiamondFill, BsDiamond } from "react-icons/bs";
import { FiCopy } from "react-icons/fi";
// Helpers
import { formatDate, formatDistanceDate, removeDuplicates } from "../../../globals/libs/helpers";
import { TRAVEL_TYPE_DESCRIPTION } from "../../libs/helpers";
import { selectCurrentCompany } from "../../../company/slices/companySlice";
import TravelsListItemDropdown from "./TravelsListItemDropdown";
import CopyOnClipboard from "../../../globals/components/buttons_v2/CopyOnClipboard";
import { useDispatch } from "react-redux";
import { changePalletCreatorTravelStamp } from "../../../pallets/slices/palletCreatorSlice";

// Constant ----------------------------------------------------------------------------------------------------------------------------------------------------------
const palletHandlingStatus = {
  EMPTY: {
    text: "Movimentazioni non compilate",
    icon: () => <BsDiamond />,
    color: "text-gray-400 dark:text-gray-500"
  },
  PARTIAL: {
    text: "Movimentazioni parziali",
    icon: () => <BsDiamondHalf />,
    color: "text-yellow-500 dark:text-yellow-400"
  },
  COMPLETED: {
    text: "Movimentazioni completate",
    icon: () => <BsDiamondFill />,
    color: "text-emerald-600 dark:text-emerald-400"
  },
}

// Sub components ----------------------------------------------------------------------------------------------------------------------------------------------------------
const DefaultTravelListItemContent = ({ travel }) => {
  console.log("Vedo travel", { travel });

  return (
    <div>
      <div className="mt-2 mb-4 text-sm">
        <p><b>{travel.driverName}</b> alla guida di <b>{travel.licensePlate}</b></p>
        <p>Partenza il {formatDate(new Date(travel.departureDate), "PPp")}</p>
      </div>

      <div className="my-2 text-sm text-gray-400 dark:text-gray-500">
        <div className="text-gray-400 dark:text-gray-500 hover:text-dark-50 dark:hover:text-light-300 transition-colors">ID viaggio <CopyOnClipboard tipMessage='' tipSuccess='Copiato' hideInternalDataTip={true} inputData={travel.stamp.split('-')[1]} /></div>
        { travel?.estimatedTravelLength && <p>Tempi di percorrenza: {travel?.estimatedTravelTime}</p>}
        { travel?.estimatedTravelLength && <p>Lunghezza percorsa: {travel?.estimatedTravelLength}</p>}

      </div>
    </div>
  )
}


const PalletHandlingsTravelsItemContent = ({ travel, companyId }) => {
  const dispatch = useDispatch();
  if(!travel || !companyId) return null;
  let status = null;
  const stamp = travel.stamp.split('-')[1];
  const n_waypoint = travel.waypoints?.filter(w => w.companyId !== companyId).length;
  let n_palletHandlings = travel?.palletHandlings?.items?.filter(ph => !ph.id.includes("REV"))?.map(filtered_ph => filtered_ph.waypoint.id);
  n_palletHandlings = n_palletHandlings?.length > 0 ? removeDuplicates(n_palletHandlings) : [];
  n_palletHandlings = n_palletHandlings.length;

  // COMPLETED, PARTIAL, EMPTY
  if(n_palletHandlings >= n_waypoint) status = palletHandlingStatus.COMPLETED;
  if(n_palletHandlings < n_waypoint && (n_palletHandlings !== 0)) status = palletHandlingStatus.PARTIAL;
  if(n_palletHandlings === 0) status = palletHandlingStatus.EMPTY;


  console.log("is it a joke", { travel });
  console.log("is it a joke", { n_palletHandlings,  n_waypoint, status });
  return (
    <div className="mt-2">
      <SmallParagraph><b>Partenza:</b> {formatDate(new Date(travel.departureDate), "PPp")}</SmallParagraph>
      <SmallParagraph><b>Autista:</b> {travel.driverName}</SmallParagraph>
      <SmallParagraph><b>Mezzi:</b> {travel.licensePlate}</SmallParagraph>

      <Button
        text="Seleziona viaggio"
        className="btn-primary-outline mt-4 text-sm"
        icon={<FiCopy />}
        onClick={() => dispatch(changePalletCreatorTravelStamp({ value: stamp }))}
      />

      { status && <div className={`mt-4 flex items-center ${status.color}`}>
        <p className="mr-2">{ status.icon() }</p>
        <p className="font-bold">{ status.text }</p>
      </div> }
    </div>
  )
}


// Main component ----------------------------------------------------------------------------------------------------------------------------------------------------------
export default function TravelsList({ travels, showPalletHandlingsStatus = false }) {
  const [ searchParams ] = useSearchParams();
  const companyType = searchParams.get("company");
  const listStatus = searchParams.get("status");
  
  const message = {
    ALL: "Nessun viaggio registrato",
    STATIONARY: "Nessun viaggio in partenza",
    PICKUP: "Nessun viaggio in fase di ritiro",
    DEPOT: "Nessun viaggio in fase di rientro dal carico",
    DELIVERY: "Nessun viaggio in fase di consegna",
    RETURN: "Nessun viaggio in fase di rientro dalla consegna",
    ARCHIVED: "Nessun viaggio archiviato",
  }

  
  const { id: carrierId } = useSelector(selectCurrentCompany); // da cambiare in carrierId quando facciamo i pallet

  if(travels?.length <= 0) return (
    <EmptyResultPage message={message[listStatus]}>
      {(companyType === "CARRIER" || companyType === "SENDER") && (
        <LinkButton
          text="Registra ora"
          className='btn-primary'
          to={`new`}
        />
      )}
    </EmptyResultPage>
  )

  return (
    <ul className="mt-4">
      { travels.map(travel => (
        <ListItem
          key={travel.id}
          topTitle="Viaggio"
          title={`COD. ${travel.stamp.split("-")[1]} - ${TRAVEL_TYPE_DESCRIPTION[travel.travelType]}`}
          item={travel}
          path={showPalletHandlingsStatus ? null : `/travels/view?id=${travel.id}`}
          dropdown={(
            <TravelsListItemDropdown
              id={travel.id}
              showDeleteModal={false}
            />
          )}
        >
          {/* Content */}
          { showPalletHandlingsStatus 
            ? <PalletHandlingsTravelsItemContent travel={travel} companyId={carrierId} />
            : <DefaultTravelListItemContent travel={travel} />
          }

          <div className='mt-4'>
            <p className='text-sm text-gray-500 dark:text-gray-400'>
              Registrato { formatDistanceDate(new Date(travel.createdAt), new Date()) }
            </p>
          </div>
          
        </ListItem>
      ))}
    </ul>
  )
}
