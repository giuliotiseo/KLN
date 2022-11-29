import { useSelector } from "react-redux";
import { usePalletByIdForCarrierQuery, usePalletByIdForCustomerQuery } from "../api/pallets-api-slice";
import FullSpinner from "../../globals/components/spinners/FullSpinner";
import PalletViewerLayout from "../layout/PalletViewerLayout";
import { FiEdit } from "react-icons/fi";
// API
import { selectCurrentCompany } from "../../company/slices/companySlice";

const queryHandler = {
  carrier: usePalletByIdForCarrierQuery,
  customer: usePalletByIdForCustomerQuery
}

export default function PalletViewerContainer({
  queryFrom,
  id,
}) {
  const { type } = useSelector(selectCurrentCompany);
  const { data: palletHandling = {}, isFetching } = queryHandler[queryFrom]({ id });

  // Await data
  if(!id || !palletHandling || isFetching ) return <FullSpinner />

  // Edit link params
  const edit_link = {
    to: `/pallets/edit?from=${queryFrom}&id=${palletHandling.id}`,
    text: "Modifica movimentazione",
    icon: () => <FiEdit />
  }  

  return (
    <PalletViewerLayout
      palletHandling={palletHandling}
      link={edit_link}
      queryFrom={queryFrom.toLowerCase()}
      companyType={type}
    />
  )
}