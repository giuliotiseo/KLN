import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import useCreateVehicle from "../hooks/useCreateVehicle";
// Components
import Button from "../../globals/components/buttons_v2/Button";
import SimpleMap from "../../globals/components/layout/SimpleMap";
import VehicleDetailsFields from "../components/form/VehicleDetailsFields";
// Icons
import { FiCheck, FiTerminal } from "react-icons/fi";
import { BiReset } from "react-icons/bi";
// Helpers
import { changeVehicleCreatorForm, changeVehicleCreatorLastPosition, resetVehicleCreator } from "../slices/vehicleCreatorSlice";
import { selectVehicleCreator } from "../slices/vehicleCreatorSlice";

export default function VehicleCreatorContainer() {
  const vehicle = useSelector(selectVehicleCreator);
  const [ createVehicle, { isLoading, validationError }] = useCreateVehicle();
  const dispatch = useDispatch();

  /*
    * Callbacks 
  */

  const updateForm = useCallback((payload) => {
    dispatch(changeVehicleCreatorForm(payload));
  }, [dispatch]);

  const updateFormLocation = useCallback((data) => {
    dispatch(changeVehicleCreatorLastPosition(data));
  }, [dispatch]);
  
  /*
    * Reset effect 
  */

  useEffect(() => {
    return () => dispatch(resetVehicleCreator());
  }, [dispatch]);

  return (
    <div className="flex flex-col h-full w-full">      
      {/* Sidebar */}
      <div className="flex gap-2 flex-col md:flex-row h-full">
        <aside className="relative rounded-lg flex-1 my-2 overflow-hidden">
          <SimpleMap
            lat={vehicle?.lastPosition?.coordinate?.lat || vehicle?.lastPosition?.coordinate?.[0] || null}
            lng={vehicle?.lastPosition?.coordinate?.lng  || vehicle?.lastPosition?.coordinate?.[1] || null}
            onClick={updateFormLocation}
          />
        </aside>

        {/* Content */}
        <section className="relative flex-3 bg-base-200">
          <VehicleDetailsFields
            vehicle={vehicle}
            validationError={validationError}
            updateForm={updateForm}
            updateLocation={updateFormLocation}
          />
        </section>
      </div>

      <footer className="footer">
        <h5 className="title-5 uppercase opacity-50 flex items-center">
          <FiTerminal className="mr-1" />
          <span className="text-sm">Creazione veicolo</span>
        </h5>

        <div className="flex items-center gap-2">
          <Button
            className="btn-primary-outline  ml-auto"
            icon={<BiReset />}
            text="Reset"
            onClick={() => dispatch(resetVehicleCreator())}
          />

          <Button
            className="btn-primary ml-auto"
            icon={<FiCheck />}
            text="Salva il veicolo"
            loading={isLoading}
            onClick={() => createVehicle(vehicle)}
          />
        </div>
      </footer>
    </div>
  )
}