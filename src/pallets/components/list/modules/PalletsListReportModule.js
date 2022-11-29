import useListPallets from "../../../hooks/useListPallets";
import PalletsList from "../PalletsList";
import PalletsListOptions from "../PalletsListOptions";
// import PalletDefaultQuantityResult from "../PalletDefaultQuantityResult";

// Main components ----------------------------------------------------------------------------------------------------------------------------------------------------------
export default function PalletsListReportModule({
  hideInput,
  queryFrom,
  classNameQuantityResult = "fixed left-1/2 bottom-4"
}) {
  const [{ items, isLoading, isFetching, refetch }, pagination ] = useListPallets({
    companyType: "all",
    queryType: "report",
  });

  console.log("Calcolo boom", items);

  return (
  <section id="pallets-list-report">
    {/* Options */}
    <PalletsListOptions
      companyType={queryFrom}
      queryType="report"
      refetch={refetch}
      pagination={pagination}
      hideInput={hideInput}
    />

    {/* List */}
    <div className="pb-20">
      <PalletsList
        pallets={items}
        isFetching={isLoading || isFetching}
        type="report"
      />
    </div>
  </section>
)}