import Spinner from '../../globals/components/layout/Spinner'
import SafeCol from "../../globals/components/layout/SafeCol";
import { useScrollFull } from '../../globals/hooks/useScrollFull'
import ChecksListOptions from '../components/list/ChecksListOptions';
import ChecksList from '../components/list/ChecksList';

// Main component -----------------------------------------------------------------------------------------------
export default function ChecksListLayout({
  checks,
  dateFrom,
  dateTo,
  limit,
  pagination,
  refetch,
  isLoading,
  isFetching,
  listType,
  selectedCheck = null
}) {
  const scrollableRef = useScrollFull();

  return (
    <SafeCol id="ChecksListLayout" ref={scrollableRef}>
      <div className={`${isLoading && 'pointer-events-none'}`}>
        <ChecksListOptions
          dateFrom={dateFrom}
          dateTo={dateTo}
          limit={limit}
          pagination={pagination}
          refetch={refetch}
          companyRole={listType.companyType}
        />
      </div>

      { isLoading || isFetching
        ? <div className="flex h-full w-full items-center justify-center">
            <Spinner className="h-5 w-5 text-primary-200 dark:text-primary-300" />
          </div>
        : <ChecksList
            isFetching={isFetching}
            checks={checks}
            listStatus={listType.status}
            selectedCheck={selectedCheck}
          />
      }
    </SafeCol>
  )
}