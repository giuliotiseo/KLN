import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// Components
import PalletCreatorLayout from "../layout/PalletCreatorLayout";
import PalletHandlingCounter from "../components/form/PalletHandlingCounter";
import PalletListLoadUnloadDetails from "../components/list/item/PalletListLoadUnloadDetails";
import Modal from "../../globals/components/layout/Modal";
import InlineSpinner from "../../globals/components/spinners/InlineSpinner";
// Actions
import {
  changePalletCreatorTravel,
  changePalletCreatorWaypointTab,
  initPalletCreatorQuantity,
  resetPalletCreator,
  selectPalletCreator,
  selectPalletCreatorLoads,
  selectPalletCreatorUnloads,
} from "../slices/palletCreatorSlice";
// Api
import { handleCreatePalletHandling } from "../api/pallets-preprocessors";
import { changePalletCreatorTravelThunk, changePalletCreatorWaypointThunk } from "../api/pallets-thunks";
import { useAddPalletHandlingMutation, usePalletByIdForCarrierQuery } from "../api/pallets-api-slice";
// Icons
import  { MdOutlineSend } from "react-icons/md";

export default function PalletCreatorContainer({ myCompany, companyId, travel_id }) {
  const [ leaveModal, setLeaveModal ] = useState(false);
  const [ drawer, setDrawer ] = useState(false);
  const [ createPalletHandling, { isLoading: isCreating }] = useAddPalletHandlingMutation();
  const palletHandling = useSelector(selectPalletCreator);
  const loads = useSelector(selectPalletCreatorLoads);
  const unloads = useSelector(selectPalletCreatorUnloads);
  const dispatch = useDispatch();
  const isInit = useRef(false);
  
  // Spread values from store
  const {
    travelStamp, travel, waypoint, files, image, operationDate, hasDelivery,
    adminValidation, reversal, companiesPalletInfo, note, waypointReadOnly, waypointTab
  } = palletHandling;

  // When is selected an handling already stored
  const { data: readOnlyData = {}, isLoading: isLoadingHandling, isFetching: isFetchingHandling } = usePalletByIdForCarrierQuery({ id: waypointReadOnly?.id || null })

  // Get travel by id if available
  useEffect(() => {
    if(travel_id) {
      dispatch(changePalletCreatorTravelThunk(travel_id));
    } else {
      dispatch(changePalletCreatorTravel(null));
    }
  }, [travel_id]);

  // Get categorized quantities by compliance
  useEffect(() => {
    if(waypoint && travel?.orders?.items?.length > 0) {
      const ordersObject =  travel.orders.items.reduce((acc, val) => ({ ...acc, [val.orderId]: val }), {});
      dispatch(initPalletCreatorQuantity({
        carrier: { name: myCompany.name, id: myCompany.id, tenant: myCompany.owner },
        waypoint,
        orders: ordersObject
      }));
    }

    isInit.current = true;
  }, [waypoint, travel]);
  
  // Reset all fields before closing
  useEffect(() => {
    return () => dispatch(resetPalletCreator());
  }, []);

  // Waiting for initialization
  if(!isInit.current) return null;

  // Shared creation function
  const runCreatePalletHandling = async ({ validation }) => {
    await handleCreatePalletHandling({
      palletHandling,
      createPalletHandling,
      travel_id,
      dispatch,
      validation: validation ? palletHandling?.validation : null, // validazione non sviluppata in questo modulo
    });
  }

  // Modal callbacks
  const modalHandler = () => {
    if(leaveModal === "waypoint")modalWaypointConfirm();
    if(leaveModal === "tab") modalTabConfirm();
  }

  const modalWaypointConfirm = () => {
    dispatch(changePalletCreatorWaypointThunk({ waypoint: null }));
    setLeaveModal(false);
  }

  const modalTabConfirm = () => {
    if(waypointTab === "PICKUP") {
      dispatch(changePalletCreatorWaypointTab("DELIVERY"));
      setLeaveModal(false);
    } else {
      dispatch(changePalletCreatorWaypointTab("PICKUP"));
      setLeaveModal(false);
    }
  }

  // Button save config
  const btn_save = {
    text: "Registra movimentazione",
    icon: <MdOutlineSend />,
    loading: isCreating,
    onClick: () => runCreatePalletHandling({ validation: false })
  }
  
  // Visibility condition
  const isTravelSelected = Object.keys(travel)?.length > 0 ? true : false;

  if(travel_id && !travel) return <InlineSpinner />

  return (
    <main className="h-full w-full">
      <PalletCreatorLayout
        travel_id={travel_id}
        companyId={companyId}
        tenant={myCompany.owner}
        companiesPalletInfo={companiesPalletInfo}
        isTravelSelected={isTravelSelected}
        isCreating={isCreating}
        travelStamp={travelStamp}
        travel={travel}
        waypoint={waypoint}
        loads={loads}
        unloads={unloads}
        reversal={reversal}
        operationDate={operationDate}
        adminValidation={adminValidation}
        files={files}
        image={image}
        hasDelivery={hasDelivery}
        note={note}
        save={waypoint ? btn_save : null}
        setLeaveModal={setLeaveModal}
        drawerState={[ drawer, setDrawer ]}
        readOnlyData={readOnlyData}
        isLoading={isLoadingHandling || isFetchingHandling || isCreating}
      />

      {/* Floating elements */}
      { !readOnlyData?.id && !drawer && (
        <PalletHandlingCounter
          show={waypoint ? true : false}
          loads={loads}
          unloads={unloads}
          reversal={reversal}
          palletHandligType={palletHandling.type}
          className="fixed bg-base-100 right-4 bottom-20 px-4 py-2 rounded-full shadow-md border border-light-100 dark:border-dark-100"
        />
      )}
              
      <Modal
        title={"Sei sicuro?"}
        message={"Non hai salvato la movimentazione pertanto tutte le modifiche saranno perse"}
        messageStyle={'alert-danger'}
        closeModal={() => setLeaveModal(false)}
        showModal={leaveModal}
        size={500}
        confirm={() => modalHandler()}
      >
        <PalletListLoadUnloadDetails
          loadQuantity={loads?.COMPLIANT?.value || 0}
          unloadQuantity={unloads?.COMPLIANT?.value || 0}
        />
      </Modal>
    </main>
  )
};