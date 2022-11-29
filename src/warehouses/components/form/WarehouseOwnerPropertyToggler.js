import { useSelector } from 'react-redux'
import { selectWarehouseCreatorIsLinked } from '../../slices/warehouseCreatorSlice'

const WarehouseOwnerPropertyTogglerStatus = ({
  isLinked,
}) => {
  return (
    isLinked === 1
      ? <span className="hidden lg:block lg:ml-2">Passa a proprietario</span>
      : <span className="hidden lg:block lg:ml-2">Passa a terze parti</span>
  )
}

const WarehouseOwnerPropertyToggler = ({
  callback = () => console.log("Default callback <WarehouseOwnerPropertyToggler />")
}) => {
  const isLinked = useSelector(selectWarehouseCreatorIsLinked);
  if(isLinked === "NONE") return null;

  return (
    <div className='flex items-center mr-4'>
      <button
        className="flex items-center border rounded-lg text-left min-w-[30px] w-8 h-4 mr-1 bg-light-100 border-light-50 dark:bg-dark-200 dark:border-dark-100"
        onClick={() => isLinked === 0 ? callback(1) : callback(0)}
      >
         <div className={`
          relative w-4 h-4 rounded-full transition-all left-1 right-1
          ${ isLinked === 1
            ? '-translate-x-[4px] bg-secondary-200 dark:bg-secondary-300'
            : 'translate-x-[14px] bg-primary-200 dark:bg-primary-300'
          }
         `} />

      </button>
      
      <WarehouseOwnerPropertyTogglerStatus isLinked={isLinked} />
    </div>
  )
}

export default WarehouseOwnerPropertyToggler
