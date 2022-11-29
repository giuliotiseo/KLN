import useListPallets from "../../../hooks/useListPallets";
import PalletsList from "../PalletsList";
import PalletsListOptions from "../PalletsListOptions";
import ErrorPage from "../../../../globals/components/dataDisplay/ErrorPage";
import PalletCompanyQuantityResult from "../PalletCompanyQuantityResult";

// Main components ----------------------------------------------------------------------------------------------------------------------------------------------------------
export default function PalletsListCarrierNameModule({
  customerId,
  hideInput,
  classNameQuantityResult = "fixed left-1/2 bottom-16",
  resultOnTop = false,
  isShowReversals
}) {
  const [{ items, isLoading, isFetching, refetch }, pagination ] = useListPallets({
    companyType: "customer",
    queryType: "search",
    isShowReversals
  });

  if(!customerId) return <ErrorPage title="Ooops">È stato riscontrato un errore durante il caricamento dei dati aziendali</ErrorPage>  
  return <section id="pallets-list-customer">
    {/* Options */}
    <PalletsListOptions
      companyType="customer"
      queryType="search"
      refetch={refetch}
      pagination={pagination}
      showRevCheckbox={true}
      isShowReversals={isShowReversals}
      hideInput={hideInput}
    />

    {/* List */}
    { resultOnTop && (
      <PalletCompanyQuantityResult
        show={items.length > 0}
        items={items}
        queryFrom="customer"
        className={`${classNameQuantityResult || 'px-4 py-2 rounded-full shadow-md border border-light-100 dark:border-dark-100 left-1/2'}`}
      />
    )}

    {/* List */}
    <PalletsList
      pallets={items}
      isFetching={isFetching || isLoading}
    />

    {/* Floating elements */}
    { !resultOnTop && (
      <PalletCompanyQuantityResult
        show={items.length > 0}
        items={items}
        queryFrom="customer"
        className={`${classNameQuantityResult || 'fixed bg-base-100 bottom-4 px-4 py-2 rounded-full shadow-md border border-light-100 dark:border-dark-100 left-1/2'}`}
      />
    )}
  </section>
}