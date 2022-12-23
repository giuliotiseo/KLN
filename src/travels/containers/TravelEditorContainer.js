import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../globals/hooks/useAuth";
import TravelEditorLayout from "../layout/TravelEditorLayout";
import FullSpinner from "../../globals/components/spinners/FullSpinner";
import WaitScreen from "../../globals/components/layout/WaitScreen";
import OrderDetailsForTravel from "../components/form/OrderDetailsForTravel";
import { FiCheck } from "react-icons/fi";
import { handleUpdateTravel } from "../api/travels-preprocessors";
import { toast } from "react-toastify";
import { useTravelByIdQuery, useUpdateTravelMutation } from "../api/travels-api-slice";
import { changeTravelEditorTimeLength, initTravelEditor, resetTravelEditor, selectTravelEditor, selectTravelEditorCreatedAtRange, selectTravelEditorEnd, selectTravelEditorFilterOrders, selectTravelEditorOrderDetails, selectTravelEditorOrders, selectTravelEditorStart, selectTravelEditorTrip, selectTravelEditorWaypoints } from "../slices/travelEditorSlice";
import { calculateRoute } from "../libs/helpers";
import { selectCurrentCompany } from "../../company/slices/companySlice";

export default function TravelEditorContainer({
  id,
  companyType,
  isEdited
}) {
  // Api fetch
  const { data: fetchedTravel = {}, isFetching } = useTravelByIdQuery({ id });
  // States
  const [ modal, setModal ] = useState(false);
  const [ orderDetailsDrawer, showOrderDetailsDrawer ] = useState(false);
  const [ directions, setDirections ] = useState(null);
  // Selectors
  const travelEditor = useSelector(selectTravelEditor);
  const travelOrders = useSelector(selectTravelEditorOrders);
  const waypoints = useSelector(selectTravelEditorWaypoints);
  const start = useSelector(selectTravelEditorStart);
  const end = useSelector(selectTravelEditorEnd);
  const trip = useSelector(selectTravelEditorTrip);
  const createdAtRange = useSelector(selectTravelEditorCreatedAtRange);
  const filter = useSelector(selectTravelEditorFilterOrders);
  const selectedOrder = useSelector(selectTravelEditorOrderDetails);
  const currentCompany = useSelector(selectCurrentCompany);
  const { auth: cognitoUser, profile } = useAuth();
  // Additional hooks
  const { search: searchFromUrl } = useLocation();
  const [ updateTravel, { data, isLoading: isUpdating, isSuccess, isError }] = useUpdateTravelMutation();

  // Action
  const dispatch = useDispatch();
  const renderTravel = { ...fetchedTravel, ...travelEditor.travel };

  // Callback
  const getRoutes = useCallback(async (trip) => {
    await calculateRoute(trip, null, setDirections);
  }, []);
  
  // Reset when user leave the page
  // Effects
  useEffect(() => {
    if(Object.keys(fetchedTravel)?.length > 0) {
      dispatch(initTravelEditor(fetchedTravel));
      if(fetchedTravel?.waypoints?.length > 0) {
        getRoutes(fetchedTravel.waypoints.map(wp => ({
          ...wp.checkpoint.location,
          coordinate: {
            lat: wp.checkpoint.location.coordinate[0], 
            lng: wp.checkpoint.location.coordinate[1]
          }})
        ));
      }
    }

    return () => dispatch(resetTravelEditor());
  }, [fetchedTravel, getRoutes, dispatch]);

  // Toast trigger
  useEffect(() => {
    if(isSuccess) {
      console.log("Aggiornamento viaggio effettuato con successo", data);
      toast.success(`Il viaggio ${data.stamp} è stato aggiornato con successo`);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if(isError) {
      console.error("Errore durante l'aggiornamento", data);
      toast.error(`Abbiamo riscontrato un errore durante l'aggiornamento del viaggio. Controlla che tutti i campi siano corretti`);
    }
  }, [isError, data]);

  // Show drawer when the user add order inside orderDetails property (in the store)
  useEffect(() => {
    if(selectedOrder?.id) showOrderDetailsDrawer(true);
  }, [selectedOrder?.id]);

  // Reset when leave the page
  useEffect(() => {
    return () => dispatch(resetTravelEditor())
  }, []);

  // Shared update function
  const runUpdateTravel = ({ skipValidation }) => {
    // Execute the update
    handleUpdateTravel({
      travelEditor,
      fetchedTravel,
      skipValidation,
      cognitoUser,
      profile,
      updateTravel,
      domain: currentCompany,
      dispatch,
      setModal
    })
  }

  // Button save config
  const btn_save = {
    text: "Salva modifiche",
    icon: <FiCheck />,
    loading: isUpdating,
    onClick: () => runUpdateTravel({ skipValidation : false }),
  }

  // Await data
  if(!id || !renderTravel?.id || isFetching || !trip) return <FullSpinner />

  return (
    <div id="travel-editor-container" className="h-full w-full">
      <TravelEditorLayout
        companyType={companyType}
        travel={renderTravel}
        status={travelEditor?.status || renderTravel?.status}
        orders={travelOrders}
        waypoints={waypoints}
        start={start}
        trip={trip}
        end={end}
        save={isEdited ? btn_save : null}
        searchFromUrl={searchFromUrl}
        createdAtRange={createdAtRange}
        filter={filter}
        directions={directions}
        calculateRoute={() => calculateRoute(
          trip,
          (payload) => dispatch(changeTravelEditorTimeLength(payload)),
          setDirections
        )}
      />

      {/* Floating elements */}
      <OrderDetailsForTravel
        orderDetailsDrawer={orderDetailsDrawer}
        showOrderDetailsDrawer={showOrderDetailsDrawer}
        selectedOrder={selectedOrder}
      />

      {/* Fixed positions */}
      <WaitScreen title="Aggiornamento viaggio in corso" show={isUpdating}/>
    </div>
  )}