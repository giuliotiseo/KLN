import { useState } from 'react'
import Button from '../../../globals/components/buttons_v2/Button'
import SimpleMap from '../../../globals/components/layout/SimpleMap'
import Spinner from '../../../globals/components/layout/Spinner'
import CardDetails from '../../../globals/components/dataDisplay/CardDetails'
import LinkButton from '../../../globals/components/buttons_v2/LinkButton'
import OrderRangeDatePicker from './OrderRangeDatePicker'
import { TbMapPin, TbMapPinOff } from "react-icons/tb"
import { FiCheckSquare, FiPlus, FiRefreshCcw, FiSquare, FiXCircle } from 'react-icons/fi'
import { useSelector } from 'react-redux'
import { selectCurrentCompany } from '../../../company/slices/companySlice'

const OrderDepotWarehouseItem = ({
  warehouse,
  onClick,
  isChecked,
  editable
}) => (
  <li className='bg-base-100 rounded-md p-2 dark:border-dark-50 last:border-none'>
    { editable 
      ? <div>
          <Button
            icon={isChecked ? <FiCheckSquare className='mt-1 mr-2 opacity-100 text-primary-200 dark:text-primary-300' /> : <FiSquare className='mt-1 mr-2' />}
            text={<div className='flex flex-start text-left'>{warehouse.name}</div>}
            className={`uppercase text-lg flex items-start pl-0 pb-0 ${ isChecked ? 'opacity-100' : 'opacity-70 hover:opacity-100 transition-opacity duration-200'}`}
            onClick={() => onClick(warehouse)}
          />
          <p className='ml-8 mb-2 text-sm text-gray-400 dark:text-gray-500'>{ warehouse.location.address }</p>
        </div>
        : <div className='py-2'>
          <p>{warehouse.name}</p>
          <p className='text-sm text-gray-400 dark:text-gray-500'>
            { warehouse.location.address }
          </p>
        </div>
      }
  </li>
)

const OrderDepotWarehousesList = ({
  warehouses,
  selectedWarehouse,
  callback,
  editable
}) => {
  return (
    warehouses?.length <= 0
    ? <p className='text-gray-400 dark:text-gray-500 m-2'>Nessun magazzino presente</p>
    : <div>
        <ul>
          { warehouses.map((warehouse) => (
            <OrderDepotWarehouseItem
              key={warehouse?.id || warehouse.extId}
              warehouse={warehouse}
              onClick={callback}
              editable={editable}
              isChecked={selectedWarehouse?.extId === warehouse.extId}
            />
          ))}
        </ul>
      </div>
  )
}

const DepotWarehouseSummary = ({
  callback,
  selectedWarehouse,
  title = "Punto di interesse selezionato"
}) => {
  const [ mapVisibility, setMapVisibility ] = useState(false);
  return (
    <CardDetails
      header={<h4 className="title-3">{title}</h4>}
      className="h-full"
      footer={null}
      clear={false}
    >
      <div className="h-full items-center top-0 bg-base-100 flex gap-1 py-2 border-b border-light-100 dark:border-dark-100 rounded-md mb-1">
        <Button
          icon={<FiXCircle className='text-xl' />}
          className="btn-ghost items-center mr-1"
          onClick={() => callback(null)}
        />
        <p className='text-xl uppercase'>{ selectedWarehouse.name }</p>
      </div>

      <p className='text-base pt-2'>{ selectedWarehouse.location.address }</p>
      { selectedWarehouse?.thirdCompanyId && <p className='text-base pt-2'>
        Gestito da terzi: <span className="font-bold text-secondary-200 dark:text-secondary-300">{ selectedWarehouse.thirdCompanyName }</span>
        </p> 
      }

      <Button
        icon={mapVisibility ? <TbMapPinOff /> : <TbMapPin />}
        text={mapVisibility ? 'Nascondi mappa' : 'Vedi sulla mappa'}
        onClick={() => setMapVisibility(prev => !prev)}
        className="btn-ghost px-0"
      />

      { mapVisibility && <div className='h-[250px] mt-4 rounded-md overflow-hidden'>
        <SimpleMap
          lat={selectedWarehouse?.location?.coordinate?.lat || selectedWarehouse?.location?.coordinate?.[0]}
          lng={selectedWarehouse?.location?.coordinate?.lng || selectedWarehouse?.location?.coordinate?.[1]}
          onClick={value => console.log("Value", value)}
        />
      </div> }
    </CardDetails>
  )
}

const OrderDepotForCarrierCompiler = ({
  order,
  company,
  warehouses,
  loading,
  refetch,
  selectedWarehouse,
  updateDepotCheckpoint,
  updateForm,
  editable,
  className = "",
  title
}) => {
  const { id } = useSelector(selectCurrentCompany);

  if(selectedWarehouse?.extId) {
    return (
      <>
        <h2 className="title-5 mb-4 uppercase text-gray-500 dark:text-gray-600">
          2. Informazioni vettore
        </h2>      
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
          <div className='col-span-1 h-full'>
            <DepotWarehouseSummary
              callback={updateDepotCheckpoint}      
              selectedWarehouse={selectedWarehouse}
              title="Scarico vettore"  
            />
          </div>
          <div className='col-span-1 h-full'>
            <section className="bg-base-100 rounded-md">
              <OrderRangeDatePicker
                checkpoint={selectedWarehouse}
                dateStartValue={order?.depotDateStart}
                dateStartName={"depotDateStart"}
                dateEndValue={order?.depotDateEnd}
                dateEndName={"depotDateEnd"}
                updateForm={updateForm}
                windowTypeToCheck="SCARICO"
                windowsToShow={["SCARICO"]}
                title='Data e orario scarico vettore'
              />
            </section>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className={`w-full ${className}`}>
      <h2 className="title-5 mb-4 uppercase text-gray-500 dark:text-gray-600">
        2. Informazioni vettore
      </h2>
      
      <div className='w-full bg-base-100 mt-2 mr-4 mb-4 rounded-md'>
        <CardDetails
          header={<h3 className="title-3 mb-2">{title}</h3>}
          className="h-full"
          footer={<div>
            <LinkButton
              text="Aggiungi punto di interesse"
              icon={<FiPlus />}
              className="btn-ghost"
              to={id === company.id
                ? `/warehouses/new`
                : `/customers/edit?id=${company.id}`
              }
            />
          </div>}
          clear={false}
        >
          <div className="sticky top-0 bg-base-100 flex flex-wrap gap-2 justify-between border-b border-light-100 dark:border-dark-100 rounded-md mb-1 z-10">
            <Button
              icon={<FiRefreshCcw />}
              text="Aggiorna elenco"
              onClick={refetch}
              className="btn-ghost"
            />
          </div>
          { loading 
            ? <Spinner className = "h-5 w-5 text-primary-200 dark:text-primary-300" />
            : <OrderDepotWarehousesList
                warehouses={warehouses}
                selectedWarehouse={selectedWarehouse}
                callback={updateDepotCheckpoint}
                editable={editable}
              />
          }
        </CardDetails>
      </div>
    </div>
  )
}

export default OrderDepotForCarrierCompiler;
