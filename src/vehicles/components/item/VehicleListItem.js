import { useState } from 'react';
import { Link } from 'react-router-dom';
// Components
import VehicleConfirmationModal from './VehicleConfirmationModal';
import { LargeParagraph, Paragraph, SmallParagraph } from "../../../globals/components/typography/paragraphs";
import VehicleListItemDropdown from './VehicleListItemDropdown';
// Icons
import { FiTruck } from 'react-icons/fi';
// Helpers
import { BULKHEAD_DESCRIPTION, colorsBackground, VEHICLE_STATUS_DESCRIPTION, VEHICLE_TYPE_DESCRIPTION } from "../../libs/helpers";
import { capitalize, formatDate } from "../../../globals/libs/helpers";

// Main component -----------------------------------------------------------------------------------------------
export default function VehicleListItem({ item }) {
  const [ modal, setModal ] = useState(false);

  const colors = {
    "DISPONIBILE":  "border-success-200",
    "NON_DISPONIBILE": "border-danger-300",
    "IN_MARCIA": "border-amber-400",
  }

  const statusColor = colors[item.status];

  return (
    <>
      <li className={`list__item flex justify-between items-center`}>
        <div className={`border-l-4 ${statusColor} p-4 flex items-center`}>
          <span data-tip={VEHICLE_STATUS_DESCRIPTION[item.status]} className={`text-base md:text-lg mr-2 w-8 h-8 text-center flex items-center ${colorsBackground[item.status]} rounded-full p-2`}>
            <FiTruck />
          </span>
          <div>
            <LargeParagraph>
              <Link className="hover:text-primary-100 dark:text-primary-300" to={`/vehicles/detail?id=${item.licensePlate}`}>
                {capitalize(item.brand)} {capitalize(item.model)}
              </Link>
            </LargeParagraph>
            <Paragraph styles="opacity-70">{VEHICLE_TYPE_DESCRIPTION[item.type]} - {item.licensePlate}</Paragraph>
            <div className="hidden md:block">
              { item.bulkhead && <SmallParagraph styles="inline-block chip-neutral">
                {BULKHEAD_DESCRIPTION[item.bulkhead]}
              </SmallParagraph> }
              { item.updatedAt && <SmallParagraph styles="inline-block chip-neutral">
                Ultima modifica: {formatDate(new Date(item.updatedAt), "PPpp")}
              </SmallParagraph> }
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <div className="mr-4">
            <VehicleListItemDropdown
              licensePlate={item.licensePlate}
              showDeleteModal={() => setModal("delete")}  
            />
          </div>
        </div>
      </li>

      {/* Modals */}
      <VehicleConfirmationModal
        vehicle={item}
        operation={modal}
        modal={modal}
        setModal={setModal}
      />
    </>
  )
}