import { useNavigate } from 'react-router-dom';
import OrderPickupForCarrierForm from './OrderPickupForCarrierForm'
import OrderPickupForSenderForm from './OrderPickupForSenderForm'

function OrderPickupForm({
  companyType,
  order,
  customersQuery,
  setSenderSearchable,
  senderDetailsQuery,
  callback,
  updateForm,
  updatePickupCheckpoint,
  updateTrades
}) {
  const navigate = useNavigate();
  if(companyType !== "CARRIER" && companyType !== "SENDER") {
    navigate('/unauthorized');
  }

  return (
    <div>
      { companyType === "CARRIER" && (
        <OrderPickupForCarrierForm
          order={order}
          customersQuery={customersQuery}
          setSenderSearchable={setSenderSearchable}
          senderDetailsQuery={senderDetailsQuery}
          updateSender={callback}
          updateForm={updateForm}
          updatePickupCheckpoint={updatePickupCheckpoint}
          updateTrades={updateTrades}
        />
      )}

      { companyType === "SENDER" && (
        <OrderPickupForSenderForm
          order={order}
          customersQuery={customersQuery}
          setSenderSearchable={setSenderSearchable}
          senderDetailsQuery={senderDetailsQuery}
          updateSender={callback}
          updateForm={updateForm}
          updatePickupCheckpoint={updatePickupCheckpoint}
          updateTrades={updateTrades}
        />
      )}
    </div>
  )
}

export default OrderPickupForm
