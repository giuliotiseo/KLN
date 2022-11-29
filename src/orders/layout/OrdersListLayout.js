import React from 'react'
import Spinner from '../../globals/components/layout/Spinner'
import SafeCol from '../../globals/components/layout/SafeCol'
import { useScrollFull } from '../../globals/hooks/useScrollFull'
import OrdersListOptions from '../components/list/OrdersListOptions'
import OrdersList from '../components/list/OrdersList'

const OrdersListLayout = ({
  orders,
  dateFrom,
  dateTo,
  limit,
  sortDirection,
  pagination,
  refetch,
  isLoading,
  isFetching,
  listType,
  selectedOrder = null
}) => {
  const scrollableRef = useScrollFull();

  return (
    <SafeCol id="OrdersListLayout" ref={scrollableRef}>
      <div className={`${isLoading && 'pointer-events-none'}`}>
        <OrdersListOptions
          dateFrom={dateFrom}
          dateTo={dateTo}
          limit={limit}
          sortDirection={sortDirection}
          pagination={pagination}
          refetch={refetch}
        />
      </div>

      { isLoading || isFetching
        ? <div className="flex h-full w-full items-center justify-center">
            <Spinner className="h-5 w-5 text-primary-200 dark:text-primary-300" />
          </div>
        : <OrdersList
            isFetching={isFetching}
            orders={orders}
            listStatus={listType.status}
            selectedOrder={selectedOrder}
          />
      }
    </SafeCol>
  )
}

export default OrdersListLayout
