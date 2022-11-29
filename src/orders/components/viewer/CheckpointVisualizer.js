import { useState } from "react";
import Button from "../../../globals/components/buttons_v2/Button";
import OrderCheckpointSummary from "./OrderCheckpointSummary";
import { FiCalendar, FiMapPin } from "react-icons/fi";
import { formatDate } from "../../../globals/libs/helpers";
import CopyOnClipboard from "../../../globals/components/buttons_v2/CopyOnClipboard";


export default function CheckpointVisualizer ({
  order,
  companyTarget,
  checkpoint,
  className = "mt-2",
  title = "Dati",
  icon = null,
  summaryTitle = "Info",
  summaryIcon = null,
  windowsToShow = ["CARICO", "SCARICO"],
  start,
  end
}) {
  const [ checkpointDetailsBox, setCheckpointDetailsBox ] = useState(false);

  return (
    <div className={`${className}`}>
      <div className="bg-base-100 rounded-md border-b border-light-100 dark:border-dark-100">
        <div className="flex items-center gap-2 px-4 py-2 border-b border-light-50 dark:border-dark-50">
          { icon }
          <h3 className="title-3">{title}</h3>
        </div>
        
        <div className="text-lg mt-2 px-4 py-2">
          <p className="block">{order[`${companyTarget}Name`]}</p>
          <CopyOnClipboard
            inputData={order[`${companyTarget}Vat`]}
            className="mt-1 tracking-wider text-base md:text-lg text-secondary-200 dark:text-secondary-300 px-0 opacity-80 hover:opacity-100"
            hideInternalDataTip={true}
          />
        </div>
      </div>

      <div className="bg-base-100 rounded-md mt-2">
        <div className="flex items-center gap-2 border-b border-light-50 dark:border-dark-100 px-4 py-2">
          { summaryIcon }
          <h3 className="title-3">{summaryTitle}</h3>
        </div>
        <div className="px-4">
          <p className="text-lg mt-4">{checkpoint.name}</p>
          <div className="flex items-start mt-2">
            <FiMapPin className='mr-2' />
            {checkpoint.location.address}
          </div>
          
          { start && end && (
            <div className="flex items-start mt-2">
              <FiCalendar className='mr-2 mt-1' />
              Previsto tra: {formatDate(new Date(start), "PPp")} e {formatDate(new Date(end), "PPp")}
            </div>
          )}

          <Button
            onClick={() => setCheckpointDetailsBox((prev) => !prev)}
            className='btn-ghost mt-4'
            text={
              checkpointDetailsBox
              ? `Nascondi dettagli ${checkpoint?.name}`
              : `Vedi dettagli ${checkpoint?.name}`
            }
          />

          { checkpointDetailsBox && (
            <div className="bg-base-100 rounded-md my-2">
              <OrderCheckpointSummary
                checkpoint={checkpoint}
                windowsToShow={windowsToShow}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}