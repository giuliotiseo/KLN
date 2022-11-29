import React from 'react'
import CustomersListOptions from '../components/list/CustomersListOptions'
import Spinner from '../../globals/components/layout/Spinner'
import CustomersList from '../components/list/CustomersList'
import SafeCol from '../../globals/components/layout/SafeCol'
import { useScrollFull } from '../../globals/hooks/useScrollFull'

const CustomersListLayout = ({
  customers,
  listType,
  searchable,
  limit,
  pagination,
  refetch,
  isLoading,
  isFetching,
}) => {
  const scrollableRef = useScrollFull();

  return (
    <SafeCol id="CustomersListLayout" ref={scrollableRef}>
      { customers?.length > 0 && !isLoading && (
        <CustomersListOptions
          inputSearchable={searchable}
          limit={limit}
          pagination={pagination}
          refetch={refetch}
        />
      )}

      { isLoading
        ? <div className="flex h-full w-full items-center justify-center">
            <Spinner />
          </div>
        : <CustomersList
            isFetching={isFetching}
            customers={customers}
            listType={listType}
          />
      }
    </SafeCol>
  )
}

export default CustomersListLayout
