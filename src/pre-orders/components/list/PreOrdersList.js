import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { selectCurrentCompany } from '../../../company/slices/companySlice'
import LinkButton from '../../../globals/components/buttons_v2/LinkButton'
import EmptyResultPage from '../../../globals/components/layout/EmptyResultPage'
import Spinner from '../../../globals/components/layout/Spinner'
import PreOrdersListItem from './PreOrdersListItem'

const PreOrdersList = ({
  preOrders,
  listStatus,
  isFetching,
  selectedPreOrder
}) => {
  const [ searchParams ] = useSearchParams();
  const companyType = searchParams.get("company");
  const { id } = useSelector(selectCurrentCompany);

  const message = {
    ALL: "Nessun pre-ordine",
    PENDING: "Nessun pre-ordine in attesa",
    ACCEPTED: "Nessun pre-ordine accettato",
    REJECTED: "Nessun pre-ordine rifiutato",
  }

  if(preOrders?.length <= 0) return (
    <EmptyResultPage message={message[listStatus]}>
      <LinkButton
        text="Aggiungi ora"
        className='btn-primary'
        to={`new/${companyType.toLowerCase()}`}
      />
    </EmptyResultPage>
  )

  return (
    <>
      { isFetching ? <Spinner className = "fixed right-8 bottom-8 h-5 w-5 text-primary-200 dark:text-primary-300" /> : null }
      <ul className="mt-4 mr-2">
        { preOrders.map(preOrder => (
          <PreOrdersListItem
            key={preOrder.id}
            preOrder={preOrder}
            currentCompanyId={id}
            isSelected={selectedPreOrder && selectedPreOrder === preOrder.id}
          />
        ))}
      </ul>
    </>
  )
}

export default PreOrdersList
