import { useEffect, useState } from "react";
import ActionButton from "../../../globals/components/buttons/ActionButton";
import Checkbox from "../../../globals/components/dataEntry/Checkbox";
import { Paragraph, SmallParagraph } from "../../../globals/components/typography/paragraphs";
import { removeDuplicates } from "../../../globals/libs/helpers";
import { OPERATION_DESCRIPTION } from "../../libs/helpers";
import { useUpdateCompletedWaypointMutation } from "../../api/travels-api-slice";
import { AiOutlineFolder, AiOutlineFolderOpen } from "react-icons/ai";
import InlineSpinner from "../../../globals/components/spinners/InlineSpinner";

const LoadingComponent = () => (
  <div className="mt-2 flex items-center">
      <InlineSpinner />
      <Paragraph styles="opacity-50 ml-2">Caricamento in corso</Paragraph>
  </div>
)

export default function TravelRoutesData({ travel, start, end, waypoints, setSelectedOrderId }) {
  const [ selectedWaypoint, setWaypoint ] = useState(false);
  const [ loading, setLoading ] = useState(null);
  const [ updateCompletedWaypoint, { isLoading, isSuccess, isError }] = useUpdateCompletedWaypointMutation();

  useEffect(() => {
    if(isSuccess) {
      setLoading(false);
    }
  }, [isSuccess])

  if(!waypoints?.length) return <p>Non è stato possibile caricare l'itinerario di viaggio</p>
  
  return (
    <section>
      <div className="bg-base-100 rounded-md my-4 p-4">
        <header className="flex justify-between">
          <Paragraph><b>Partenza</b></Paragraph>
        </header>
        <SmallParagraph>{start.checkpoint.location.address}</SmallParagraph>
        <div className="flex items-center justify-between mt-4 border-t">
          { loading === start.id 
            ? <LoadingComponent />
            : <Checkbox
                id={start.id}
                name={start.id}
                label={start?.completed ? 'Completato' : 'Non completato'}
                value={start?.completed ? true : false}
                initialStatus={start?.completed}
                controlled={true}
                labelStyle="mt-2"
                onChange={() => {
                  setLoading(start.id)
                  updateCompletedWaypoint({
                    waypointId: start.id,
                    waypointIndex: null,
                    waypoint: start,
                    travel,
                  })
                }}
              />
          }
        </div>
      </div>

      { waypoints.map((wp, index) => (
        <div key={wp.id} className="bg-base-100 rounded-md my-4 p-4">
          <header className="flex justify-between items-start">
            <div>
              <Paragraph><b>Fermata {index + 1}</b> - {wp.companyName}</Paragraph>
              <SmallParagraph>{wp.checkpoint.location.address}</SmallParagraph>
            </div>
            <ActionButton
              styles="text-primary-200 bg-light-100 hover:bg-light-300 rounded-full w-[44px] h-[44px]"
              icon={() => selectedWaypoint !== wp.id ? <AiOutlineFolder className="text-xl" /> : <AiOutlineFolderOpen />}
              onClick={() => setWaypoint(prev => prev && prev === wp.id ? false : wp.id)}
            />
          </header>


          { selectedWaypoint === wp.id && (
            <ul className="my-4">
              {wp.orders.map(order => (
                <li key={order.plannedId} className="flex items-center justify-between border-b border-b-light-100 pr-2">
                  <ActionButton
                    icon={() => <AiOutlineFolderOpen />}
                    text={order.orderStamp}
                    styles="btn-ghost"
                    onClick={() => setSelectedOrderId(order.orderId)}
                  />
                  <div>{ OPERATION_DESCRIPTION[order.operation]}</div>
                </li>
              ))}
            </ul>
          )}

          <div className="flex items-center justify-between mt-4 border-t">
            { loading === wp.id
                ? <LoadingComponent />
                : <Checkbox
                    id={wp.id}
                    name={wp.id}
                    label={wp?.completed ? 'Completato' : 'Non completato'}
                    value={wp?.completed ? true : false}
                    initialStatus={wp?.completed}
                    controlled={true}
                    labelStyle="mt-2"
                    onChange={() => {
                      setLoading(wp.id);
                      updateCompletedWaypoint({
                      waypointId: wp.id,
                      waypointIndex: index,
                      waypoint: wp,
                      travel
                    })}}
                  />
            }
            
            <div className="mt-4 text-sm">
              { removeDuplicates(wp.orders
                .map(order => order.operation))
                .map(o => <span key={o} className="chip-neutral">{OPERATION_DESCRIPTION[o]}</span>
              )}
            </div>
          </div>

        </div>
      ))}

      <div className="bg-base-100 rounded-md my-4 p-4">
        <header className="flex justify-between">
          <Paragraph><b>Fine</b></Paragraph>
        </header>
        <SmallParagraph>{end.checkpoint.location.address}</SmallParagraph>
        <div className="flex items-center justify-between mt-4 border-t">
          { loading === end.id
            ? <LoadingComponent />
            : <Checkbox
                id={end.id}
                name={end.id}
                label={end?.completed ? 'Completato' : 'Non completato'}
                value={end?.completed ? true : false}
                initialStatus={end?.completed}
                controlled={true}
                labelStyle="mt-2"
                onChange={() => {
                  setLoading(end.id);
                  updateCompletedWaypoint({
                    waypointId: end.id,
                    waypointIndex: null,
                    waypoint: end,
                    travel,
                  })}
                }
              />
          }
        </div>
      </div>
    </section>
  )
}