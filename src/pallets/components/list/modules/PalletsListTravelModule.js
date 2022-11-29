import useListPallets from "../../../hooks/useListPallets";
import PalletsList from "../PalletsList";
import PalletsListOptions from "../PalletsListOptions";
import PalletDefaultQuantityResult from "../PalletDefaultQuantityResult";

// Main components ----------------------------------------------------------------------------------------------------------------------------------------------------------
export default function PalletsListTravelModule({
  hideInput,
  classNameQuantityResult = "fixed left-1/2 bottom-4",
  queryFrom,
}) {
  const [{ items, isLoading, isFetching, refetch }, pagination ] = useListPallets({
    companyType: "all",
    queryType: "travel",
  });

  return <section id="pallets-list-type">
  {/* Options */}
  <PalletsListOptions
    companyType={queryFrom}
    queryType="travel"
    refetch={refetch}
    pagination={pagination}
    hideInput={hideInput}
  />

    {/* List */}
    <div className="pb-20">
      <PalletsList
        pallets={items}
        isFetching={isLoading || isFetching}
        type="travel"
      />
    </div>

    {/* Floating elements */}
    <PalletDefaultQuantityResult
      show={items?.length > 0}
      items={items}
      className={`${classNameQuantityResult} bg-base-100  px-4 py-2 rounded-full shadow-md border border-light-100 dark:border-dark-100`}
      queryFrom={"carrier"}
      forceAddReversal={true}
    />
  </section>
}