import Select from '../dataEntry_v2/Select'
import { GrStatusGoodSmall } from 'react-icons/gr'
import { globalStatusColorsText } from '../../libs/helpers'

const StatusPicker = ({
  id = "status",
  element,
  callback,
  label = "Stato",
  optionsObj = null
}) => {
  return (
    <div className='flex'>
      <GrStatusGoodSmall className={`mr-2 ${globalStatusColorsText[element.status]}`} />
      <Select
        id={id}
        label={label}
        value={element.status}
        selectClassName="input block w-full flex-1"
        className='flex-1'
        callback={callback}
      >
        { optionsObj 
          ? Object.keys(optionsObj).map(status => ( 
              <option key={status} value={status}>
                {optionsObj[status]}
              </option>
            ))
          : null
        }
      </Select>
    </div>
  )
}

export default StatusPicker
