import PalletsListCarrierNameModule from "../list/modules/PalletsListCarrierNameModule";
import PalletsListCustomerNameModule from "../list/modules/PalletsListCustomerNameModule";

const PalletsListCompanyBundle = ({
  companyKeyToQuery,
  companyId,
  isShowReversals,
  hideInput,
  classNameQuantityResult
}) => {
  return <>
  { companyKeyToQuery === "carrierId" && (
    <PalletsListCustomerNameModule
      carrierId={companyId}
      isShowReversals={isShowReversals}
      hideInput={hideInput}
      classNameQuantityResult={classNameQuantityResult}
    />
  )}

  { companyKeyToQuery === "customerId" && (
      <PalletsListCarrierNameModule
        customerId={companyId}
        isShowReversals={isShowReversals}
        hideInput={hideInput}
        classNameQuantityResult={classNameQuantityResult}
      />
    )}
  </>
}

export default PalletsListCompanyBundle;