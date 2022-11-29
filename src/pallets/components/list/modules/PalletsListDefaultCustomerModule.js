import useListPallets from "../../../hooks/useListPallets";
import PalletsList from "../PalletsList";
import PalletsListOptions from "../PalletsListOptions";
import ErrorPage from "../../../../globals/components/dataDisplay/ErrorPage";
import PalletDefaultQuantityResult from "../PalletDefaultQuantityResult";

// Main components ----------------------------------------------------------------------------------------------------------------------------------------------------------
export default function PalletsListDefaultCustomerModule({
  customerId,
  hideInput,
  classNameQuantityResult = "fixed left-1/2 bottom-4"
}) {
  const [{ items, isLoading, isFetching: isFetchingList, refetch }, pagination ] = useListPallets({
    companyType: "customer",
    queryType: "latest",
  });

  if(!customerId) return <ErrorPage title="Ooops">È stato riscontrato un errore durante il caricamento dei dati aziendali</ErrorPage>  
  return <section id="pallets-list-customer">
    {/* Options */}
    <PalletsListOptions
      companyType="customer"
      refetch={refetch}
      pagination={pagination}
      hideInput={hideInput}
    />

    {/* List */}
    <PalletsList
      pallets={items}
      isFetching={isFetchingList || isLoading}
    />

    <PalletDefaultQuantityResult
      show={items?.length > 0}
      items={items}
      className={`${classNameQuantityResult} bg-base-100  px-4 py-2 rounded-full shadow-md border border-light-100 dark:border-dark-100`}
      queryFrom="customer"
      forceAddReversal={true}
    />
</section>
}