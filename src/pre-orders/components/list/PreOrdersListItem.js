import ListItem from '../../../globals/components/layout/ListItem'
import PreOrdersListItemDropdown from "./PreOrdersListItemDropdown";
import { globalStatusColorsBorder } from "../../../globals/libs/helpers";
import PreOrderListItemSide from "./PreOrderListItemSide";
import PreOrderListItemHeader from "./PreOrderListItemHeader";
import PreOrderListItemContent from "./PreOrderListItemContent";
import ItalyAreasForRegions from '../../../globals/components/dataDisplay/ItalyAreasForRegions';

const PreOrdersListItem = ({
  preOrder,
  isSelected = false
}) => {
  return (
    <ListItem className={`
      justify-between p-4 border-l-4 w-full items-start
      ${ isSelected ? 'opacity-50 pointer-events-none shadow-none bg-transparent'  : ''}
      ${globalStatusColorsBorder[preOrder.status]}
    `}>
      <div className="flex w-full">
        <PreOrderListItemSide preOrder={preOrder} />

        <div className="flex-1 ml-2 w-full">
          <PreOrderListItemHeader preOrder={preOrder} />
          <PreOrderListItemContent preOrder={preOrder} />
        </div>
      </div>

      { preOrder?.deliveryRegions?.length > 0 && (
        <div className="hidden md:block self-center ml-8">
          <div className="mr-4 inline-block" style={{ width: 80 }}>
            <ItalyAreasForRegions selectedRegions={preOrder.deliveryRegions} />
          </div>
        </div>
      )}
      
      <div className="mt-2">
        <PreOrdersListItemDropdown id={preOrder.id} />
      </div>
    </ListItem>
  )
}

export default PreOrdersListItem;
