import React from 'react'
import { useDispatch } from 'react-redux'
import SafeCol from '../../../globals/components/layout/SafeCol';
import CheckOrderRefCompiler from '../create/CheckOrderRefCompiler'
import LinkedChecks from '../create/LinkedChecks'
import { changeCheckCreatorCheckOrder, changeCheckCreatorDocsRef, changeCheckCreatorKeyDocNum, resetCheckCreatorOrder } from '../../slices/checkCreatorSlice';

function CheckOrderCompiler({
  order,
  docs,
  queryFrom,
}) {
  console.log({ order, docs });

  const dispatch = useDispatch();
  return (
    <SafeCol id="CheckOrderCompiler">
      <CheckOrderRefCompiler
        order={order}
        docs={docs}
        queryFrom={queryFrom}
        callback={(order) => dispatch(changeCheckCreatorCheckOrder(order))}
        docNumCallback={(value) =>  dispatch(changeCheckCreatorKeyDocNum(value))}
        docsRefCallback={(payload) => dispatch(changeCheckCreatorDocsRef(payload))}  
        clear={() => dispatch(resetCheckCreatorOrder())}
        canChange={true}
      />

      { order?.id && (
        <LinkedChecks
          orderId={order.id}
          stamp={order.stamp}
          queryFrom={queryFrom}
        />
      )}
    </SafeCol>
  )
}

export default CheckOrderCompiler
