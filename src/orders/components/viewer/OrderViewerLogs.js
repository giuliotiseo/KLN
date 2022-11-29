import CardDetails from "../../../globals/components/dataDisplay/CardDetails";
import LogsDispayList from "../../../globals/components/layout/LogsDispayList";

const OrderViewerLogs = ({ logs }) => {
  return (
    <CardDetails
      header={<h4 className="title-3">Attività recenti sull'ordine</h4>}
      footer={null}
      clear={false}
    >
      <LogsDispayList JSONLogs={logs} />
    </CardDetails>
  )
}

export default OrderViewerLogs;