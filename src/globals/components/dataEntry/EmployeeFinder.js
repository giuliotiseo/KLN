import ComboBox from "./ComboBox";
import { FiX } from "react-icons/fi";

export default function EmployeeFinder({  
  label,
  dropdownLabel = "Cerca dipendente",
  className,
  employees,
  employee,
  pagination,
  refetch,
  isLoading,
  clear = () => console.log("Default log clear in: <EmployeeFinder />"),
  changeEmployee = () => console.log("Default log changeEmployee in: <EmployeeFinder />"),
}) {

  return (
    <div className={`${className}`}>
      { label && <p className="label">{label}</p> }
      {
        !employee 
        ? <ComboBox
            id="employees-finder"
            label={null}
            dropdownLabel={dropdownLabel}
            descriptionKey="name"
            data={employees.map(employee => ({  name: employee?.searchable?.toUpperCase() || employee.name,  value: employee }))}
            onChange={(employee) => changeEmployee(employee.value)}
            onKeyPress={null}
            disabled={false}
            placeholder="es. Mario Rossi"
            refetch={refetch}
            pagination={pagination}
            isLoading={isLoading}
          />
        : <p className="chip-neutral inline-flex items-center">
            <span className="inline-block">{employee?.searchable?.toUpperCase() || employee?.name}</span>
            <button className="inline-block ml-1 hover:text-primary-200 dark:hover:text-primary-300" onClick={clear}>
              <FiX />
            </button>
          </p>
      }
    </div>
  )
}