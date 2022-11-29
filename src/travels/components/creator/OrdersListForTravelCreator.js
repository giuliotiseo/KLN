import { useSelector } from "react-redux"
import InlineSpinner from "../../../globals/components/spinners/InlineSpinner"
import { SmallParagraph } from "../../../globals/components/typography/paragraphs"
import { selectTravelCreatorOrdersIds } from "../../slices/travelCreatorSlice"
import OrderListItemForTravelCreator from "./OrderListItemForTravelCreator"

export default function OrdersListForTravelCreator({
  orders,
  isLoading,
  onClick,
  addOrder = () => console.log("Default log from addOrder: <OrdersListForTravelCreator />"),
  removeOrder = () => console.log("Default log from removeOrder: <OrdersListForTravelCreator />")
}) {
  const selectedOrdersIds = useSelector(selectTravelCreatorOrdersIds);

  if(isLoading) return <InlineSpinner />
  if(orders?.length <= 0) return <SmallParagraph styles="ml-4 mt-4">Nessun ordine trovato</SmallParagraph>

  return (
    <ul>
      { orders.map(order => (
        <OrderListItemForTravelCreator
          key={order.id}
          item={order}
          selectedOrdersIds={selectedOrdersIds}
          onClick={onClick}
          addOrder={addOrder}
          removeOrder={removeOrder}
        />
      ))}
    </ul>
  )
}