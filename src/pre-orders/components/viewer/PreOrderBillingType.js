import React from 'react'
import CardDetails from '../../../globals/components/dataDisplay/CardDetails'
import { BILLING_TYPES_DESCRIPTION, BILLING_TYPES_LONG_DESCRIPTION } from '../../../globals/libs/helpers'

const PreOrderBillingType = ({
  preOrder
}) => {
  return (
    <CardDetails
      header={<h4 className="title-3">Metodo di fatturazione richiesto</h4>}
      footer={null}
      clear={false}
    >
      <p className='text-lg md:text-xl'>{BILLING_TYPES_DESCRIPTION[preOrder.billingType]}</p>
      <p className='text-base alert-info px-2 mt-4'>{BILLING_TYPES_LONG_DESCRIPTION[preOrder.billingType]}</p>
    </CardDetails>
  )
}

export default PreOrderBillingType
