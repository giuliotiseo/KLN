import PalletCreatorForm from "../components/form/PalletCreatorForm";
import PalletCreatorSideTravel from "../components/form/PalletCreatorSideTravel";
import FullSpinner from "../../globals/components/spinners/FullSpinner";
import PalletBasicInfoViewer from "../components/viewer/PalletBasicInfoViewer";
import TravelsListDepartureContainer from "../../travels/containers/TravelsListDepartureContainer";
import SafeCol from "../../globals/components/layout/SafeCol";
import Button from "../../globals/components/buttons_v2/Button";
import { SmallTitle } from "../../globals/components/typography/titles";
import { resetPalletCreator } from "../slices/palletCreatorSlice";
import { BiReset } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { FiTerminal } from "react-icons/fi";

// Main component -----------------------------------------------------------------------------------------------
export default function PalletCreatorLayout({
  // basic info
  companyId, tenant, companiesPalletInfo, hasDelivery, drawerState, isLoading, 
  // travel
  travel_id, travelStamp, waypoint, travel, isTravelSelected,
  // Operations
  loads, unloads, reversal, operationDate,
  // Validations
  adminValidation,
  // Additional data
  files, image, note,
  // Callbacks
  save, setLeaveModal, readOnlyData,
}) {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col h-full w-full">      
      {/* Sidebar */}
      <div className="flex flex-col md:flex-row h-full">
        <aside className="relative mr-2 rounded-lg flex-1 min-w-[350px]">
          <PalletCreatorSideTravel
            companyId={companyId}
            travel={travel}
            travel_id={travel_id}
            isTravelSelected={isTravelSelected}
            travelStamp={travelStamp}
            waypoint={waypoint}
            readOnlyData={readOnlyData}
            setLeaveModal={setLeaveModal}
          />
        </aside>

        {/* Content */}
        <section className="relative flex-2">
          { isLoading && <FullSpinner /> }
          
          {(!travel_id || !waypoint) && (
            <SafeCol>
              <SmallTitle styles="my-4">Copia ID Viaggio dall'elenco</SmallTitle>
              <div className="pr-4">
                <TravelsListDepartureContainer />
              </div>
            </SafeCol>
          )}
          
          { waypoint && !readOnlyData?.id && !isLoading && (
            <PalletCreatorForm
              loads={loads}
              unloads={unloads}
              reversal={reversal}
              hasDelivery={hasDelivery}
              companiesPalletInfo={companiesPalletInfo}
              note={note}
              operationDate={operationDate}
              companyId={companyId}
              tenant={tenant}
              adminValidation={adminValidation}
              files={files}
              image={image}
              drawerState={drawerState}
            />
          )}

          { readOnlyData?.id && (
            <SafeCol id="pallet-creator-handling-viewer">
              <PalletBasicInfoViewer
                palletHandling={readOnlyData}
                idKey="travel_id"
              />
            </SafeCol>
          )}
        </section>
      </div>

      <footer className="footer">
        <h5 className="title-5 uppercase opacity-50 flex items-center">
          <FiTerminal className="mr-1" />
          <span className="text-sm">Registrazione movimentazione pallet</span>
        </h5>

        <div className="flex items-center gap-2">
          <Button
            className="btn-primary-outline  ml-auto"
            icon={<BiReset />}
            text="Reset"
            onClick={() => dispatch(resetPalletCreator())}
          />
          
          { !readOnlyData?.id && save
            ? <Button
                className="btn-primary ml-auto"
                icon={save.icon}
                text={save.text}
                loading={isLoading}
                onClick={save.onClick}
              />
            : null
          }
        </div>
      </footer>

    </div>
  )
}