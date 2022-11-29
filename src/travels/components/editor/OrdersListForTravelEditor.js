import { useSelector } from "react-redux";
import InlineSpinner from "../../../globals/components/spinners/InlineSpinner";
import { SmallParagraph } from "../../../globals/components/typography/paragraphs";
import OrderListItemForTravelEditor from "./OrderListItemForTravelEditor";

export default function OrdersListForTravelEditor({
  ids,
  entities,
  isLoading,
  onClick,
  addOrder = () => console.log("Default log from addOrder: <OrdersListForTravelCreator />"),
  removeOrder = () => console.log("Default log from removeOrder: <OrdersListForTravelCreator />")
}) {
  if(isLoading) return <InlineSpinner />
  if(!ids || ids?.length <= 0) return <SmallParagraph>Nessun ordine trovato</SmallParagraph>
  const orders = ids.map(id => entities[id]);
  return (
    <ul>
      { orders.map(order => (
        <OrderListItemForTravelEditor
          key={order.id}
          item={order}
          onClick={onClick}
          addOrder={addOrder}
          removeOrder={removeOrder}
        />
      ))}
    </ul>
  )
}