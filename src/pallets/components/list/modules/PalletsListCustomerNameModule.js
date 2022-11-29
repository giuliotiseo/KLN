import PalletsList from "../PalletsList";
import PalletsListOptions from "../PalletsListOptions";
import PalletCompanyQuantityResult from "../PalletCompanyQuantityResult";
import ErrorPage from "../../../../globals/components/dataDisplay/ErrorPage";
import useListPallets from "../../../hooks/useListPallets";

// Main components ----------------------------------------------------------------------------------------------------------------------------------------------------------
export default function PalletsListCustomerNameModule({
  carrierId,
  hideInput,
  classNameQuantityResult = "fixed left-1/2 bottom-16",
  isShowReversals
}) {
  const [{ items, isLoading, isFetching, refetch }, pagination ] = useListPallets({
    companyType: "carrier",
    queryType: "search",
    isShowReversals
  });

  if(!carrierId) return <ErrorPage title="Ooops">È stato riscontrato un errore durante il caricamento dei dati aziendali</ErrorPage>  
  return <section id="pallets-list-carrier">
    {/* Options */}
    <PalletsListOptions
      companyType="carrier"
      queryType="search"
      refetch={refetch}
      pagination={pagination}
      showRevCheckbox={true}
      isShowReversals={isShowReversals}
      hideInput={hideInput}
    />

    {/* List */}
    <PalletsList
      pallets={items}
      isFetching={isFetching || isLoading}
    />

    {/* Floating elements */}
    <PalletCompanyQuantityResult
      show={items.length > 0}
      items={items}
      queryFrom="carrier"
      className={`${classNameQuantityResult || 'fixed bg-base-100 bottom-4 px-4 py-2 rounded-full shadow-md border border-light-100 dark:border-dark-100 left-1/2'}`}
    />
  </section>
}