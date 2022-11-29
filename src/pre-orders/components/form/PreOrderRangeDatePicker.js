import { useState, useEffect } from 'react';
import { FiAlertTriangle } from 'react-icons/fi';
import Button from '../../../globals/components/buttons_v2/Button';
import DateTimeRangePicker from '../../../globals/components/dataEntry/DateTimeRangePicker';
import PreOrderCheckpointSummary from '../viewer/PreOrderCheckpointSummary';
import { runDateTimeVerifications } from '../../../globals/libs/helpers';

function PreOrderRangeDatePicker({
  checkpoint,
  pickupDateStart,
  pickupDateEnd,
  updateForm,
}) {
  const [ warning, setWarning ] = useState(false);
  const [ checkpointDetailsBox, setCheckpointDetailsBox ] = useState(false);

  useEffect(() => {
    setWarning(false);
    if(pickupDateStart && pickupDateEnd && checkpoint?.windows?.CARICO) {
      runDateTimeVerifications(checkpoint?.windows?.CARICO, pickupDateStart, pickupDateEnd, setWarning)
    }
  }, [pickupDateStart, pickupDateEnd, checkpoint?.windows?.CARICO])

  return (
    <div>
      <h3 className='title-3'>Data e orario ritiro</h3>
        {/* Date time range */}
        <DateTimeRangePicker
          label="Imposta un range di disponibilità"
          start={pickupDateStart ? new Date(pickupDateStart) : null}
          end={pickupDateEnd ? new Date(pickupDateEnd) : null}
          setStart={(value) => updateForm({ name: "pickupDateStart", value: value ? value.toISOString() : null })}
          setEnd={(value) => updateForm({ name: "pickupDateEnd", value: value ? value.toISOString() : null })}
          timeMargin={0}
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
            <PreOrderCheckpointSummary
              checkpoint={checkpoint}
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
  )
}

export default PreOrderRangeDatePicker
