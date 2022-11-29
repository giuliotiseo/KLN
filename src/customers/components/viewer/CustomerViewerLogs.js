import LogsDispayList from "../../../globals/components/layout/LogsDispayList";

const CustomerViewerLogs = ({ logs }) => {
  return (
    <div className='h-full w-full rounded-md'>
      <LogsDispayList JSONLogs={logs} />
    </div>
  )
}

export default CustomerViewerLogs;