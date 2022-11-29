import CardDetails from '../../../globals/components/dataDisplay/CardDetails';
import { PAYMENT_CONDITION_DESCRIPTION } from '../../libs/constants'
import { RiMoneyEuroCircleLine } from "react-icons/ri";

const OrderPaymentDetailsHeader = () => (
  <div className="flex items-center">
    <RiMoneyEuroCircleLine className="mr-1 text-2xl" />
    <h3 className="title-3">Info pagamento</h3>
  </div>
)

const OrderPaymentDetails = ({
  paymentCondition,
}) => {
  return (
    <CardDetails
      header={<OrderPaymentDetailsHeader />}
    >
      <section>
        <div className="pb-4">
          <p className="mt-2 block text-lg">{ PAYMENT_CONDITION_DESCRIPTION[paymentCondition].short }</p>
          <p className='text-base'>{ PAYMENT_CONDITION_DESCRIPTION[paymentCondition].long }</p>
        </div>
      </section>
    </CardDetails>
  )
}

export default OrderPaymentDetails;