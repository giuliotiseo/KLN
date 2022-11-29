import { TinyTitle } from "../../../globals/components/typography/titles"
import PalletOrdersSelectionTab from "./PalletOrdersSelectionTab";
import PalletOrderSummary from "./PalletOrderSummary"

export default ({ waypoint, orders, onChange }) => {
  if(!waypoint) return null;

  return (
    <div className="mt-2 py-2">
      <TinyTitle styles="mb-2 px-1">Selezione ordini</TinyTitle>

      <PalletOrdersSelectionTab onChange={onChange} />

      { waypoint?.orders?.length > 0 && waypoint.orders.map(order => (
        <PalletOrderSummary
          key={order.plannedId}
          order={(orders.items.filter(el => el.orderId === order.orderId)[0]).order}
          operation={order.operation}
        />
      ))}
    </div>
  )
}