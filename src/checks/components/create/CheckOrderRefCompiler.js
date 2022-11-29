import OrdersPicker from "./OrdersPicker";
import CheckOrderDetails from "./CheckOrderDetails";
import FullSpinner from "../../../globals/components/spinners/FullSpinner";
const statusesToQuery = ["PENDING", "PICKEDUP", "STOCKED"];

const CheckOrderRefCompiler = ({
  order,
  docs,
  queryFrom,
  callback,
  docNumCallback,
  docsRefCallback,
  clear,
  canChange = true,
}) => {
  if(!queryFrom) return <FullSpinner />;

  // If order is not selected from store show the list
  if(!order) {
    return (
      <OrdersPicker
        queryFrom={queryFrom}
        statuses={statusesToQuery}
        limit={9999}
        inputFilter={{ collectChecks: { eq: true }}}
        callback={callback}
      />
    )
  }

  // If order is selected, show details with docs selector
  return (
    <CheckOrderDetails
      order={order}
      docs={docs}
      clear={clear}
      docNumCallback={docNumCallback}
      docsRefCallback={docsRefCallback}
      canChange={canChange}
    />
  )
}

export default CheckOrderRefCompiler;