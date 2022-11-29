import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// Components
import TravelCreatorLayout from "../layout/TravelCreatorLayout";
import OrderDetailsForTravel from "../components/form/OrderDetailsForTravel";
import WaitScreen from "../../globals/components/layout/WaitScreen";
// Helpers and hooks
import { useAddTravelMutation } from "../api/travels-api-slice";
import {
  changeTravelCreatorTimeLength,
  resetTravelCreator,
  selectTravelCreator,
  selectTravelCreatorCreatedAtRange,
  selectTravelCreatorFilterOrders,
  selectTravelCreatorOrderDetails,
  selectTravelCreatorTrip
} from "../slices/travelCreatorSlice";
import { handleCreateTravel } from "../api/travels-preprocessors";
import { MdOutlineSend } from "react-icons/md";
import { calculateRoute } from "../libs/helpers";
import { selectCurrentCompany } from "../../company/slices/companySlice";
import { resetOrdersList, resetOrdersListFromTravel } from "../../orders/slices/ordersListSlice";


// Main component -----------------------------------------------------------------------------------------------
export default function TravelCreatorContainer() {
  const [ modal, setModal ] = useState(false);
  const [ orderDetailsDrawer, showOrderDetailsDrawer ] = useState(false);
  const [ directions, setDirections ] = useState(null);
  const [ createTravel, { isLoading: isCreating } ] = useAddTravelMutation();
  const createdAtRange = useSelector(selectTravelCreatorCreatedAtRange);
  const trip = useSelector(selectTravelCreatorTrip);
  const travel = useSelector(selectTravelCreator);
  const filter = useSelector(selectTravelCreatorFilterOrders);
  const company = useSelector(selectCurrentCompany);
  const selectedOrder = useSelector(selectTravelCreatorOrderDetails);
  const tenant = company?.id;
  const dispatch = useDispatch();

  // Shared creation function
  const runCreateTravel = async ({ validation }) => {
    await calculateRoute(
      trip,
      (payload) => dispatch(changeTravelCreatorTimeLength(payload)),
      (results) => console.log("Calcolo automatico del percorso", results)
    )


    await handleCreateTravel({
      travel,
      company,
      createTravel,
      dispatch,
      validation: validation ? travel?.validation : null,
      setModal
    })

    setDirections(null);
  }

  // Reset when leave the page
  useEffect(() => {
    dispatch(resetOrdersListFromTravel());
    return () => {
      dispatch(resetTravelCreator());
      dispatch(resetOrdersList());
    }
  }, [dispatch]);
  
  // Button save config
  const save = {
    text: "Registra viaggio",
    icon: <MdOutlineSend />,
    loading: isCreating,
    onClick: () => runCreateTravel({ validation: true })
  }

  // Good to go
  return (
    <>
      <TravelCreatorLayout
        save={save}
        tenant={tenant}
        createdAtRange={createdAtRange}
        trip={trip}
        directions={directions}
        filter={filter}
        showOrderDetailsDrawer={showOrderDetailsDrawer}
        calculateRoute={() => calculateRoute(
          trip,
          (payload) => dispatch(changeTravelCreatorTimeLength(payload)),
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
      <WaitScreen title="Creazione viaggio in corso" show={isCreating}/>

      {/* Questo è sempre stato commentato, anche  */}
      {/* <CheckValidationModal
        modal={modal}
        setModal={setModal}
        loading={isCreating}
        validation={check?.validation}
        confirm={() => handleCreateCheck({ validation: false })}
      /> */}
    </>
  )
}
