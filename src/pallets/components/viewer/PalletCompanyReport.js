import { useSelector } from "react-redux";
import { selectTenant } from "../../../company/slices/companyInfoSlice";
import PalletsListBoundles from "../bundles/PalletsListBundles";
import { SmallTitle } from "../../../globals/components/typography/titles";
import { selectPalletsListLimit, selectPalletsListNextToken, selectPalletsListOperationDateRange } from "../../slices/palletsListSlice";
import { selectCurrentCompany } from "../../../company/slices/companySlice";

export default function PalletCompanyReport({
  companyName
}) {
  const { id: companyId } = useSelector(selectCurrentCompany);
  const operationDateRange = useSelector(selectPalletsListOperationDateRange);
  const limit = useSelector(selectPalletsListLimit);
  const nextToken = useSelector(selectPalletsListNextToken);

  if(!companyName) return null;

  return (
    <section className="mt-6">
    <SmallTitle styles="mb-4">Situazione contabile con { companyName }</SmallTitle>
      <PalletsListBoundles
        listType={"search"}
        companyKeyToQuery={"carrierId"}
        companyId={companyId}
        operationDateRange={operationDateRange}
        limit={limit}
        nextToken={nextToken}
        customerName={companyName}
        hideInput={true}
        classNameQuantityResult="relative mx-6 mt-8"
        isShowReversals={true}
      />
    </section>
  )
}