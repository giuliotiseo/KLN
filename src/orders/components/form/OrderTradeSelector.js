import React from 'react'
import TradeSelector from '../../../pre-orders/components/form/TradeSelector';

const OrderTradeSelector = ({
  order,
  updateTrades,
}) => {
  const { selectedPreOrder, trades } = order;
  return (
    <div>
      <h4 className="title-5 mb-4 uppercase text-gray-500 dark:text-gray-600 border-b">Settore trasporto</h4>
      <TradeSelector
        label="Seleziona una o più opzioni"
        selectedTrades={trades}
        setSelectedTrades={updateTrades}
        availableTrades={selectedPreOrder?.trades?.length > 0 ? selectedPreOrder.trades : []}
      />
    </div>
  )
}

export default OrderTradeSelector
