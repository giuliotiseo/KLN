import { useDispatch } from "react-redux";
import SafeArea from "../../globals/components/layout/SafeArea";
import SafeCol from "../../globals/components/layout/SafeCol";
import SectionTop from "../../globals/components/layout/SectionTop";
import SectionWrap from "../../globals/components/layout/SectionWrap";
import PalletVehicleForm from "../components/form/PalletVehicleForm";
import PalletCarrierOperatorForm from "../components/form/PalletCarrierOperatorForm";
import PalletSideInfoForCarrier from "../components/viewer/PalletSideInfoForCarrier";
import PalletSideInfoForCustomer from "../components/viewer/PalletSideInfoForCustomer";
import PalletEditorForm from "../components/editor/PalletEditorForm";
import { changePalletEditorCarrierOperator, changePalletEditorLicensePlate, changePalletEditorVehicleName, resetPalletEditor } from "../slices/palletEditorSlice";
import { FiTerminal } from "react-icons/fi";
import Button from "../../globals/components/buttons_v2/Button";
import { BiReset } from "react-icons/bi";

export default function PalletEditorLayout({
  companyId,
  queryFrom,
  companyType,
  palletHandling,
  changeEditorData,
  save,
  searchFromUrl,
  drawerState,
}) {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col h-full w-full">      
      <div className="flex flex-col md:flex-row h-full">
        {/* Sidebar */}
        <aside className="relative mr-2 rounded-lg flex-1">
          <SafeCol id="pallet-editor-sidebar">
            <div className="mr-4">
              <PalletVehicleForm
                licensePlate={palletHandling?.vehicleOperator?.licensePlate || palletHandling?.travel?.licensePlate || null}
                vehicleName={palletHandling?.vehicleOperator?.name || palletHandling?.travel?.vehicleName || null}
                changePalletLicensePlate={(payload) => dispatch(changePalletEditorLicensePlate(payload))}
                changePalletVehicleName={(payload) => dispatch(changePalletEditorVehicleName(payload))}
              />

              <PalletCarrierOperatorForm
                carrierOperator={palletHandling?.carrierOperator || null}
                changePalletOperator={(value) => dispatch(changePalletEditorCarrierOperator(value))}
              />

              { queryFrom === "carrier" && companyType === "TRANSPORT"
                ? <PalletSideInfoForCarrier
                    queryFrom={queryFrom}
                    palletHandling={palletHandling}
                  />
                : <PalletSideInfoForCustomer
                    palletHandling={palletHandling}
                  />
              }
            </div>
          </SafeCol>
        </aside>

        {/* Content */}
        <section className="relative flex-2">
          <SafeCol id="pallet-editor-form">
            <div className="pr-4">
              <PalletEditorForm
                queryFrom={queryFrom}
                companyId={companyId}
                palletHandling={palletHandling}
                changeEditorData={changeEditorData}
                drawerState={drawerState}
              />
            </div>
          </SafeCol>
        </section>

      </div>

      <footer className="footer">
        <h5 className="title-5 uppercase opacity-50 flex items-center">
          <FiTerminal className="mr-1" />
          <span className="text-sm">Modifica movimentazione pallet</span>
        </h5>

        <div className="flex items-center gap-2">
          <Button
            className="btn-primary-outline  ml-auto"
            icon={<BiReset />}
            text="Reset"
            onClick={() => dispatch(resetPalletEditor())}
          />
          
          { save
            ? <Button
                className="btn-primary ml-auto"
                icon={save.icon}
                text={save.text}
                loading={save.loading}
                onClick={save.onClick}
              />
            : null
          }
        </div>
      </footer>
    </div>
  )
}