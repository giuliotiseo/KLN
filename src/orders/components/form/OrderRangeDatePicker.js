import { useState, useEffect } from 'react';
import { FiAlertTriangle } from 'react-icons/fi';
import Button from '../../../globals/components/buttons_v2/Button';
import DateTimeRangePicker from '../../../globals/components/dataEntry/DateTimeRangePicker';
import OrderCheckpointSummary from '../viewer/OrderCheckpointSummary';
import { runDateTimeVerifications } from '../../../globals/libs/helpers';
import CardDetails from '../../../globals/components/dataDisplay/CardDetails';

function OrderRangeDatePicker({
  checkpoint,
  dateStartValue,
  dateStartName,
  dateEndValue,
  dateEndName,
  updateForm,
  title = "Data e orario",
  windowTypeToCheck = "CARICO",
  windowsToShow = ["CARICO", "SCARICO"],
  minimumStart,
  maximumStart
}) {
  const [ warning, setWarning ] = useState(false);
  const [ checkpointDetailsBox, setCheckpointDetailsBox ] = useState(false);

  useEffect(() => {
    setWarning(false);
    if(dateStartValue && dateEndValue && checkpoint?.windows?.[windowTypeToCheck]) {
      runDateTimeVerifications(checkpoint?.windows?.[windowTypeToCheck], dateStartValue, dateEndValue, setWarning)
    }
  }, [dateStartValue, dateEndValue, checkpoint?.windows?.[windowTypeToCheck]])

  return (
    <CardDetails header={<h3 className='title-3'>{title}</h3>}>
      <div className='relative pr-4'>
        {/* Date time range */}
        <DateTimeRangePicker
          label="Imposta un range di disponibilità"
          start={dateStartValue ? new Date(dateStartValue) : null}
          end={dateEndValue ? new Date(dateEndValue) : null}
          setStart={(value) => updateForm({ name: dateStartName, value: value ? value.toISOString() : null })}
          setEnd={(value) => updateForm({ name: dateEndName, value: value ? value.toISOString() : null })}
          timeMargin={0}
          minimumStart={minimumStart}
          maximumStart={maximumStart}
        />

        <Button
          onClick={() => setCheckpointDetailsBox((prev) => !prev)}
          className='btn-ghost'
          text={
            checkpointDetailsBox
            ? `Nascondi dettagli ${checkpoint?.name}`
            : `Vedi dettagli ${checkpoint?.name}`
          }
        />

        { checkpointDetailsBox && (
          <div className='mt-1 mb-4'>
            <OrderCheckpointSummary
              checkpoint={checkpoint}
              windowsToShow={windowsToShow}
            />
          </div>
        )}

        { warning && <div className='mt-1 '>
          <p className="flex items-center text-sm text-amber-500 dark:text-amber-200">
            <FiAlertTriangle className="mr-2" />
            Date non corrispondenti con le info di carico
          </p>
          <p className='text-sm alert-warn px-4 mt-2'>{warning}</p>
        </div>
        }
      </div>
    </CardDetails>
  )
}

export default OrderRangeDatePicker
