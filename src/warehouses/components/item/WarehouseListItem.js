import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// Components
import ContactAvatar from "../../../contacts/components/ContactAvatar";
import WarehouseConfirmationModal from "./WarehouseConfirmationModal";
import WarehouseListItemDropdown from "./WarehouseListItemDropdown";
import { LargeParagraph, Paragraph, SmallParagraph } from "../../../globals/components/typography/paragraphs";
// Helpers
import { WAREHOUSE_BUILDING_TYPE, WAREHOUSE_SPECIALIZATION } from "../../libs/helpers";
// Icons
import { FiAlertTriangle } from "react-icons/fi";
import { MdGpsFixed } from "react-icons/md";
// State
import { selectStorekeepers } from "../../../company/slices/companyInfoSlice";

// Main component -----------------------------------------------------------------------------------------------
export default function WarehouseListItem({ item, handleTrackingLocation }) {
  const [ modal, setModal ] = useState(false);
  const storekeepers = useSelector(selectStorekeepers);
  const selectedStorekeepersIds = Object.keys(storekeepers).filter(sk_id => item.contactIds.includes(sk_id));
  const statusColor = item.status === 'ACTIVE' ? 'border-success-200' : 'border-danger-300';

  return (
    <>
      <li className={`list__item flex justify-between items-center`}>
        <div className={`border-l-4 ${statusColor} p-4 flex items-center`}>
          { item.location?.coordinate?.length !== 0 && item.location?.place_id
            ? <MdGpsFixed data-tip="Checkpoint tracciato" className="text-2xl mr-2 text-primary-100 dark:text-primary-300" />
            : <button onClick={() => handleTrackingLocation(item.location.address, item)}>
              <FiAlertTriangle data-tip="Coordinate non presenti - click per sincronizzare" className="text-2xl mr-2 text-amber-400 dark:text-amber-100" />
            </button>
          }
          <div>
            <LargeParagraph>
              <Link className="hover:text-primary-100 dark:text-primary-300" to={`/warehouses/detail?id=${item.id}`}>{item.name}</Link>
            </LargeParagraph>
            <Paragraph styles="opacity-70">{item.location.address}</Paragraph>
            
            <div className="hidden md:block">
              <SmallParagraph styles="inline-block chip-neutral">
                id: {item.id}
              </SmallParagraph>
              <SmallParagraph styles="inline-block chip-neutral">
                {WAREHOUSE_BUILDING_TYPE[item.type]}
              </SmallParagraph>
              <SmallParagraph styles="inline-block chip-neutral">
                {WAREHOUSE_SPECIALIZATION[item.specialization]}
              </SmallParagraph>
            </div>
          </div>
        </div>

        <div className="flex items-center">
          { selectedStorekeepersIds?.length > 0 && (
            selectedStorekeepersIds.map(sk_id => <div key={sk_id} data-tip={storekeepers[sk_id].name}>
              <ContactAvatar avatar={storekeepers[sk_id].avatar} size="w-8 h-8 mr-2" type={storekeepers[sk_id].type} /> 
            </div>
          ))}

          <div className="mr-4">
            <WarehouseListItemDropdown
              warehouseId={item.id}
              showDeleteModal={() => setModal("delete")}  
            />
          </div>
        </div>
      </li>

      {/* Modals */}
      <WarehouseConfirmationModal
        warehouse={item}
        operation={modal}
        modal={modal}
        setModal={setModal}
      />
    </>
  )
}