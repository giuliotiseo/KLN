import LogsDispayList from "../../../globals/components/layout/LogsDispayList";
import { SmallTitle } from "../../../globals/components/typography/titles";

const PalletViewerLogs = ({ logs }) => {
  return (
    <div className='h-full w-full rounded-md'>
      <SmallTitle styles="mb-4">Attività recenti</SmallTitle>
      <LogsDispayList JSONLogs={logs} />
    </div>
  )
}

export default PalletViewerLogs;