import { useState } from "react"
import { Link } from "react-router-dom"
import { LargeParagraph, SmallParagraph } from "../../globals/components/typography/paragraphs"
import { LinkedOrderItem } from "./create/LinkedOrders"
import DirectSvg from "../../preOrders/components/item/DirectSvg"
import GroupageSvg from "../../preOrders/components/item/GroupageSvg"
import OrderListItemDropdown from "./OrderListItemDropdown"
import OrderListItemConfirmationModal from "./item/OrderListItemConfirmationModal"
// Helpers
import { ShipmentType } from "../../globals/libs/models"
import { formatDate, formatDistanceDate } from "../../globals/libs/helpers"
import { SHIPMENT_METHOD_DESCRIPTION } from "../../preOrders/libs/helpers"
import { ORDERS_LABELS, orderStatusColorsBorders } from "../libs/helpers"
import Checkbox from "../../globals/components/dataEntry/Checkbox"

const OrderListItem = ({ item, queryFrom, tenant, queryStatus, showDropdown, multiselect, selectedIdsState }) => {
  const [ modal, setModal ] = useState(false);
  const [ selectedIds, setSelectedIds ] = selectedIdsState;

  return (
    <li className="relative flex items-center shadow-md bg-base-100 rounded-lg mb-2">
      { multiselect && (
        <Checkbox
          id={item.id}
          name={`orderpicker_${item.id}`}
          label={null}
          value={selectedIds.includes(item.id)}
          initialStatus={selectedIds.includes(item.id)}
          controlled={true}
          onChange={() => {
            selectedIds.includes(item.id)
              ? setSelectedIds(prev => prev.filter(id => id !== item.id))
              : setSelectedIds(prev => prev.concat(item.id));
          }}
        /> 
      )}
      <div className="flex-1 rounded-lg overflow-hidden">
        <Link
          className=""
          to={`/orders/details?id=${item.id}&from=${queryFrom}`}
        >
          <div className={`border-l-4 ${orderStatusColorsBorders[item.status]} flex p-4 flex-col md:flex-row items-start`}>
            <div className="flex flex-row md:flex-col mb-4 md:mb-0 justify-start md:justify-center items-center mr-2">
              <span data-tip={item.shipmentType} className={`relative text-base md:text-lg w-12 h-12 text-center flex items-center bg-primary-100 rounded-full p-2`}>
                { item.shipmentType === ShipmentType.DIRETTO && <DirectSvg />}
                { item.shipmentType === ShipmentType.GROUPAGE && <GroupageSvg />}
              </span>
              <div className="mt-2 uppercase text-center flex md:flex-col items-center">
                <LargeParagraph styles="block mr-1 ml-2 md:ml-0 md:mr-0 font-bold">
                  { formatDate(new Date(item.pickupDateStart), "d")}
                </LargeParagraph>
                <SmallParagraph styles="block mr-1 md:mr-0">
                  { formatDate(new Date(item.pickupDateStart), "LLL")}
                </SmallParagraph>
                <SmallParagraph styles="block mr-1 md:mr-0">
                  { formatDate(new Date(item.pickupDateStart), "yy")}
                </SmallParagraph>
              </div>
            </div>

            <div className="ml-2 w-full">
              <div className="mb-2">
                <LinkedOrderItem order={item} enableDelete={false} />
              </div>
              <div className="mt-2 -translate-x-1">
                <SmallParagraph styles="opacity-70 chip-neutral inline-block">
                  { SHIPMENT_METHOD_DESCRIPTION[item.shipmentType]}
                </SmallParagraph>
                <SmallParagraph styles="opacity-70 chip-neutral inline-block">
                  { ORDERS_LABELS[queryFrom].action} {formatDistanceDate(new Date(item.createdAt), new Date())}
                </SmallParagraph>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* List item dropdown */}
      { showDropdown && (
        <div className="mr-4">
          <OrderListItemDropdown
            id={item.id}
            tenant={tenant}
            createdAt={item.createdAt}
            queryFrom={queryFrom}
            queryStatus={queryStatus}
            showDeleteModal={() => setModal("delete")}
          />
        </div>
      )}

      {/* Modals */}
      <OrderListItemConfirmationModal
        order={item}
        operation={modal}
        modal={modal}
        setModal={setModal}
        queryFrom={queryFrom}
      />
    </li>
  )
}

export default OrderListItem;