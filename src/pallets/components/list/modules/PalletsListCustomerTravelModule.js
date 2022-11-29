import { useState } from "react";
import PalletsList from "../PalletsList";
import PalletsListOptions from "../PalletsListOptions";
import ErrorPage from "../../../../globals/components/dataDisplay/ErrorPage";
import { usePalletsByCustomerTravelQuery } from "../../../api/pallets-api-slice";

// Main components ----------------------------------------------------------------------------------------------------------------------------------------------------------
export default function PalletsListCustomerTravelModule({
  customerId,
  travelStamp,
  operationDateRange,
  limit,
  filters = {},
  nextToken,
}) {
  const [ multiSelect, setMultiSelect ] = useState(false);
  const { data = [], isLoading, isFetching: isFetchingList, refetch } = usePalletsByCustomerTravelQuery({
    customerId,
    travelStamp,
    operationDate: operationDateRange,
    limit,
    filters,
    nextToken
  });  
  if(!customerId) return <ErrorPage title="Ooops">È stato riscontrato un errore durante il caricamento dei dati aziendali</ErrorPage>  
  
  return <section id="pallets-list-carrier">
    {/* Options */}
    <PalletsListOptions
      sortKeyParam={"travel"}
      companyRole="customer"
      hideInput={true}
      multiselect={multiSelect}
      setMultiselect={setMultiSelect}
      travelStamp={travelStamp}
      operationDateFrom={new Date(operationDateRange[0])}
      operationDateTo={new Date(operationDateRange[1])}
      limit={limit}
      refresh={refetch}
      nextToken={data?.nextToken}
    />

    {/* List */}
    <PalletsList
      pallets={data}
      isFetching={isFetchingList || isLoading}
    />
</section>
}