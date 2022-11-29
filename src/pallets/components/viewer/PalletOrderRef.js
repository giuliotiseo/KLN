import React from 'react'

function PalletOrderRef({
  order
}) {
  return (
    <div>
      Qui facciamo una bella query: { order.stamp }
    </div>
  )
}

export default PalletOrderRef
