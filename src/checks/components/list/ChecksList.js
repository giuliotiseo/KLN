import { useSearchParams } from 'react-router-dom'
import LinkButton from '../../../globals/components/buttons_v2/LinkButton'
import EmptyResultPage from '../../../globals/components/layout/EmptyResultPage'
import Spinner from '../../../globals/components/layout/Spinner'
import ListItem from '../../../globals/components/lists/ListItem'
import CheckListItemDropdown from './CheckListItemDropdown'
import { formatDistanceDate, priceFormatter } from '../../../globals/libs/helpers'
import CopyOnClipboard from '../../../globals/components/buttons_v2/CopyOnClipboard'
import { TbArrowRightSquare } from 'react-icons/tb'

const ChecksList = ({
  checks,
  listStatus,
  isFetching,
}) => {
  const [ searchParams ] = useSearchParams();
  const companyType = searchParams.get("company");

  const message = {
    ALL: "Nessun assegno",
    PENDING: "Nessun assegno di ritiro",
    PICKEDUP: "Nessun assegno ritirato recentemente",
    RECORDING: "Nessun assegno in fase di registrazione",
    DELIVERING: "Nessun assegno in fase di consegna",
    DELIVERED: "Nessun assegno consegnato",
    ARCHIVED: "Nessun assegno archiviato",
  }

  if(checks?.length <= 0) return (
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
    <div className='h-full'>
      { isFetching ? <Spinner className = "fixed right-8 bottom-8 h-5 w-5 text-primary-200 dark:text-primary-300" /> : null }
      <ul className="mt-4 mr-2">
        { checks.map(check => (
          <ListItem
            key={check.id}
            item={check}
            topTitle="Assegno"
            title={`COD. ${check.stamp.split('-')[1]}`}
            path={`view?id=${check.id}`}
            dropdown={(
              <CheckListItemDropdown
                id={check.id}
                showDeleteModal={false}
                queryFrom={companyType}
              />
            )}
          >
            <div className="mb-4 flex items-center gap-4">
              <p className="text-sm">{ check.receiverName }</p>
              <TbArrowRightSquare className="text-xl" />
              <p className="text-sm">{ check.senderName }</p>
            </div>

            <div className='mb-4'>
              <div className="text-gray-400 dark:text-gray-500 hover:text-dark-50 dark:hover:text-light-300 transition-colors">Rif. ordine <CopyOnClipboard tipMessage='' tipSuccess='Copiato' hideInternalDataTip={true} inputData={check.orderStamp.split('-')[1]} /></div>
              { check.keyDocNum && <div className="text-gray-400 dark:text-gray-500 hover:text-dark-50 dark:hover:text-light-300 transition-colors">Rif. documento  <CopyOnClipboard tipMessage='' tipSuccess='Copiato' hideInternalDataTip={true} inputData={check.keyDocNum} /></div> }
            </div>
            
            <p className='font-bold text-secondary-200 dark:text-secondary-300'>{priceFormatter(check.amount)}</p>
            
            <div className='mt-4'>
              <p className='text-sm text-gray-500 dark:text-gray-400'>
                Registrato { formatDistanceDate(new Date(check.createdAt), new Date()) }
              </p>
            </div>
          </ListItem>
        ))}
      </ul>
    </div>
  )
}

export default ChecksList
