import ListItem from '../../../globals/components/layout/ListItem'
import OrderListItemContent from './OrderListItemContent';
import OrderListItemDropdown from './OrderListItemDropdown';
import OrderListItemHeader from './OrderListItemHeader';
import OrderListItemSide from './OrderListItemSide';
import { globalStatusColorsBorder } from "../../../globals/libs/helpers";

const OrdersListItem = ({
  order,
  companyType,
  isSelected = false
}) => {
  return (
    <ListItem className={`
      justify-between p-4 border-l-4 w-full items-start
      ${ isSelected ? 'opacity-50 pointer-events-none shadow-none bg-transparent'  : ''}
      ${globalStatusColorsBorder[order.status]}
    `}>
      <div className="flex w-full">
        <OrderListItemSide order={order} />

        <div className="flex-1 ml-2 w-full">
          <OrderListItemHeader order={order} />
          <OrderListItemContent order={order} companyType={companyType} />
        </div>
      </div>
      
      <div className="mt-2">
        <OrderListItemDropdown id={order.id} />
      </div>
    </ListItem>
  )
}

export default OrdersListItem;
