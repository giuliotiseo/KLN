import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useTravelByIdQuery,
  useRemoveTravelByCarrierMutation,
  useUpdateLastPositionTravelMutation
} from "../api/travels-api-slice";
import TravelViewerLayout from "../layout/TravelViewerLayout";
import Modal from "../../globals/components/layout/Modal";
import OrderRemoteDetails from "../components/viewer/OrderRemoteDetails";
import WaitScreen from "../../globals/components/layout/WaitScreen";
import PageSpinner from "../../globals/components/layout/PageSpinner";
import { FiEdit } from "react-icons/fi";
import { calculateRoute } from "../libs/helpers";
import { LargeParagraph } from "../../globals/components/typography/paragraphs";


export default function TravelViewerContainer({ id }) {
  const [ confirmationModal, setConfirmationModal ] = useState(false);
  const [ orderDetailsDrawer, showOrderDetailsDrawer ] = useState(null);
  const [ selectedOrderId, setSelectedOrderId ] = useState(false);
  const [ directions, setDirections ] = useState(null);
  const { data: travel = {}, isFetching, isSuccess } = useTravelByIdQuery({ id });
  const [ removeTravel, { isLoading: isDeleting, isSuccess: isSuccessDelete } ] = useRemoveTravelByCarrierMutation();
  const [ updateLastPosition, { isLoading: isUpdating, isSuccess: isSuccessUpdate } ] = useUpdateLastPositionTravelMutation();
  const navigate = useNavigate();

  // // Callback
  const getRoutes = useCallback(async (travel) => {
    const trip = [travel.start, ...travel.waypoints, travel.end].map(wp => ({
      ...wp.checkpoint.location,
      coordinate: {
        lat: wp.checkpoint.location.coordinate[0], 
        lng: wp.checkpoint.location.coordinate[1]
      }})
    );

    await calculateRoute(trip, null, setDirections);
  }, []);

  // Effects
  useEffect(() => {
    if(isSuccess && Object.keys(travel)) {
      if(travel?.waypoints?.length > 0) {
        getRoutes(travel);
      }
    }
  }, [travel, isSuccess]);

  useEffect(() => {
    if(selectedOrderId) {
      showOrderDetailsDrawer(true);
    } else {
      setSelectedOrderId(null);
    }
  }, [selectedOrderId]);

  useEffect(() => {
    if(!orderDetailsDrawer) {
      setSelectedOrderId(null);
    }
  }, [orderDetailsDrawer]);

  useEffect(() => {
    if(isSuccessDelete) {
      navigate('/travels?status=stationary');
    }
  }, [isSuccessDelete]);


  // Await data
  if(!id || !travel || isFetching || isDeleting || isUpdating) return <PageSpinner message="Caricamento viaggio" />

  // Edit link params
  const edit_link = {
    to: `/travels/edit?id=${travel.id}`,
    text: "Modifica viaggio",
    icon: () => <FiEdit />
  }

  return (
    <main className="h-full w-full">
      <TravelViewerLayout
        travel={travel}
        link={edit_link}
        directions={directions}
        setConfirmationModal={setConfirmationModal}
        updateLastPosition={(data) => updateLastPosition({ ...travel, lastPosition: data })}
        setSelectedOrderId={setSelectedOrderId}
      />

      {/* Floating elements */}
      <OrderRemoteDetails
        orderId={selectedOrderId}
        orderDetailsDrawer={orderDetailsDrawer}
        showOrderDetailsDrawer={showOrderDetailsDrawer}
      />

      <Modal
        title={"Sei sicuro?"}
        message={"Tutte le registrazioni programmate per questo viaggio, saranno eliminate. Le dipendenze collegate al viaggio che stai eliminando (es. gestione pallet) potranno essere compromesse in seguito."}
        messageStyle={'alert-danger'}
        closeModal={() => setConfirmationModal(false)}
        showModal={confirmationModal}
        size={640}
        confirm={() => removeTravel(travel)}
      >
        <LargeParagraph styles="text-center font-bold text-danger-200 dark:text-danger-300">
          Stai eliminando <b>{travel.stamp}</b>
        </LargeParagraph>
      </Modal>

      {/* Fixed positions */}
      <WaitScreen
        title="Operazione in corso"
        show={isUpdating || isDeleting }
      />
    </main>
  )
}