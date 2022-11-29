import { OrderListItemPath } from './OrderListItemPath';

const OrderListItemContent = ({
  order,
  companyType,
  showTitle = false
}) => {
  if(!companyType) return null;
  return (
    <div className="w-full text-sm">
      <div className="mb-2">
        <OrderListItemPath
          order={order}
          enableDelete={false}
          showTitle={showTitle}
        />
      </div>
    </div>
  )
}

export default OrderListItemContent
