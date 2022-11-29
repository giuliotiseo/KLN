import { useEffect, useRef } from "react";
import SafeCol from "../../globals/components/layout/SafeCol";
import DriverData from "../components/viewer/DriverData";
import VehicleData from "../components/viewer/VehicleData";
import OrdersData from "../components/viewer/OrdersData";
import TravelRoutesData from "../components/viewer/TravelRoutesData";
import TravelMap from "../components/TravelMap";
import TravelStatusPosition from "../components/viewer/TravelStatusPosition";
import EstimatedTravelData from "../components/viewer/EstimatedTravelData";
import TravelViewerLogs from "../components/viewer/TravelViewerLogs";
import { FiCheck, FiTerminal } from "react-icons/fi";
import Button from "../../globals/components/buttons_v2/Button";
import { BiReset } from "react-icons/bi";
import LinkButton from "../../globals/components/buttons_v2/LinkButton";

// Main component ------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function TravelViewerLayout({
  travel,
  link,
  directions,
  setSelectedOrderId,
  setConfirmationModal,
  updateLastPosition,
}) {
  const mapScrollbarRef = useRef();

  useEffect(() => {
    if(mapScrollbarRef?.current?.contentEl) {
      mapScrollbarRef.current.contentEl.className = "simplebar-content h-full mt-4 rounded-md overflow-hidden";
    }
  }, [mapScrollbarRef?.current?.contentEl]);

  const trip = [ travel.start, ...travel.waypoints, travel.end ].map(wp => ({
    ...wp.checkpoint.location,
    coordinate: { lat: wp.checkpoint.location.coordinate[0], lng: wp.checkpoint.location.coordinate[1] }
  }));

  return (
    <div className="flex flex-col h-full w-full gap-4">      
      {/* Sidebar */}
      <div className="flex flex-col md:flex-row h-full">
        <aside className="relative rounded-lg flex-3 my-2 overflow-hidden">
          <SafeCol id="TravelViewerLayout--sidebar">
            <div className="mr-4">
              <TravelStatusPosition travel={travel} updateLastPosition={updateLastPosition} />
              <DriverData driver={travel.driver} />
              <VehicleData licensePlate={travel.licensePlate} vehicleName={travel.vehicleName} />
              <OrdersData orders={travel.orders} travelType={travel.travelType} />
              <TravelViewerLogs logs={travel.log} />
            </div>
          </SafeCol>
        </aside>

        {/* Itinerary */}
        <section className="relative flex-2 bg-base-200 pl-2">
          <SafeCol id="TravelViewerLayout--content">
            <div className="pr-4">
              <TravelRoutesData
                travel={travel}
                start={travel.start}
                end={travel.end}
                waypoints={travel.waypoints}
                setSelectedOrderId={setSelectedOrderId}
              />
            </div>
          </SafeCol>
        </section>

        {/* Content */}
        <section className="relative flex-2 rounded-md overflow-hidden">
          <SafeCol id="TravelViewerLayout--right" ref={mapScrollbarRef}>
            <div className="relative pr-4 h-full">
              <TravelMap
                directions={directions}
                trip={trip}
              />

              <EstimatedTravelData
                length={travel?.estimatedTravelLength}
                costs={travel?.estimatedTravelCosts}
                time={travel?.estimatedTravelTime}
              />
            </div>
          </SafeCol>
        </section>
      </div>

      <footer className="footer">
        <h5 className="title-5 uppercase opacity-50 flex items-center">
          <FiTerminal className="mr-1" />
          <span className="text-sm">Dettagli viaggio</span>
        </h5>

        <div className="flex items-center gap-2">
          <Button
            className="btn-primary-outline  ml-auto"
            icon={<BiReset />}
            text="Elimina"
            onClick={() => setConfirmationModal(true)}
          />

          <LinkButton
            className="btn-primary ml-auto"
            icon={<FiCheck />}
            text="Modifica"
            to={`/travels/edit?id=${travel.id}`}
          />
        </div>
      </footer>

    </div>
  )
}