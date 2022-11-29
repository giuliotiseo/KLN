import { useDispatch } from "react-redux";
import RefreshListButton from '../../../globals/components/lists/RefreshListButton';
import Pagination from '../../../globals/components/lists_v2/Pagination';
import LimitSelector from '../../../globals/components/lists_v2/LimitSelector'
import RangeMonthsPicker from '../../../globals/components/lists_v2/RangeMonthsPicker';
import CompanyFinderByCustomer from "../../../globals/components/dataEntry_v2/CompanyFinderByCustomer";
import {
  changeChecksCompanySearch,
  changeChecksListDateRange,
  changeChecksListLimit,
  DEFAULT_CHECK_LIMIT,
  selectChecksListCompanySearch
} from "../../slices/checksListSlice";
import { useSelector } from "react-redux";

// Constants ----------------------------------------------------------------------------------------------------------------------------------------------------------------
const optionTextCompanyByRole = {
  "sender": "Destinato a:",
  "receiver": "Emesso da: ",
  "carrier": "Gestito da: "
}

// Main component ----------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function ChecksListOptions({
  dateFrom,
  dateTo,
  pagination,
  limit = DEFAULT_CHECK_LIMIT,
  refetch,
  companyRole
}) {
  const { goNext, goBack, page, nextToken, previousTokens } = pagination;
  const selectedCustomer = useSelector(selectChecksListCompanySearch);

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
        <div className="flex flex-1">
          <RangeMonthsPicker
            dateFrom={dateFrom}
            dateTo={dateTo}
            updateMonthDateRange={(value) => dispatch(changeChecksListDateRange(value))}
            className="inline-block w-[200px]"
          />

          {/* Company finder */}
          <CompanyFinderByCustomer
            companyRole={companyRole.toLowerCase()}
            optionText={optionTextCompanyByRole}
            selectedCustomer={selectedCustomer}
            callback={({ role, value }) => dispatch(changeChecksCompanySearch({ [`${role.toLowerCase()}Name`]: value }))}
            clear={() => dispatch(changeChecksCompanySearch(null))}
          />

          {/* Results limit selector */}
          <LimitSelector
            limit={limit}
            updateLimit={(value) => dispatch(changeChecksListLimit(value))}
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
      </div>
    </section>
  )
}