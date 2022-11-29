import StatusPicker from '../../../globals/components/pickers/StatusPicker'
import { ORDER_STATUS_DESCRIPTION } from '../../libs/constants'

const OrderEditorStatus = ({
  order,
  updateForm
}) => {
  return (
    <div className='mb-4 '>
      <h2 className="title-5 mb-4 uppercase text-gray-500 dark:text-gray-600">
        Info in tempo reale
      </h2>
      <section className="p-4 bg-base-100 rounded-md">
        <StatusPicker
          id="status"
          element={order}
          callback={updateForm}
          label="Stato ordine"
          optionsObj={ORDER_STATUS_DESCRIPTION}
        />
      </section>
    </div>
  )
}

export default OrderEditorStatus
