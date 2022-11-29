import React from 'react'
import CardDetails from '../../../globals/components/dataDisplay/CardDetails'
import { RiMoneyEuroCircleLine } from 'react-icons/ri'
import { BILLING_TYPES_DESCRIPTION, BILLING_TYPES_LONG_DESCRIPTION } from '../../../globals/libs/helpers'

const OrderBillingTypeDetailsHeader = () => {
  return (
    <div className="flex items-center">
      <RiMoneyEuroCircleLine className="mr-1 text-2xl" />
      <h3 className="title-3">Info fatturazione</h3>
    </div>
  )
}

const OrderBillingTypeDetails = ({
  customer,
  billingType
}) => {
  return (
    <CardDetails
      header={<OrderBillingTypeDetailsHeader />}
    >
      <h3>Da fatturare a:</h3>
      { !customer || (!customer?.name && !customer?.vatNumber && !customer?.pec && !customer?.uniqueCode) && <p className='text-gray-400 dark:text-gray-500'>Azienda per la fatturazione non dichiarata</p>}
      <ul className="w-full">
        { customer?.name && (
        <li className="flex justify-between w-full py-2 border-b border-light-50 dark:border-dark-200">
          <span>Ragione sociale</span>
          <span>{customer.name}</span>
        </li> )}

        { customer?.vatNumber && (
        <li className="flex justify-between w-full py-2 border-b border-light-50 dark:border-dark-200">
          <span>Partita IVA</span>
          <span>{customer.vatNumber}</span>
        </li> )}
        
        { customer?.pec && (
        <li className="flex justify-between w-full py-2 border-b border-light-50 dark:border-dark-200">
          <span>PEC</span>
          <span>{customer.pec}</span>
        </li> )}
        
        { customer?.uniqueCode && (
        <li className="flex justify-between w-full py-2">
          <span>Codice univoco</span>
          <span>{customer.uniqueCode}</span>
        </li> )}
      </ul>
      
      <div className='mt-4'>
        <h4 className='title-4'>Metodo di fatturazione applicato</h4>
        <p className='text-base'>{BILLING_TYPES_DESCRIPTION[billingType]}</p>
        <p className='text-sm alert-info px-2 mt-2'>{BILLING_TYPES_LONG_DESCRIPTION[billingType]}</p>
      </div>

    </CardDetails>
  )
}

export default OrderBillingTypeDetails
