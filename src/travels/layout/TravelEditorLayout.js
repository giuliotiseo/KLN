import SafeCol from "../../globals/components/layout/SafeCol";
import TravelEditorWaypoints from "../components/editor/TravelEditorWaypoints";
import OrdersPickerForTravelEditor from "../components/editor/OrdersPickerForTravelEditor";
import InfoTravelEditorCompiler from "../components/form/InfoTravelEditorCompiler";
import TravelMap from "../components/TravelMap";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { FiTerminal } from "react-icons/fi";
import Button from "../../globals/components/buttons_v2/Button";
import { BiReset } from "react-icons/bi";
import { changeTravelEditorStatus, resetTravelEditor } from "../slices/travelEditorSlice";
import StatusPicker from "../../globals/components/pickers/StatusPicker";
import { TRAVEL_DESCRIPTOR } from "../libs/helpers";

// Main component ------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function TravelEditorLayout({
  status,
  orders,
  waypoints,
  start,
  trip,
  end,
  save = null,
  directions,
  calculateRoute,
}) {
  const [ filterBox, showFilterBox ] = useState(false);
  const mapScrollbarRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if(mapScrollbarRef?.current?.contentEl) {
      mapScrollbarRef.current.contentEl.className = "simplebar-content h-full";
    }
  }, [mapScrollbarRef?.current?.contentEl]);


  return (
    <div className="flex flex-col h-full w-full gap-4">      
      {/* Sidebar */}
      <div className="flex flex-col md:flex-row h-full">
        <aside className="relative rounded-lg flex-3 my-2 overflow-hidden">
          <SafeCol id="TravelEditorLayout--sidebar">
            <h3 className="title-3 mb-4">Info in tempo reale</h3>
            <div className="bg-base-100 rounded-md mb-4 p-4">
              <StatusPicker
                id="status"
                element={{ status }}
                callback={({ value }) => dispatch(changeTravelEditorStatus(value))}
                label="Stato viaggio"
                optionsObj={TRAVEL_DESCRIPTOR}
              />
            </div>

            <div className="mr-4">
              <OrdersPickerForTravelEditor
                orders={orders}
                waypoints={waypoints}
              />
            </div>
          </SafeCol>
        </aside>

        {/* Content */}
        <section className="relative flex-2 bg-base-200 pl-2">
          <SafeCol id="TravelEditorLayout--waypoints">
            <TravelEditorWaypoints
              waypoints={waypoints}
              start={start}
              end={end}
            />
          </SafeCol>
        </section>

        <section className="relative flex-2 rounded-md overflow-hidden">
          <SafeCol id="TravelEditorLayout--right" ref={mapScrollbarRef}>            
            { filterBox 
              ? <div className="mr-2">
                  <p>Filtri</p>
                  {/* <OrdersListFiltersForTravel
                    filter={filter}
                    onChange={(payload) => dispatch(changeTravelCreatorFilterOrders(payload))}
                    reset={() => dispatch(resetTravelCreatorFilter())}       
                  /> */}
                </div>
              : <div className="relative h-full">
                  <InfoTravelEditorCompiler
                    className="absolute left-2 top-2 w-[400px] z-10 shadow-md"
                    calculateRoute={calculateRoute}
                    trip={trip}
                  />

                  <TravelMap
                    trip={trip}
                    directions={directions}
                  />
                </div>
            }
          </SafeCol>
        </section>
      </div>

      <footer className="footer">
        <h5 className="title-5 uppercase opacity-50 flex items-center">
          <FiTerminal className="mr-1" />
          <span className="text-sm">Modifica viaggio</span>
        </h5>

        <div className="flex items-center gap-2">
          <Button
            className="btn-primary-outline  ml-auto"
            icon={<BiReset />}
            text="Reset"
            onClick={() => dispatch(resetTravelEditor())}
          />

          <Button
            className="btn-primary ml-auto"
            icon={save.icon}
            text={save.text}
            loading={save.loading}
            onClick={save.onClick}
          />
        </div>
      </footer>


    </div>
  )
}