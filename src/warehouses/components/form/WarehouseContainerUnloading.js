import Button from '../../../globals/components/buttons_v2/Button'
import { FiCheckSquare, FiSquare } from 'react-icons/fi'

const WarehouseContainerUnloading = ({
  containerUnloading,
  changeContainerUnloading
}) => {
  return (
    <div>
      <Button
        icon={containerUnloading ? <FiCheckSquare className='mr-2 opacity-100 text-primary-200 dark:text-primary-300' /> : <FiSquare className='mr-2' />}
        text={<div className='flex items-center text-left'>Disponibilità scarico container</div>}
        className={`
          text-lg flex items-center pl-0 py-0 my-4
          ${ containerUnloading ? 'opacity-100' : 'opacity-70 hover:opacity-100 transition-opacity duration-200'}
        `}
        onClick={changeContainerUnloading}
      />
    </div>
  )
}

export default WarehouseContainerUnloading
