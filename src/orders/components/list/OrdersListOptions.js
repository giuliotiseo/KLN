import { useDispatch } from 'react-redux';
import RefreshListButton from '../../../globals/components/lists/RefreshListButton';
import Pagination from '../../../globals/components/lists_v2/Pagination';
import LimitSelector from '../../../globals/components/lists_v2/LimitSelector'
import RangeMonthsPicker from '../../../globals/components/lists_v2/RangeMonthsPicker';
import { changeOrdersListDateRange, changeOrdersListLimit, changeOrdersListSortDirection, DEFAULT_ORDER_LIMIT } from '../../slices/ordersListSlice';
import SortDirection from '../../../globals/components/lists_v2/SortDirection';

function OrdersListOptions({
  dateFrom,
  dateTo,
  pagination,
  sortDirection,
  limit = DEFAULT_ORDER_LIMIT,
  refetch
}) {
  const { goNext, goBack, page, nextToken, previousTokens } = pagination;
  const dispatch = useDispatch();

  return (
    <section className='sticky top-3 flex items-center border-b-2 border-l border-gray-300 mt-3 p-0 max-w-[960px] w-full mx-auto rounded-2xl z-20 bg-gradient-to-l from-light-300 dark:from-dark-300 to-light-100 dark:to-dark-100'>
      {/* Refresh */}
      <RefreshListButton
        className='ml-2'
        refresh={refetch}
      />

      {/* CreatedAt Range Picker */}
      <div className='flex items-center flex-1'>
        <SortDirection
          sortDirection={sortDirection}
          updateSortDirection={(value) => dispatch(changeOrdersListSortDirection(value))}
        />
        
        <div className="flex flex-1">
          <RangeMonthsPicker
            dateFrom={dateFrom}
            dateTo={dateTo}
            updateMonthDateRange={(value) => dispatch(changeOrdersListDateRange(value))}
            className="inline-block w-[200px]"
          />
        </div>

        <div className='flex items-center'>
          {/* Results limit selector */}
          <LimitSelector
            limit={limit}
            className="mr-2"
            updateLimit={(value) => dispatch(changeOrdersListLimit(value))}
          />
        </div>
      </div>

      {/* Pagination */}
      <Pagination
        goBack={goBack}
        goNext={goNext}
        page={page}
        nextToken={nextToken}
        previousTokens={previousTokens}
        className="mr-4 bg-base-100 border bg-base-100 rounded-full"
      />
    </section>
  )
}

export default OrdersListOptions
