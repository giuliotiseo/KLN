
// Components
import SafeCol from '../../../globals/components/layout/SafeCol'
import PreOrderCargoType from './PreOrderCargoType';
import PreOrderSubjectCompiler from './PreOrderSubjectCompiler';
import PreOrderDeliveryAreasCompiler from './PreOrderDeliveryAreasCompiler';
import PreOrderSlotInput from './PreOrderSlotInput';
import TextEditor from '../../../globals/components/dataEntry_v2/TextEditor';
import LiveFiles from '../../../globals/components/dataDisplay/LiveFiles';
import Select from '../../../globals/components/dataEntry_v2/Select';
// Actions
import { BILLING_METHODS, BILLING_TYPES_DESCRIPTION, BILLING_TYPES_LONG_DESCRIPTION } from '../../../globals/libs/helpers';

function PreOrderDetailsCompiler({
  preOrder,
  updateForm,
  updateTrades,
  addFile,
  removeFile,
  restoreFile
}) {
  return (
    <SafeCol id="PreOrderDetailsCompiler">
      <div className='my-2 mx-4'>
        <h2 className="title-5 mb-4 mt-4 uppercase text-gray-500 dark:text-gray-600">
          Informazioni di carico
        </h2>

        <section className="mb-4 p-4 bg-base-100 rounded-md">
          <PreOrderCargoType
            trades={preOrder.trades}
            perishable={preOrder.perishable}
            updateForm={updateForm}
            updateTrades={updateTrades}
          />
        </section>

        <section className="mb-4 p-4 bg-base-100 rounded-md">
          <PreOrderSubjectCompiler
            vehicleType={preOrder.vehicleType}
            shipmentType={preOrder.shipmentType}
            updateForm={updateForm}
          />
        </section>

        { preOrder?.shipmentType === "DIRETTO" && (
          <section className="mb-4 p-4 bg-base-100 rounded-md">
            <PreOrderDeliveryAreasCompiler
              deliveryAreas={preOrder?.deliveryAreas}
              deliveryRegions={preOrder?.deliveryRegions}
              updateForm={updateForm}
            />
          </section>
        )}

        <section className="mb-4 p-4 bg-base-100 rounded-md flex gap-4 flex-col lg:flex-row">
          <PreOrderSlotInput
            slot={preOrder.slot}
            vehicleType={preOrder?.vehicleType}
            updateForm={updateForm}
          />

          <div className='flex-1 w-full'>
            <h3 className="title-4">Metodo di fatturazione</h3>
            <Select
              id="billingType"
              label="Scegli il metodo di fatturazione applicato al trasporto"
              labelClassName='whitespace-normal'
              value={preOrder.billingType}
              selectClassName="block w-full mt-4"
              callback={updateForm}
            >
              { Object.keys(BILLING_METHODS[preOrder.shipmentType]).map(b_type => (
                <option key={b_type} value={b_type}>
                  { BILLING_TYPES_DESCRIPTION[b_type] }
                </option>
              )) }
            </Select>

            <p className='mt-2 alert-info px-2'>
              {BILLING_TYPES_LONG_DESCRIPTION[preOrder.billingType]}
            </p>
          </div>
        </section>

        <section className="mb-4 p-4 bg-base-100 rounded-md flex gap-4 flex-col lg:flex-row">
          <div className='w-full flex-1'>
            <h3 className='title-4'>Note</h3>
            <TextEditor
              content={preOrder.note}
              onSaveTextEditor={(content) => updateForm({ name: "note", value: content })} 
              label="Aggiungi annotazioni per il vettore"
              actionButtonPosition="INTERNAL"
              showList={true}
            />
          </div>
        </section>

        <section className="mb-4 p-4 bg-base-100 rounded-md">
          <h3 className='title-4 mb-2'>Gestisci allegati</h3>
          <LiveFiles
            files={preOrder.files}
            dropCallback={addFile}
            removeCallback={removeFile}
            restoreFile={restoreFile}
            showEmptyBox={true}
            dropZoneHeight={200}
            loadedText={""}
          />
        </section>
      </div>
    </SafeCol>
  )
}

export default PreOrderDetailsCompiler
