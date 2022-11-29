import PalletsListCarrierTypeModule from "../list/modules/PalletsListCarrierTypeModule";
import PalletsListCustomerTypeModule from "../list/modules/PalletsListCustomerTypeModule";

const PalletsListTypeBundle = ({
  companyKeyToQuery,
  companyId,
  type,
  operationDateRange,
  limit,
  filters,
  nextToken,
  classNameQuantityResult,
}) => {
  return <>
    { companyKeyToQuery === "carrierId" && (
      <PalletsListCarrierTypeModule
        carrierId={companyId}
        type={type}
        operationDateRange={operationDateRange}
        limit={limit}
        filters={filters}
        nextToken={nextToken}
        classNameQuantityResult={classNameQuantityResult}
      />
    )}

    { companyKeyToQuery === "customerId" && (
      <PalletsListCustomerTypeModule
        customerId={companyId}
        type={type}
        operationDateRange={operationDateRange}
        limit={limit}
        filters={filters}
        nextToken={nextToken}
        classNameQuantityResult={classNameQuantityResult}
      />
    )}
  </>
}

export default PalletsListTypeBundle;