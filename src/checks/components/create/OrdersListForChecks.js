import InlineSpinner from "../../../globals/components/spinners/InlineSpinner"
import { globalStatusColorsBorder, priceFormatter } from "../../../globals/libs/helpers"

export default function OrdersListForChecks({ orders, loading, onClick }) {
  if(loading) return <InlineSpinner />
  if(orders?.length <= 0) return <p className="text-sm">Nessun ordine trovato</p>

  return (
    <ul>
      { orders.map(order => (
        <li key={order.id} className={`border-l-4 ${globalStatusColorsBorder[order.status]} mb-2 bg-base-100 rounded-md p-4 mr-4`}>
          <button className="block text-left" onClick={() => onClick(order)}>
            <h4 className="title-4">Ordine {order.stamp.split('-')[1]}</h4>
            <div className="text-sm">
              <p><span className="text-gray-500 dark:text-gray-400">Oggetto: </span>{order.quantity} {order.support} {order.size}</p>
              <p><span className="text-gray-500 dark:text-gray-400">Inviato da: </span>{order.senderName}</p>
              <p><span className="text-gray-500 dark:text-gray-400">Destinato a: </span>{order.receiverName}</p>
              <p><span className="text-gray-500 dark:text-gray-400">Trasporto gestito da: </span>{order.carrierName}</p>
              <p className="font-bold mt-4">Totale importo: {priceFormatter(order.checksAmount)}</p>
            </div>
          </button>
        </li>
      ))}
    </ul>
  )
}