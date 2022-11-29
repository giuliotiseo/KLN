import CardDetails from "../../../globals/components/dataDisplay/CardDetails";
import CheckOrderDocsPicker from "./CheckOrderDocsPicker";
// Helpers
import { formatDate, priceFormatter } from "../../../globals/libs/helpers";

// Sub components -------------------------------------------------------------------------------------------------------------------
const CheckOrderCardDetailsHeader = ({ stamp }) => <p className="font-bold">
  Ordine {stamp.split("-")[1]}
</p>

const CheckOrderCardDetailsFooter = ({ createdAt }) => <p className="text-sm text-gray-400 dark:text-gray-500">
  Data di invio ordine: {formatDate(new Date(createdAt))}
</p>


// Main component -------------------------------------------------------------------------------------------------------------------
export default function CheckOrderDetails({
  order,
  docs,
  clear = () => console.log("Clear order details"),
  docNumCallback,
  canChange,
  docsRefCallback
}) {

  return (
    <section>
      <h4 className="title-4 my-4">Ordine selezionato:</h4>
      {/* Order details */}
      <CardDetails
        header={<CheckOrderCardDetailsHeader stamp={order.stamp} />}
        // footer={<CheckOrderCardDetailsFooter createdAt={order.createdAt} />}
        className={`mb-4`}
        clear={canChange ? clear : null}
      >
        <p>Consegna assegno a: <span className="text-secondary-200 dark:text-secondary-300 font-bold">{order.senderName}</span></p>
        <p>Emissione assegno da: <span className="text-secondary-200 dark:text-secondary-300 font-bold">{order.receiverName}</span></p>
        <p>Gestione assegno di: <span className="text-secondary-200 dark:text-secondary-300 font-bold">{order.carrierName}</span></p>
                  
        { order?.checksAmount && (
          <div className="mt-4">
            <p>
              Totale importo:
            </p>
            <h3 className="title-2 text-primary-200 dark:text-primary-300">
              {priceFormatter(order.checksAmount)}
            </h3>
          </div>
        )}
      </CardDetails>

      {/* Docs picker */}
      <CheckOrderDocsPicker
        checkDocs={docs}
        orderDocs={order?.docs}
        docNumCallback={docNumCallback}
        docsRefCallback={docsRefCallback}
      />
    </section>
  )
}