import useListPallets from "../../../hooks/useListPallets";
import PalletsList from "../PalletsList";
import PalletsListOptions from "../PalletsListOptions";
import PalletDefaultQuantityResult from "../PalletDefaultQuantityResult";

// Main components ----------------------------------------------------------------------------------------------------------------------------------------------------------
export default function PalletsListTypeModule({
  hideInput,
  queryFrom,
  classNameQuantityResult = "fixed left-1/2 bottom-4"
}) {
  const [{ items, isLoading, isFetching, refetch }, pagination ] = useListPallets({
    companyType: "all",
    queryType: "type",
  });

  return <section id="pallets-list-type">
  {/* Options */}
  <PalletsListOptions
    companyType={queryFrom}
    queryType="type"
    refetch={refetch}
    pagination={pagination}
    hideInput={hideInput}
  />

    {/* List */}
    <div className="pb-20">
      <PalletsList
        pallets={items}
        isFetching={isLoading || isFetching}
        type="type"
      />
    </div>

    {/* Floating elements */}
    <PalletDefaultQuantityResult
      show={items?.length > 0}
      items={items}
      className={`${classNameQuantityResult} bg-base-100  px-4 py-2 rounded-full shadow-md border border-light-100 dark:border-dark-100`}
      queryFrom={queryFrom}
      forceAddReversal={true}
    />
</section>
}