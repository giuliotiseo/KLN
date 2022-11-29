import PalletsList from "../PalletsList";
import ErrorPage from "../../../../globals/components/dataDisplay/ErrorPage";
import PalletDefaultQuantityResult from "../PalletDefaultQuantityResult";
import PalletsListOptions from "../PalletsListOptions";
import useListPallets from "../../../hooks/useListPallets";

// Main components ----------------------------------------------------------------------------------------------------------------------------------------------------------
export default function PalletsListCarrierTypeModule({
  carrierId,
  type,
  classNameQuantityResult = "fixed left-1/2 bottom-4",
}) {
  const [{ items, isLoading, isFetching: isFetchingList, refetch }, pagination ] = useListPallets({
    companyType: "carrier",
    queryType: "type",
  });

  if(!carrierId) return <ErrorPage title="Ooops">È stato riscontrato un errore durante il caricamento dei dati aziendali</ErrorPage>  
    
  return <section id="pallets-list-carrier">
  {/* Options */}
  <PalletsListOptions
    companyType="carrier"
    queryType="type"
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
      forceAddReversal={type === "REVERSAL"}
      className={`${classNameQuantityResult} bg-base-100 bottom-4 px-4 py-2 rounded-full shadow-md border border-light-100 dark:border-dark-100`}
      queryFrom="carrier"
    />
</section>
}