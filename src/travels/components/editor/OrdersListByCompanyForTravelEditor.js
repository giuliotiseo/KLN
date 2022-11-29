import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ActionButton from "../../../globals/components/buttons/ActionButton";
import OrderListItemForTravelEditor from "./OrderListItemForTravelEditor";
import InlineSpinner from "../../../globals/components/spinners/InlineSpinner";
import { addTravelEditorNewOperationThunk } from "../../api/travels-thunks";
import { clearSelectedWaypoint, initTravelEditorPendingOrders, selectTravelEditorPendingOrders } from "../../slices/travelEditorSlice";
import { useOrdersByStatusCompanyForTravelQuery } from "../../api/travels-api-slice";
import { selectCurrentCompany } from "../../../company/slices/companySlice";

export default function OrdersListByCompanyForTravelEditor({
  waypoint,
  selectedWaypointId,
  customer,
  createdAtRange,
  loadedOrders,
  ordersIds,
  checkpoint,
}) {
  const { id: myCompanyId } = useSelector(selectCurrentCompany);
  // Ordini NON CARICATI sul camion disponibili per il RITIRO
  const { data = {}, isFetching: isFetchingList } = useOrdersByStatusCompanyForTravelQuery({
    carrierId: myCompanyId,
    status: "PENDING",
    pickupStorageId: customer?.company?.id || customer?.id,
    createdAt: createdAtRange,
    limit: 9999,
    isCarrierWaypoint: customer?.id === myCompanyId
  });

  // Seleziona gli ordini pendenti dallo slice (quindi quelli ottenuti dopo l'inizializzazione nello useEffect)
  const selectedPendingOrders = useSelector(selectTravelEditorPendingOrders);
  const dispatch = useDispatch();

  // Inizializza ordini pendenti all'interno dell'editor in modo da poter elaborare le operazioni di carico/scarico
  useEffect(() => {
    if(data?.ids) {
      dispatch(initTravelEditorPendingOrders(data.entities));
    }
  }, [data])

  // Elaborazione ordini caricati
  const pendingOrders = Object.keys(selectedPendingOrders).map(or_id => selectedPendingOrders[or_id]);
  
  // Ordini CARICATI sul camion disponibili per la CONSEGNA
  let loadedOrdersByCompany = Object.keys(loadedOrders)
    .filter(id => {
      return (loadedOrders[id].deliveryStorageName === customer?.name)
        && (loadedOrders[id].operationValue === 0)
        && (loadedOrders[id].deliveryCheckpoint.location.place_id === checkpoint.location.place_id)
    }).map(c_id => ({ ...loadedOrders[c_id], indexOp: 1 }));

  // Metto insieme ordini caricati e non caricati effettuando ulteriori filtraggi sui pending
  let availableOrders = pendingOrders?.length > 0
    ? pendingOrders
      .filter(pending_order => {
        return (pending_order?.operationValue !== 0)
          && (pending_order?.pickupCheckpoint?.location?.place_id === checkpoint?.location?.place_id)
          && (!ordersIds.includes(pending_order?.id))
      })
      .concat(...loadedOrdersByCompany)
    : loadedOrdersByCompany;

  // Inoltre, se il waypoint selezionato fa riferimento all'azienda vettore corrente, aggiungi agli ordini disponibili anche quelli stoccati 
  if(myCompanyId === customer?.id) {
    // Aggiungo gli ordini che è possibile scaricare presso il waypoint del vettore
    availableOrders = availableOrders.concat(Object.keys(loadedOrders)
      .filter(id => (customer?.id === myCompanyId 
        && (loadedOrders[id]?.status !== "STOCKED")
        && (loadedOrders[id].operationValue === 0)
        && (loadedOrders[id]?.depotCheckpoint?.location?.place_id === checkpoint?.location?.place_id)
      )).map(c_id => loadedOrders[c_id]));

    // Aggiungo gli ordini stoccati presso il waypoint del vettore
    availableOrders = availableOrders.concat(pendingOrders.filter(pending_order => (
      (pending_order?.status === "STOCKED" && !pending_order.operationValue)
      && (pending_order?.depotCheckpoint?.location?.place_id === checkpoint?.location?.place_id)
      && (!ordersIds.includes(pending_order?.id))
      )));
  }

  // Nel caso di caricamento delle liste, fai vedere lo spinner
  if(isFetchingList) return <InlineSpinner />

  // console.log("Ecco company", company)
  // console.log("Ecco company.id", company?.id)

  return (
    availableOrders?.length <= 0
      ? <ActionButton
          text="Torna all'elenco ordini"
          styles="btn-primary"
          onClick={() => dispatch(clearSelectedWaypoint())}
        />
      : <ul>
        { availableOrders.map(order => (
          <OrderListItemForTravelEditor
            key={order.id}
            item={order}
            onClick={() => console.log("Mostra il dettaglio dell'ordine su cui sto cliccando")}
            removeOrder={null}
            addOrder={(orderPayload) => {
              console.log("Vedi un po", orderPayload);
              dispatch(addTravelEditorNewOperationThunk({
                order: orderPayload,
                waypoint,
                waypointId: selectedWaypointId
              }))
            }}
          />
        ))}
      </ul>
  )
}