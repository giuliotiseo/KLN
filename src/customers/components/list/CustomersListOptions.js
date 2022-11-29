import { useState } from 'react';
import { useDispatch } from 'react-redux';
import RefreshListButton from '../../../globals/components/lists/RefreshListButton';
import Pagination from '../../../globals/components/lists_v2/Pagination';
import LimitSelector from '../../../globals/components/lists_v2/LimitSelector'
import InputText from '../../../globals/components/dataEntry_v2/InputText';
import Button from '../../../globals/components/buttons_v2/Button';
import { FiSearch } from "react-icons/fi";
import { DEFAULT_CUSTOMERS_LIMIT, changeCustomersListLimit, changeCustomersListSearchable } from '../../slices/customersListSlice'

function CustomersListOptions({
  inputSearchable = "",
  pagination,
  limit = DEFAULT_CUSTOMERS_LIMIT,
  refetch
}) {
  const [ searchable, setSearchable ] = useState(inputSearchable);
  const { goNext, goBack, page, nextToken, previousTokens } = pagination;
  const dispatch = useDispatch();

  return (
    <section className='sticky top-3 flex items-center border-b-2 border-gray-300 mt-3 p-0 max-w-[960px] w-full mx-auto rounded-2xl z-20 bg-gradient-to-l from-light-100 dark:from-dark-300 to-light-300 dark:to-dark-100'>
      {/* Refresh */}
      <RefreshListButton
        className='ml-2'
        refresh={refetch}
      />

      {/* CreatedAt Range Picker */}
      <div className='flex items-center flex-1'>
        <div className="flex flex-1">
          <InputText
            value={searchable}
            onPressEnter={() => dispatch(changeCustomersListSearchable(searchable))}
            placeholder="Cerca cliente per nome"
            className='w-full'
            contentClassName='w-full'
            inputClassName="flex-1 w-full bg-light-300 border-none"
            callback={({ value }) => setSearchable(value)}
          />

          <Button
            icon={<FiSearch />}
            onClick={() => dispatch(changeCustomersListSearchable(searchable))}
            className="btn-ghost mx-2"
          />
        </div>

        {/* Results limit selector */}
        <LimitSelector
          limit={limit}
          className="mr-2"
          updateLimit={(value) => dispatch(changeCustomersListLimit(value))}
        />
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

export default CustomersListOptions
