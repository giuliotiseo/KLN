import React from 'react'
import { FiPlusCircle, FiTrash2 } from 'react-icons/fi'
import Button from '../../globals/components/buttons_v2/Button'
import Scrollbar from '../../globals/components/layout/Scrollbar'

const WarehouseNavigation = ({
  warehouses,
  addWarehouse,
  changeSelected,
  removeWarehouse,
  selectedWarehouse
}) => {
  return (
    <div className='sticky top-0 my-3 pt-2 bg-base-100 z-10 flex items-center text-lg border-b border-light-300 dark:border-dark-100'>
      <Button
        icon={<FiPlusCircle className='text-2xl' />}
        className="btn-ghost pb-6"
        onClick={addWarehouse}
      />

      <p className='mx-4 whitespace-nowrap pb-4'>Depositi:</p>
      <nav className='w-full'>
        <Scrollbar>
          <ul className="flex gap-4 pb-4">
            { warehouses.map((wh, index) => (
              <li key={index} className="relative inline-flex mx-3 md:mx-6">
                <Button
                  text={`DEP ${index + 1}`}
                  className={`${ index === selectedWarehouse ? "btn-ghost font-bold" : "hover:text-primary-200 dark:hover:text-primary-300"}`}
                  onClick={() => changeSelected(index)}
                />

                { index >= 1 && index === selectedWarehouse && (
                  <Button
                    icon={<FiTrash2 className='text-base hover:text-danger-200 dark:hover:text-danger-300' />}
                    className='text-danger inline-block ml-2 p-0 text-sm bottom-0'
                    onClick={() => removeWarehouse(index)}
                  />
                )}
              </li>
            ))}
          </ul>
        </Scrollbar>
      </nav>
    </div>
  )
}

export default WarehouseNavigation
