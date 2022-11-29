import useListPallets from "../../../hooks/useListPallets";
import PalletsList from "../PalletsList";
import PalletsListOptions from "../PalletsListOptions";
import ErrorPage from "../../../../globals/components/dataDisplay/ErrorPage";
import PalletDefaultQuantityResult from "../PalletDefaultQuantityResult";

// Main components ----------------------------------------------------------------------------------------------------------------------------------------------------------
export default function PalletsListDefaultCarrierModule({
  carrierId,
  hideInput,
  classNameQuantityResult = "fixed left-1/2 bottom-4"
}) {
  const [{ items, isLoading, isFetching: isFetchingList, refetch }, pagination ] = useListPallets({
    companyType: "carrier",
    queryType: "latest",
  });

  if(!carrierId) return <ErrorPage title="Ooops">È stato riscontrato un errore durante il caricamento dei dati aziendali</ErrorPage>  
  
  return <section id="pallets-list-carrier">
  {/* Options */}
  <PalletsListOptions
    companyType="carrier"
    queryType="latest"
    refetch={refetch}
    pagination={pagination}
    hideInput={hideInput}
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
      className={`${classNameQuantityResult} bg-base-100  px-4 py-2 rounded-full shadow-md border border-light-100 dark:border-dark-100`}
      queryFrom="carrier"
      forceAddReversal={true}
    />
</section>
}