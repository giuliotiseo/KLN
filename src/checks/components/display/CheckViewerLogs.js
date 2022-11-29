import LogsDispayList from "../../../globals/components/layout/LogsDispayList";

const CheckViewerLogs = ({ logs }) => {
  return (
    <div className='h-full w-full rounded-md'>
      <h3 className="title-5 mt-6 mb-4 uppercase text-gray-500 dark:text-gray-600">Attività recenti</h3>
      <LogsDispayList JSONLogs={logs} />
    </div>
  )
}

export default CheckViewerLogs;