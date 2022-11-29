import TravelEditorEndCheckpoint from "./TravelEditorEndCheckpoint"

export default function TravelEditorWaypointEnd({ end, selectedWaypointId }) {
  return (
    <li className={selectedWaypointId ? 'opacity-30 pointer-events-none' : 'opacity-100 pointer-events-auto'}>
      <div className={`bg-base-100 rounded-md py-2 px-4 mb-4`}>
        <TravelEditorEndCheckpoint
          checkpoint={end?.checkpoint}
        />
      </div>
    </li>
  )
}