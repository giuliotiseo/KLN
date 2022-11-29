import CardDetails from "../../../globals/components/dataDisplay/CardDetails";

export default function PalletWaypointSelector({
  companyId,
  waypoints,
  palletHandlingCounter,
  selectedWaypoint,
  onChange
}){
  return (
    <CardDetails
      header={<b className="block py-2">Scegli il luogo di scambio</b>}
      className="mt-4"
    >
      <ul>
        { waypoints.map((wp, index) => (
          <li key={wp.id} className="flex py-2">
            {(!selectedWaypoint || (selectedWaypoint?.id === wp.id)) && 
              <input
                type="checkbox"
                className="accent-primary-200 dark:accent-primary-300 hover:accent-primary-300 dark:hover:accent-primary-100 cursor-pointer mt-1 mr-2"
                value={wp.id === selectedWaypoint?.id}
                checked={wp.id === selectedWaypoint?.id}
                onChange={() => {
                  console.log("Cambia waypoint", wp);
                  onChange(wp)
                }}
                disabled={companyId === wp.companyId || (selectedWaypoint?.id && wp.id !== selectedWaypoint?.id)}
              />
            }

            <div className={companyId === wp.companyId ? 'opacity-30' : selectedWaypoint ? selectedWaypoint?.id !== wp.id ? "opacity-30" : "" : ""}>
              <p>
                Fermata {index + 1} - {wp.companyName}
                { companyId !== wp.companyId  && <span className="inline-block text-sm ml-2 text-secondary-200 dark:text-secondary-300">{palletHandlingCounter[wp.id]}</span> }
              </p>
              
              <span className="block text-sm opacity-50">{wp.checkpoint.location.address}</span>
            </div>
          </li>
        ))}
      </ul>
    </CardDetails>
  )
}