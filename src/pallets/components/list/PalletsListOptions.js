import { useDispatch, useSelector } from "react-redux";
import LimitSelector from "../../../globals/components/lists/LimitSelector";
import PalletsListTypeSelector from "./PalletsListTypeSelector";
import RefreshListButton from "../../../globals/components/lists/RefreshListButton";
import {
  changePalletsListOperationDateRange, 
  changePalletsListLimit,
  changePalletsListType,
  changePalletsListTravelStamp,
  changePalletsListShowReversals,
  changePalletsListCompany,
  selectPalletsListCarrier,
  selectPalletsListCustomer,
  selectPalletsListTravelStamp,
  selectPalletsListOperationDateRange,
  selectPalletsListType,
  selectPalletsListLimit
} from "../../slices/palletsListSlice";
import PalletsListTravelSearch from "./PalletsListTravelSearch";
import Checkbox from "../../../globals/components/dataEntry/Checkbox";
import CompanyFinderByCustomer from "../../../globals/components/dataEntry_v2/CompanyFinderByCustomer";
import Pagination from "../../../globals/components/lists_v2/Pagination";
import MonthPicker from "../../../globals/components/lists_v2/MonthPicker";

const optionTextCompanyByRole = {
  "carrier": "Cliente:",
  "customer": "Vettore: ",
}


// Main component ----------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function PalletsListOptions({
  companyType,
  queryType,
  pagination,
  refetch = () => console.log("Default refresh on <ChecksListQueryOptions />"),
  hideInput,
  isShowReversals = true,
}) {
  const [ start, end ] = useSelector(selectPalletsListOperationDateRange);
  const movementType = useSelector(selectPalletsListType);
  const travelStamp = useSelector(selectPalletsListTravelStamp);
  const selectedCarrier = useSelector(selectPalletsListCarrier);
  const selectedCustomer = useSelector(selectPalletsListCustomer);
  const limit = useSelector(selectPalletsListLimit);
  const selectedCompany = {
    carrier: selectedCustomer,
    customer: selectedCarrier
  }

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
          <MonthPicker
            date={start}
            updateMonthDateRange={(value) => dispatch(changePalletsListOperationDateRange(value))}
            className="inline-block w-[200px]"
          />
          
          {/* Sort key selector */}
          { queryType === "search" && !hideInput && (
            <CompanyFinderByCustomer
              companyRole={companyType}
              optionText={optionTextCompanyByRole}
              selectedCustomer={selectedCompany[companyType]}
              callback={({ role, value }) => dispatch(changePalletsListCompany({key: `${role.toLowerCase() !== 'carrier' ? 'customer' : 'carrier'}`, value }))}
              clear={() => dispatch(changePalletsListCompany(null))}
            />
          )}

          { queryType === "type" && (
            <PalletsListTypeSelector
              value={movementType}
              onChange={value => dispatch(changePalletsListType(value))}
            />
          )}

          { queryType === "travel" && (
            <PalletsListTravelSearch
              value={travelStamp}
              onChange={value => dispatch(changePalletsListTravelStamp(value))}
            />
          )}

          {/* Results limit selector */}
          <LimitSelector
            limit={limit}
            updateLimit={(value) => dispatch(changePalletsListLimit(value))}
            label="N.Scambi"
          />
        </div>

        {/* Pagination */}
        { !hideInput && (
          <Checkbox
            id={`show-reversals-checkbox`}
            name={`show-reversals-checkbox`}
            label={"Visualizza storni"}
            value={isShowReversals}
            controlled={true}
            initialStatus={isShowReversals}
            onChange={() => dispatch(changePalletsListShowReversals())}
            styles="mr-4"
          />
        )}

        <Pagination
          goBack={pagination.goBack}
          goNext={pagination.goNext}
          page={pagination.page}
          nextToken={pagination.nextToken}
          previousTokens={pagination.previousTokens}
        />
      </div>
    </section>
  )
}