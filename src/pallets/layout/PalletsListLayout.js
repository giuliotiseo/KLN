import { useState } from "react";
import SafeCol from "../../globals/components/layout/SafeCol";
import PalletsListBoundles from "../components/bundles/PalletsListBundles";
import PalletsListSidebar from "../components/list/PalletsListSidebar";
import PalletsListFilters from "../components/list/PalletsListFilters";
import RoundedBg from "../../globals/components/layout/RoundedBg";
import PageSpinner from "../../globals/components/layout/PageSpinner";

// Main component -----------------------------------------------------------------------------------------------
export default function PalletsListLayout({
  companyKeyToQuery,
  queryFrom,
  companyId,
  listType = "default",
  type,
  travelStamp,
  carrierName,
  customerName,
  filters,
  isShowReversals = true,
}) {
  const [ isOpenFilters, setIsOpenFilters ] = useState(false);

  if(!companyKeyToQuery) return <PageSpinner message="Caricamento movimentazioni pallet" />
  return (
    <>
      {/* Sidebar */}
      <aside className="relative mr-2 rounded-lg flex-1 min-w-[180px]">
        <PalletsListSidebar
          companyKeyToQuery={companyKeyToQuery}
          queryFrom={queryFrom}
        />
      </aside>

      {/* Content */}
      <section className="relative flex-6">
        <RoundedBg />
        <SafeCol id="pallet-movements-list h-full">
          <div className="pr-4">
            <PalletsListBoundles
              queryFrom={queryFrom}
              listType={listType}
              companyKeyToQuery={companyKeyToQuery}
              companyId={companyId}
              isShowReversals={isShowReversals}
              carrierName={carrierName}
              customerName={customerName}
              type={type}
              travelStamp={travelStamp}
            />
          </div>
        </SafeCol>
      </section>

      {/* Floating elements */}
      <PalletsListFilters
        isOpenFilters={isOpenFilters}
        setIsOpenFilters={setIsOpenFilters}
        filters={filters}
      />
    </>
  )
}