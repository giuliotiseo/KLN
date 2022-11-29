import { useDispatch } from "react-redux";
import CompanyContactFinder from "../../../globals/components/dataEntry/CompanyContactFinder";
import PositionLocalizer from "../../../globals/components/dataEntry/PositionLocalizer";
import { TinyTitle } from "../../../globals/components/typography/titles";
import { addEmptyWaypointToTravelEditor, changeTravelEditorSelectedCheckpoint, changeTravelEditorSelectedCompany, clearSelectedCompany, removeEmptyWaypoint, resetTravelEditorSelectedCompany } from "../../slices/travelEditorSlice";
import { FiCheckCircle, FiChevronLeft, FiPlusCircle, FiX } from "react-icons/fi";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentCompany } from "../../../company/slices/companySlice";
import useListWarehouses from "../../../warehouses/hooks/useListWarehouses";
import Button from "../../../globals/components/buttons_v2/Button";

export default function TravelEditorWaypointNew({
  index,
  waypoint,
  waypoints,
  selectedWaypointId,
}) {
  const [ myWarehousesVisibility, setMyWarehousesVisibility ] = useState(false);
  // Fetch data
  const [{
      items: myWarehouses, 
      isLoading,
      isFetching, 
  }] = useListWarehouses("ALL");

  const { company } = useSelector(selectCurrentCompany);

  const data = waypoint[0];
  const dispatch = useDispatch();


  return (
    <li className="flex flex-col flex-1 h-full">
      <div className="bg-base-100 rounded-md py-2 px-4 w-full">
        <header className="flex justify-between items-center top flex-1 relative">
          <TinyTitle>
            Fermata { index + 1 } - {!data?.companyName ? 'Scegli azienda' : data.companyName}
          </TinyTitle>

          { !data?.companyName && (
            <button
              onClick={() => dispatch(removeEmptyWaypoint(waypoint[0].id))}
              className="text-xl top-2 hover:text-primary-200 dark:hover:text-primary-300"
            >
              <FiX />
            </button>
          )}
        </header>

        { !myWarehousesVisibility && (
          <CompanyContactFinder
            className="my-4"
            label="Cerca in rubrica il nome dell'azienda"
            callback={(company) => dispatch(changeTravelEditorSelectedCompany({ waypoint, company }))}
            company={data?.company || null}
            reset={() => dispatch(resetTravelEditorSelectedCompany({ waypoint }))}
          />
        )}
        
        { !myWarehousesVisibility 
          ? <Button
              text="Seleziona la mia azienda"
              className="btn-primary text-sm"
              loading={isLoading || isFetching}
              onClick={() => {
                dispatch(changeTravelEditorSelectedCompany({
                  waypoint,
                  company: {
                    ...company,
                    warehouses: myWarehouses
                  }
                }))

                setMyWarehousesVisibility(true)
              }}
            />
          : <div className="mt-4">
              <button className="text-lg relative top-1 hover:text-primary-200 dark:hover:text-primary-300" onClick={() => setMyWarehousesVisibility(false)}><FiChevronLeft /></button>
              <span className="inline-block ml-1 font-bold">Scegli il magazzino</span>
            </div>
        }

        { myWarehousesVisibility && (
          <div>
            <ul>
              { myWarehouses.map(warehouse => (
                <li key={warehouse?.extId}>
                  <button
                    className={`p-2 hover:bg-base-200 ${
                      waypoint?.[0]?.checkpoint?.location?.place_id === warehouse?.location?.place_id
                        ? 'font-bold'
                        : 'font-normal'
                    }`}
                    onClick={() => dispatch(changeTravelEditorSelectedCheckpoint({
                      waypoint,
                      checkpoint: { location: warehouse.location }
                    }))}
                  >
                    <div className="flex items-center text-base text-left">
                      { waypoint?.[0]?.checkpoint?.location?.place_id === warehouse?.location?.place_id && (
                        <FiCheckCircle className="text-primary-200 dark:text-primary-300 mr-1" />
                      )}

                      {warehouse.name}
                    </div>
                    <span className="block text-sm text-left text-gray-400">{warehouse.location.address}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        { data.availableCheckpoints && !myWarehousesVisibility
          ? <PositionLocalizer
              location={data?.checkpoint?.location}
              inputWarehouses={data.availableCheckpoints}
              label={"Indica il punto in cui eseguire la fermata"}
              styles="mt-4 mb-2"
              clearLocation={() => dispatch(clearSelectedCompany())}
              setCheckpoint={(value) => dispatch(changeTravelEditorSelectedCheckpoint({
                waypoint,
                checkpoint: value
              }))}
            />
          : null
        }
      </div>

      <div className="my-2 text-center flex items-center juystify-center">
        <button
          onClick={() => dispatch(addEmptyWaypointToTravelEditor({ index,  waypoints }))}
          className={`
            inline-block mx-auto text-3xl text-gray-500 hover:text-primary-200 dark:hover:text-primary-300
            ${ selectedWaypointId ? "opacity-30 pointer-events-none" : "opacity-100"}
          `}
        >
          <FiPlusCircle />
        </button>
      </div>
    </li>
  )
}