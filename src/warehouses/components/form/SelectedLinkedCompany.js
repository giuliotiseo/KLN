import { FiX } from 'react-icons/fi'
import Button from '../../../globals/components/buttons_v2/Button'
import Spinner from '../../../globals/components/layout/Spinner'

const SelectedLinkedCompany = ({
  linkedCompany,
  callback,
  loading
}) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="title-3 mb-2">Cliente selezionato</h3>
      </div>
      { loading
        ? <Spinner />
        : <div className="bg-base-100 rounded-md p-2 flex items-start justify-between">
            <div>
              <p className='text-lg'>{linkedCompany.name}</p>
              <p className='text-base'>{linkedCompany.city} ({ linkedCompany.province})</p>
            </div>
            <Button
              icon={<FiX />}
              className="btn-ghost"
              onClick={callback}
            />
          </div>
      }
    </>
  )
}

export default SelectedLinkedCompany
