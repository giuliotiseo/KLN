import useListPallets from "../../../hooks/useListPallets";
import PalletsList from "../PalletsList";
import PalletsListOptions from "../PalletsListOptions";
import PalletDefaultQuantityResult from "../PalletDefaultQuantityResult";
import ErrorPage from "../../../../globals/components/dataDisplay/ErrorPage";

// Main components ----------------------------------------------------------------------------------------------------------------------------------------------------------
export default function PalletsListCarrierTravelModule({
  carrierId,
  travelStamp,
  operationDateRange,
  limit,
  classNameQuantityResult = "fixed left-1/2 bottom-4",
}) {
  const [{ items, isLoading, isFetching: isFetchingList, refetch }, pagination ] = useListPallets({
    companyType: "carrier",
    queryType: "travel",
  });

  if(!carrierId) return <ErrorPage title="Ooops">È stato riscontrato un errore durante il caricamento dei dati aziendali</ErrorPage>  
  
  return <section id="pallets-list-carrier">
    {/* Options */}
    <PalletsListOptions
      companyType="carrier"
      queryType="travel"
      refetch={refetch}
      pagination={pagination}
      hideInput={true}
    />

    {/* List */}
    <PalletsList
      pallets={items}
      isFetching={isFetchingList || isLoading}
    />
    
    {/* Floating elements */}
    <PalletDefaultQuantityResult
      show={items?.length > 0}
      items={items}
      className={`${classNameQuantityResult} bg-base-100 bottom-4 px-4 py-2 rounded-full shadow-md border border-light-100 dark:border-dark-100`}
      queryFrom="carrier"
    />
</section>
}