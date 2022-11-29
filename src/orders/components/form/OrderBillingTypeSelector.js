import React from 'react'
import CardDetails from '../../../globals/components/dataDisplay/CardDetails';
import Select from '../../../globals/components/dataEntry_v2/Select'
import { BILLING_METHODS, BILLING_TYPES_DESCRIPTION, BILLING_TYPES_LONG_DESCRIPTION } from '../../../globals/libs/helpers';

function OrderBillingTypeSelector({
  order,
  updateForm
}) {
  const { billingType, shipmentType } = order;
  return (
    <CardDetails
      className="mt-2"
      header={<h3 className="title-3">Metodo di fatturazione ordine</h3>}
    >
      <Select
        id="billingType"
        label="Scegli il metodo di fatturazione applicato al trasporto"
        labelClassName='whitespace-normal'
        value={billingType}
        selectClassName="block w-full mt-4"
        callback={updateForm}
      >
        { Object.keys(BILLING_METHODS[shipmentType]).map(b_type => (
          <option key={b_type} value={b_type}>
            { BILLING_TYPES_DESCRIPTION[b_type] }
          </option>
        )) }
      </Select>

      <p className='mt-2 alert-info px-2'>
        {BILLING_TYPES_LONG_DESCRIPTION[billingType]}
      </p>
    </CardDetails>
  )
}

export default OrderBillingTypeSelector;
