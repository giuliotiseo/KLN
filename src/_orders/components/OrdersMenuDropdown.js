// Components
import ActionButton from "../../globals/components/buttons/ActionButton";
import ActionButtonLink from "../../globals/components/buttons/ActionButtonLink";
import Dropdown, { DropdownList, DropdownListItem } from "../../globals/components/navigation/Dropdown";
// Icons
import { FiDownload, FiMoreVertical, FiPlus, FiRefreshCw, FiX } from "react-icons/fi";
import { useSelector } from "react-redux";
import { selectProfile } from "../../user/state/userSlice";
import { selectOrdersFromList } from "../slices/ordersSlice";
import { selectCompanyInfo } from "../../company/slices/companyInfoSlice";
import DownloadXlsButton from "../../globals/components/buttons/DownloadXlsButton";
import { generateOrdersForPTVExport } from "../libs/ptv-integration";

const cta_list = {
  to: "/orders?from=sender&status=incoming",
  text: "Visualizza come cliente",
  icon: () => <FiPlus />
}

const tableHeadings = [
  "CreationDate",
  "ImportAction",
  "ImportType",
  "ExtId1",
  "OrderAction",
  "Taskfield1ExtId",
  "PrecombinedTourId",
  "Weight",
  "Volume",
  "LoadingMeter",
  "EarliestDateTime",
  "LatestDateTime",
  "EarliestPickupTime",
  "LatestPickupTime",
  "EarliestDeliveryTime",
  "LatestDeliveryTime",
  "PickupLocationID",
  "PickupIsDepot",
  "PickupLocationName",
  "PickupPostCode",
  "PickupPostCity",
  "PickupStreet",
  "PickupCoordFormat",
  "PickupLongitude",
  "PickupLatitude",
  "PickupOpeningHour1Start",
  "PickupOpeningHour1End",
  "PickupOpeningHour1Days",
  "PickupOpeningHour2Start",
  "PickupOpeningHour2End",
  "PickupOpeningHour2Days",
  "DeliveryLocationID",
  "DeliveryIsDepot",
  "DeliveryLocationName",
  "DeliveryPostCode",
  "DeliveryCity",
  "DeliveryStreet",
  "DeliveryCoordFormat",
  "DeliveryLongitude",
  "DeliveryLatitude",
  "DeliveryOpeningHour1Start",
  "DeliveryOpeningHour1End",
  "DeliveryOpeningHour1Days",
  "DeliveryOpeningHour2Start",
  "DeliveryOpeningHour2End",
  "DeliveryOpeningHour2Days",
  "Text_1", // orderId
  "Text_2", // preOrderId
  "Text_3", // tenantSender
  "Text_4", // tenantCarrier
  "Text_5", // tenantReceiver
];

export default function OrdersMenuDropdown({ refresh, queryFrom, queryStatus }) {
  const { name } = useSelector(selectProfile);
  const orders = useSelector((store) => selectOrdersFromList(store, queryFrom));
  const myCompany = useSelector(selectCompanyInfo);

  return (
    <Dropdown
      id="orders-menu-dropdown-container"
      navItem={<div className="ml-2"><FiMoreVertical className="text-3xl" /></div>}
      navItemOpen={<div className="ml-2"><FiX className="text-3xl" /></div>}
      position="right-0"
      className="bg-inverse-300 ml-4 border border-light-100 dark:border-dark-100"
    >
      <DropdownList id="orders-menu-dropdown-list">
        <DropdownListItem id="orders-menu-dropdown-list-item-1" className='md:hidden'>
          <ActionButtonLink
            styles="hover:text-primary-200 dark:hover:text-primary-300"
            {...cta_list} 
          />
        </DropdownListItem>
        <DropdownListItem id="orders-menu-dropdown-list-item-1 text-left">
          <ActionButton
            icon={() => <FiRefreshCw />}
            text="Aggiorna lista"
            styles="btn-dropdown-item"
            onClick={refresh}
          />
        </DropdownListItem>
        { queryStatus === "pending" || queryStatus === "stocked" 
          ? <>
          <DropdownListItem id="orders-list-mode-dropdown-list-item-0 text-left">
              <DownloadXlsButton
                text="Esporta per PTV"
                styles="btn-dropdown-item"
                title={`orders-${myCompany.companyId}`}
                subject={`Esportazione lista ordini ${Date.now().toString()}`}
                author={name}
                data={orders}
                headings={tableHeadings}
                dataType="orders-gulliver"
                icon={() => <FiDownload />}
                sheetNames={["OrderImport"]}
                customColFormatSetup={{
                  col: [0,10,11,12,13,14,15],
                  format: 'gg/mm/aaaa hh:mm:ss',
                  param: "d"
                }}
              />
            </DropdownListItem>
            <DropdownListItem id="orders-menu-dropdown-list-item-1 text-left">
              <ActionButton
                icon={() => <FiRefreshCw />}
                text="Export V2"
                styles="btn-dropdown-item"
                onClick={() => generateOrdersForPTVExport(orders)}
              />
            </DropdownListItem>
          
          </>
            : null
        }
      </DropdownList>
    </Dropdown>
  )
}