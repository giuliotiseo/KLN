import { useDispatch } from "react-redux";
import SafeCol from "../../globals/components/layout/SafeCol";
import OrdersPickerForTravelCreator from "../components/creator/OrdersPickerForTravelCreator";
import TravelCreatorWaypoints from "../components/creator/TravelCreatorWaypoints";
import InfoTravelCreatorCompiler from "../components/form/InfoTravelCreatorCompiler";
import TravelMap from "../components/TravelMap";
import { useEffect, useRef, useState } from "react";
import OrdersListFiltersForTravel from "../components/form/OrdersListFiltersForTravel";
import { FiCheck, FiTerminal } from "react-icons/fi";
import Button from "../../globals/components/buttons_v2/Button";
import { BiReset } from "react-icons/bi";
import { changeOrdersList, resetOrdersListFromTravel } from "../../orders/slices/ordersListSlice";
import { resetTravelCreator } from "../slices/travelCreatorSlice";

// Main component ------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function TravelCreatorLayout({
  save = null,
  createdAtRange,
  calculateRoute,
  trip,
  directions,
  showOrderDetailsDrawer,
  filter
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
          <SafeCol id="TravelCreatorLayout--sidebar">
            <div className="mr-4">
              <OrdersPickerForTravelCreator
                createdAtRange={createdAtRange}
                filterBox={filterBox}
                showFilterBox={showFilterBox}
                showOrderDetailsDrawer={showOrderDetailsDrawer}
              />
            </div>
          </SafeCol>
        </aside>

        {/* Content */}
        <section className="relative flex-2 bg-base-200">
          <SafeCol id="travel-creator-info" ref={mapScrollbarRef}>
            <div className="mr-4">
              <TravelCreatorWaypoints />
            </div>
          </SafeCol>
        </section>

        <section className="relative flex-2 rounded-md overflow-hidden">
          <SafeCol id="travel-creator-info" ref={mapScrollbarRef}>          
            { filterBox 
              ? <div className="mr-2">
                  <OrdersListFiltersForTravel
                    filter={filter}
                    onChange={(payload) => dispatch(changeOrdersList(payload))}
                    reset={() => dispatch(resetOrdersListFromTravel())}       
                  />
                </div>
              : <div className="relative h-full">
                  <InfoTravelCreatorCompiler
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
          <span className="text-sm">Registrazione viaggio</span>
        </h5>

        <div className="flex items-center gap-2">
          <Button
            className="btn-primary-outline  ml-auto"
            icon={<BiReset />}
            text="Reset"
            onClick={() => dispatch(resetTravelCreator())}
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