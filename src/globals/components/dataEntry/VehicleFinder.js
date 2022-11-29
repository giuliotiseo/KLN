import ComboBox from "./ComboBox";
import { FiX } from "react-icons/fi";

export default function VehicleFinder({  
  label,
  dropdownLabel = "Veicoli registrati",
  className,
  vehicle,
  vehicles,
  isLoading,
  refetch,
  pagination,
  clear = () => console.log("Default log clear in: <VehicleFinder />"),
  changeVehicle = () => console.log("Default log changeVehicle in: <VehicleFinder />"),
}) {

  return (
    <div className={`${className}`}>
      { label && <p className="label mb-0">{label}</p> }
      {
        !vehicle 
        ? <ComboBox
            id="vehicles-finder"
            label={null}
            dropdownLabel={dropdownLabel}
            onChange={({ value }) => changeVehicle(value)}
            onKeyPress={null}
            disabled={false}
            placeholder="Cerca targa del mezzo"
            descriptionKey="name"
            isLoading={isLoading}
            refetch={refetch}
            pagination={pagination}
            data={vehicles.map(vehicle => ({
              ...vehicle,
              name: `${vehicle.licensePlate} - ${vehicle.brand} ${vehicle.model}`
            }))}
          />
        : <p className="chip-neutral inline-flex items-center">
            <span className="inline-block">{`${vehicle.brand} ${vehicle.model} (${vehicle.type}${vehicle?.spot ? `, ${vehicle.spot} posti` : ''})`}</span>
            <button className="inline-block ml-1 hover:text-primary-200 dark:hover:text-primary-300" onClick={clear}>
              <FiX />
            </button>
          </p>
      }
    </div>
  )
}