import { useState } from 'react'
import Button from '../../../globals/components/buttons_v2/Button'
import SimpleMap from '../../../globals/components/layout/SimpleMap'
import Spinner from '../../../globals/components/layout/Spinner'
import { TbMapPin, TbMapPinOff } from "react-icons/tb"
import { FiCheckSquare, FiPlus, FiRefreshCcw, FiSquare, FiXCircle } from 'react-icons/fi'
import LinkButton from '../../../globals/components/buttons_v2/LinkButton'
import { useSelector } from 'react-redux'
import { selectCurrentCompany } from '../../../company/slices/companySlice'

const PreOrderCheckpointPickerItem = ({
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
            className="uppercase text-lg flex items-start pl-0 pb-0 opacity-70 hover:opacity-100 transition-opacity duration-200"
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

const PreOrderCheckpointPickerList = ({
  company,
  warehouses,
  selectedWarehouse,
  callback,
  editable
}) => {
  const { id } = useSelector(selectCurrentCompany);

  return (
    warehouses?.length <= 0
    ? <p className='text-gray-400 dark:text-gray-500 m-2'>Nessun magazzino presente</p>
    : <div>
        <ul>
          { warehouses.map((warehouse) => (
            <PreOrderCheckpointPickerItem
              key={warehouse?.id || warehouse.extId}
              warehouse={warehouse}
              onClick={callback}
              editable={editable}
              isChecked={selectedWarehouse?.extId === warehouse.extId}
            />
          ))}
        </ul>

        <LinkButton
          text="Aggiungi punto di interesse"
          icon={<FiPlus />}
          className="btn-ghost mt-4"
          to={id === company.id
            ? `/warehouses/new`
            : `/customers/edit?id=${company.id}`
          }
        />
      </div>
  )
}

const PreOrderCheckpointPickerSummary = ({
  callback,
  selectedWarehouse
}) => {
  const [ mapVisibility, setMapVisibility ] = useState(false);
  return (
    <div className='w-full'>
      <header className='flex'>
        <h3 className="title-3 mb-1 w-full">Punto di interesse selezionato</h3>
      </header>

      <div className="items-center top-0 bg-base-100 flex gap-1 py-2 border-b border-light-100 dark:border-dark-100 rounded-md mb-1">
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
    </div>
  )
}

const PreOrderCheckpointPicker = ({
  company,
  warehouses,
  loading,
  refetch,
  selectedWarehouse,
  callback,
  editable,
  className = "",
  title
}) => {
  if(selectedWarehouse?.extId) {
    return (
      <PreOrderCheckpointPickerSummary
        callback={callback}      
        selectedWarehouse={selectedWarehouse}      
      />
    )
  }

  return (
    <div className={`w-full ${className}`}>
      <h3 className="title-3 mb-2">{title}</h3>
      <div className="sticky top-0 bg-base-100 flex flex-wrap gap-2 justify-between p-2 border-b border-light-100 dark:border-dark-100 rounded-md mb-1">
        <Button
          icon={<FiRefreshCcw />}
          text="Aggiorna elenco"
          onClick={refetch}
          className="btn-ghost"
        />
      </div>

      { loading 
        ? <Spinner className = "h-5 w-5 text-primary-200 dark:text-primary-300" />
        : <PreOrderCheckpointPickerList
            company={company}
            warehouses={warehouses}
            selectedWarehouse={selectedWarehouse}
            callback={callback}
            editable={editable}
          />
      }
    </div>
  )
}

export default PreOrderCheckpointPicker;
