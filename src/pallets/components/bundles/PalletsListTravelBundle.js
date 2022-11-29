import PalletsListCarrierTravelModule from "../list/modules/PalletsListCarrierTravelModule";
import PalletsListCustomerTravelModule from "../list/modules/PalletsListCustomerTravelModule";

const PalletsListTravelBundle = ({
  companyKeyToQuery,
  companyId,
  travelStamp,
  operationDateRange,
  limit,
  filters,
  nextToken,
  classNameQuantityResult,
}) => {
  return <>
    { companyKeyToQuery === "carrierId" && (
      <PalletsListCarrierTravelModule
        carrierId={companyId}
        travelStamp={travelStamp}
        operationDateRange={operationDateRange}
        limit={limit}
        filters={filters}
        nextToken={nextToken}
        classNameQuantityResult={classNameQuantityResult}
      />
    )}

    { companyKeyToQuery === "customerId" && (
      <PalletsListCustomerTravelModule
        customerId={companyId}
        travelStamp={travelStamp}
        operationDateRange={operationDateRange}
        limit={limit}
        filters={filters}
        nextToken={nextToken}
        classNameQuantityResult={classNameQuantityResult}
      />
    )}
  </>
}

export default PalletsListTravelBundle;