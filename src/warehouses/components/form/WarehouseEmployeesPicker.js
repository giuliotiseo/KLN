import { FiRefreshCw } from 'react-icons/fi'
import Button from '../../../globals/components/buttons_v2/Button'
import Avatar from '../../../globals/components/layout/Avatar'
import Spinner from '../../../globals/components/layout/Spinner'

const WarehouseEmployeesListItem = ({
  employee,
}) => (
  <li className='py-2 border-b border-light-50 dark:border-dark-50 last:border-none'>
    <div className='flex items-center text-base uppercase'>
      <Avatar
        name={`${employee.searchable }`}
        size={30}
        stepColor={100}
        src={employee?.avatar}
      />

      <span className='ml-2'>
        {employee.searchable}
      </span>
    </div>
  </li>
)

const WarehouseEmployeesPicker = ({
  employees,
  listType,
  isFetching,
  refetchEmployees,
  pagination
}) => {
  const message = {
    ALL: "Nessun dipendente presente in rubrica",
    WAREHOUSE: "Nessun magazziniere presente in rubrica",
    ADMIN: "Nessun impiegato presente in rubrica",
    DRIVE: "Nessun autista presente in rubrica",
  }

  if(employees?.length <= 0) return (
    <div className='p-4 border rounded-md italic'>
      { message[listType] }
      <Button
        text="Aggiorna"
        icon={<FiRefreshCw />}
        loading={isFetching}
        loadingText="Attendere"
        onClick={refetchEmployees} className="btn-primary mt-2 text-sm"
      />
    </div>
  )

  return (
    <>
      { isFetching 
        ? <Spinner className = "ml-1 h-5 w-5 text-primary-200 dark:text-primary-300" /> 
        : <ul>
        { employees.map(employee => (
              <WarehouseEmployeesListItem
                key={employee.id}
                employee={employee}
              />
            ))}
          </ul>
        }
    </>
  )
}

export default WarehouseEmployeesPicker;
