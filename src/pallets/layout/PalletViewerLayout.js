import SafeCol from "../../globals/components/layout/SafeCol";
import PalletBasicInfoViewer from "../components/viewer/PalletBasicInfoViewer";
import PalletSideInfoForCarrier from "../components/viewer/PalletSideInfoForCarrier";
import PalletSideInfoForCustomer from "../components/viewer/PalletSideInfoForCustomer";
import PalletCarrierOperator from "../components/viewer/PalletCarrierOperator";
import PalletVehicleInfo from "../components/viewer/PalletVehicleInfo";
import PalletHandlingCounter from "../components/form/PalletHandlingCounter";
import PalletViewerLogs from "../components/viewer/PalletViewerLogs";
import LinkButton from "../../globals/components/buttons_v2/LinkButton";
import PalletOrderRef from "../components/viewer/PalletOrderRef";
import { MediumTitle } from "../../globals/components/typography/titles";
import { FiCheck, FiTerminal } from "react-icons/fi";

// Main component ------------------------------------------------------------------------------------------------------------------------------------------------------------------
export default function PalletViewerLayout({
  palletHandling,
  queryFrom,
  companyType
}) {
  console.log('palletHandling', palletHandling.type)
  return (
    <div className="flex flex-col h-full w-full">      
      <div className="flex flex-col md:flex-row h-full">
        {/* Sidebar */}
        <aside className="relative mr-2 rounded-lg flex-1">
          <SafeCol id="pallet-viewer-sidebar">
            <div className="mr-4">
              <div className="mt-4">
                <p className="text-lg uppercase text-gray-400 dark:text-gray-500">movimentazione pallet</p>
                <h2 className="title-3 xl:title-2">
                  COD. {palletHandling.stamp.split('-')[1]}
                </h2>
              </div>

              { queryFrom === "carrier" && companyType === "TRANSPORT"
                ? <PalletVehicleInfo
                    vehicle={{
                      licensePlate: palletHandling?.travel?.licensePlate || null,
                      vehicleName: palletHandling?.travel?.vehicleName || null,
                    }}
                  />
                : <PalletVehicleInfo
                    vehicle={{
                      licensePlate: palletHandling?.vehicleOperator?.licensePlate || null,
                      vehicleName: palletHandling?.vehicleOperator?.name || null,
                    }}
                  />
              }

              <PalletCarrierOperator
                carrierOperator={palletHandling?.carrierOperator || null}
              />

              { palletHandling?.orders?.length > 0
                ? palletHandling.orders.map(order => (
                  <PalletOrderRef order={order} />
                ))
                : null
              }

              { queryFrom === "carrier" && companyType === "TRANSPORT"
                ? <PalletSideInfoForCarrier
                    queryFrom={queryFrom}
                    palletHandling={palletHandling || null}
                  />
                : <PalletSideInfoForCustomer
                    palletHandling={palletHandling}
                  />
              }
            </div>
          </SafeCol>
        </aside>

        {/* Content */}
        <section className="relative flex-2 bg-base-200">
          <SafeCol id="pallet-viewer-content">
            <div className="pr-4 pl-2">
              { palletHandling.reversalId !== "NO_REVERSAL"
                ? <MediumTitle styles="text-center mt-4 mb-0">RAPPORTO {palletHandling.reversalName}</MediumTitle>
                : <MediumTitle styles="text-center mt-4 mb-0">RAPPORTO {palletHandling.customerName}</MediumTitle>
              }

              <PalletBasicInfoViewer
                palletHandling={{
                  ...palletHandling,
                  voucherImage: palletHandling?.voucherImage?.db_format || null,
                  files: palletHandling?.files?.map(file => file.db_format)
                }}
                className="pt-2"
                queryFrom={queryFrom}
              />

              <PalletViewerLogs
                logs={palletHandling.log}
              />
            </div>
          </SafeCol>
        </section>

        {/* Floating elements */}
        <PalletHandlingCounter
          show={true}
          loads={{ COMPLIANT: { value: palletHandling.loadQuantity }}}
          unloads={{ COMPLIANT: { value: palletHandling.unloadQuantity }}}
          reversal={[{ value: palletHandling?.reversalQuantity }]}
          palletHandlingType={palletHandling.type}
          className="fixed bg-base-100 right-8 bottom-20 px-4 py-2 rounded-full shadow-md border border-light-100 dark:border-dark-100"
        />
      </div>

      <footer className="footer">
        <h5 className="title-5 uppercase opacity-50 flex items-center">
          <FiTerminal className="mr-1" />
          <span className="text-sm">Dettaglio movimentazione</span>
        </h5>

        <div className="flex items-center gap-2">
          <LinkButton
            className="btn-primary ml-auto"
            icon={<FiCheck />}
            text="Modifica"
            to={`/pallets/edit?from=${queryFrom}&id=${palletHandling.id}`}
          />
        </div>
      </footer>
      
    </div>
  )
}