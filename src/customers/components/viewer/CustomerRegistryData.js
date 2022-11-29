import React from 'react'
import Avatar from '../../../globals/components/layout/Avatar';
import SafeCol from '../../../globals/components/layout/SafeCol';
import { CUSTOMER_TYPE_DESCRIPTION } from '../../../globals/libs/constants';
import CustomerRegistrySummary from '../form/CustomerRegistrySummary';
import CustomerViewerLogs from './CustomerViewerLogs';

function CustomerRegistryData({ customer }) {
  const { name, logo, relationships, pec, uniqueCode, trades } = customer;

  return (
    <SafeCol id="CustomerRegistryData">
      <div className='mr-3'>
        <div className='my-6 flex'>
          <Avatar
            name={name}
            size={100}
            stepColor={100}
            src={logo}
          />
        </div>

        <section>
          <h2 className='title-3 mb-2'>Dati anagrafici azienda</h2>
          <CustomerRegistrySummary customer={customer} />

          { pec && <p className='my-4 p-2 bg-base-100 rounded-md'>
            <span className='block font-bold'>PEC</span>
            <span>{pec}</span>
          </p> }

          { uniqueCode && <p className='my-4 p-2 bg-base-100 rounded-md'>
            <span className='block font-bold'>Codice univoco</span>
            <span>{uniqueCode}</span>
          </p> }
        </section>

        <section className='mt-8'>
          <h2 className='title-3 mt-4'>Settore di operatività</h2>
          { trades?.length > 0 && (
            <ul>
              { trades.map(trade => (
                <li className='inline-block chip-neutral mb-2' key={trade}>{trade}</li>
              ))}
            </ul>
          )}
          
          { relationships?.length > 0 && (
            <>
              <h2 className='title-3 mt-8 block'>Rapporto con il cliente</h2>
              <ul className='mt-2 bg-base-100 rounded-md p-4'>
                { relationships.map(rel => (
                  <li key={rel}>{CUSTOMER_TYPE_DESCRIPTION[rel]}</li>
                )) }
              </ul>
            </>
          )}
        </section>

        <section className='mt-8 mb-4'>
          <h2 className='title-3 mt-8 mb-2 block'>Attività recenti sul cliente</h2>
          <CustomerViewerLogs logs={customer.log || []} />
        </section>
      </div>
    </SafeCol>
  )
}

export default CustomerRegistryData
