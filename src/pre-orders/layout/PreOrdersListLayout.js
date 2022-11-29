import React from 'react'
import PreOrdersListOptions from '../components/list/PreOrdersListOptions'
import Spinner from '../../globals/components/layout/Spinner'
import PreOrdersList from '../components/list/PreOrdersList'
import SafeCol from '../../globals/components/layout/SafeCol'
import { useScrollFull } from '../../globals/hooks/useScrollFull'

const PreOrdersListLayout = ({
  preOrders,
  dateFrom,
  dateTo,
  limit,
  pagination,
  refetch,
  isLoading,
  isFetching,
  listType,
  selectedPreOrder = null
}) => {
  const scrollableRef = useScrollFull();

  return (
    <SafeCol id="PreOrdersListLayout" ref={scrollableRef}>
      <div className={`${isLoading && 'pointer-events-none'}`}>
        <PreOrdersListOptions
          dateFrom={dateFrom}
          dateTo={dateTo}
          limit={limit}
          pagination={pagination}
          refetch={refetch}
        />
      </div>

      { isLoading || isFetching
        ? <div className="flex h-full w-full items-center justify-center">
            <Spinner className="h-5 w-5 text-primary-200 dark:text-primary-300" />
          </div>
        : <PreOrdersList
            isFetching={isFetching}
            preOrders={preOrders}
            listStatus={listType.status}
            selectedPreOrder={selectedPreOrder}
          />
      }
    </SafeCol>
  )
}

export default PreOrdersListLayout
