import React from 'react'
import SafeCol from '../../../globals/components/layout/SafeCol'
import { formatDistanceDate } from '../../../globals/libs/helpers'
import PreOrderAttachments from './PreOrderAttachments'
import PreOrderBillingType from './PreOrderBillingType'
import PreOrderCheckpointDetails from './PreOrderCheckpointDetails'
import PreOrderCompanyDetails from './PreOrderCompanyDetails'
import PreOrderDatesDetails from './PreOrderDatesDetails'
import PreOrderViewerHeading from './PreOrderViewerHeading'
import PreOrderViewerLogs from './PreOrderViewerLogs'

const PreOrderViewerContent = ({
  preOrder,
  currentRole
}) => {
  return (
    <SafeCol id="PreOrderViewerContent">
      <div className='mt-2 mb-4 mx-4'>
        <PreOrderViewerHeading preOrder={preOrder} />

        <section className="bg-base-100 p-4 rounded-md mt-2">
          <PreOrderCompanyDetails preOrder={preOrder} currentRole={currentRole} />
        </section>

        <section className='mt-2'>
          <PreOrderDatesDetails preOrder={preOrder} />
        </section>

        <section className="bg-base-100 p-4 rounded-md mt-2">
          <h3 className="title-3 mb-2">Info punto di interesse</h3>
          <PreOrderCheckpointDetails preOrder={preOrder} />
        </section>

        <section className='mt-2'>
          <PreOrderBillingType preOrder={preOrder} />
        </section>

        <section className='mt-2'>
          <PreOrderAttachments
            data={preOrder?.files || []}
          />
        </section>

        <section className="mt-2">
          <PreOrderViewerLogs logs={preOrder.log || []} />
        </section>

        <section className='mt-2'>
          <p className='text-sm italic text-gray-400 dark:text-gray-500'>
            Ultima modifica: { formatDistanceDate(new Date(preOrder.updatedAt), new Date())}
          </p>
        </section>
      </div>
    </SafeCol>
  )
}

export default PreOrderViewerContent
