import { useDispatch, useSelector } from "react-redux";
import { SmallTitle } from "../../../globals/components/typography/titles";
import OrdersListForTravelEditor from "./OrdersListForTravelEditor";
import OrdersListByCompanyForTravelEditor from "./OrdersListByCompanyForTravelEditor";
import { changeTravelEditorOrderDetails, selectNewWaypointRunning, selectSelectedWaypointId, selectTravelEditorCreatedAtRange, selectTravelEditorSelectedCheckpoint, selectTravelEditorSelectedCompany } from "../../slices/travelEditorSlice";
import { addTravelEditorOperationThunk, removeTravelEditorOperationThunk } from "../../api/travels-thunks";

export default function OrdersPickerForTravelEditor({
  orders = {},
}) {
  // Nel caso di creazione di una nuova fermata, ottengo i dati e cambio lista
  const newWaypointRunning = useSelector(selectNewWaypointRunning);
  const selectedCompany = useSelector(selectTravelEditorSelectedCompany);
  const selectedWaypointId = useSelector(selectSelectedWaypointId);
  const selectedCheckpoint = useSelector(selectTravelEditorSelectedCheckpoint);
  const createdAtRange = useSelector(selectTravelEditorCreatedAtRange);

  const dispatch = useDispatch();

  if(!orders || Object.keys(orders)?.length <= 0) return <p className="text-sm">
    Ordini non presenti all'interno di questo viaggio
  </p>;

  const ids = Object.keys(orders);

  return (
    <section>
      {/* Title */}
      <header>
        <SmallTitle styles="my-4">
          { newWaypointRunning?.[0]?.company?.name && newWaypointRunning?.[0]?.checkpoint?.id
            ? `Ordini disponibili per ${newWaypointRunning?.[0]?.company?.name}`
            : "Ordini trasportati"
          }
        </SmallTitle>
      </header>

      {/* Orders list */}
      <div className="mt-2">
        { newWaypointRunning && selectedCompany && selectedCheckpoint
          ? <OrdersListByCompanyForTravelEditor
              waypoint={newWaypointRunning}
              selectedWaypointId={selectedWaypointId}
              createdAtRange={createdAtRange}
              customer={selectedCompany}
              checkpoint={selectedCheckpoint}
              loadedOrders={orders}
              ordersIds={ids}
              onClick={(order) => dispatch(changeTravelEditorOrderDetails(order))}
              addOrder={(order) => dispatch(addTravelEditorOperationThunk({ order }))}
              removeOrder={(order) => dispatch(removeTravelEditorOperationThunk({ order }))}
            />
          : <OrdersListForTravelEditor
              ids={ids}
              entities={orders}
              isLoading={false}
              selectedWaypointId={selectedWaypointId}
              onClick={(order) => dispatch(changeTravelEditorOrderDetails(order))}
              addOrder={(order) => dispatch(addTravelEditorOperationThunk({ order }))}
              removeOrder={(order) => dispatch(removeTravelEditorOperationThunk({ order }))}
            />
        }
      </div>
    </section>
  )
}