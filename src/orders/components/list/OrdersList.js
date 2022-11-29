import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { selectCurrentCompany } from '../../../company/slices/companySlice'
import LinkButton from '../../../globals/components/buttons_v2/LinkButton'
import OrdersListItem from './OrdersListItem'
import EmptyResultPage from '../../../globals/components/layout/EmptyResultPage'
import Spinner from '../../../globals/components/layout/Spinner'

const OrdersList = ({
  orders,
  listStatus,
  isFetching,
  selectedOrder
}) => {
  const [ searchParams ] = useSearchParams();
  const companyType = searchParams.get("company");
  const { id } = useSelector(selectCurrentCompany);

  const message = {
    ALL: "Nessun ordine",
    PENDING: "Nessun ordine in attesa",
    PICKEDUP: "Nessun ordine ritirato",
    STOCKED: "Nessun ordine in magazzino",
    DELIVERING: "Nessun ordine in consegna",
    DELIVERED: "Nessun ordine consegnato",
    ARCHIVED: "Nessun ordine archiviato",
  }

  if(orders?.length <= 0) return (
    <EmptyResultPage message={message[listStatus]}>
      {(companyType === "CARRIER" || companyType === "SENDER") && (
        <LinkButton
          text="Aggiungi ora"
          className='btn-primary'
          to={`new/${companyType.toLowerCase()}`}
        />
      )}
    </EmptyResultPage>
  )

  return (
    <>
      { isFetching ? <Spinner className = "fixed right-8 bottom-8 h-5 w-5 text-primary-200 dark:text-primary-300" /> : null }
      <ul className="mt-4 mr-2">
        { orders.map(order => (
          <OrdersListItem
            key={order.id}
            order={order}
            currentCompanyId={id}
            companyType={companyType}
            isSelected={selectedOrder && selectedOrder === order.id}
          />
        ))}
      </ul>
    </>
  )
}

export default OrdersList
