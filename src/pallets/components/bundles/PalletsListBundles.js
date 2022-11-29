import InlineSpinner from "../../../globals/components/spinners/InlineSpinner"
import PalletsListLatestModule from "../list/modules/PalletsListLatestModule"
import PalletsListReportModule from "../list/modules/PalletsListReportModule"
import PalletsListTravelModule from "../list/modules/PalletsListTravelModule"
import PalletsListTypeModule from "../list/modules/PalletsListTypeModule"
import PalletsListCompanyBundle from "./PalletsListCompanyBundle"

export default function PalletsListBoundles({
  listType,
  queryFrom,
  companyKeyToQuery,
  companyId,
  operationDateRange,
  filters,
  limit,
  isShowReversals,
  carrierName,
  hideInput = false,
  classNameQuantityResult,
}) {
  
  if(listType === "latest") {
    return (
      <PalletsListLatestModule
        hideInput={true}
        classNameQuantityResult={classNameQuantityResult}
        queryFrom={queryFrom}
      />
    )
  }

  if(listType === "report") {
    return (
      <PalletsListReportModule
        hideInput={true}
        classNameQuantityResult={classNameQuantityResult}
        queryFrom={queryFrom}
      />
    )
  }

  if(listType === "search") {
    return (
      <PalletsListCompanyBundle
        companyKeyToQuery={companyKeyToQuery}
        carrierName={carrierName}
        companyId={companyId}
        operationDateRange={operationDateRange}
        filters={filters}
        limit={limit}
        isShowReversals={isShowReversals}
        hideInput={hideInput}
        classNameQuantityResult={classNameQuantityResult || null}
      />
    )
  }

  if(listType === "type") {
    return (
      <PalletsListTypeModule
        hideInput={true}
        classNameQuantityResult={classNameQuantityResult}
        queryFrom={queryFrom}
      />
    )
  }
  
  if(listType === "travel") {
    return (
      <PalletsListTravelModule
        hideInput={true}
        classNameQuantityResult={classNameQuantityResult}
        queryFrom={queryFrom}
      />
    )
  }

  return <InlineSpinner />
}