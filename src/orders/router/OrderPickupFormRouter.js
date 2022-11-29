import { useNavigate } from 'react-router-dom';
import OrderPickupForCarrierForm from '../components/form/OrderPickupForCarrierForm'
import OrderPickupForSenderForm from '../components/form/OrderPickupForSenderForm'

function OrderPickupFormRouter({
  companyType,
  order,
  customersQuery,
  setCustomerSearchable,
  customerDetailsQuery,
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
          setSenderSearchable={setCustomerSearchable}
          senderDetailsQuery={customerDetailsQuery}
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
          setCarrierSearchable={setCustomerSearchable}
          carrierDetailsQuery={customerDetailsQuery}
          updateCarrier={callback}
          updateForm={updateForm}
          updatePickupCheckpoint={updatePickupCheckpoint}
          updateTrades={updateTrades}
        />
      )}
    </div>
  )
}

export default OrderPickupFormRouter
