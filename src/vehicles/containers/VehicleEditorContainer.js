import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useVehicleToEdit, useUpdateVehicle } from "../hooks";
// Components
import Button from "../../globals/components/buttons_v2/Button";
import SimpleMap from "../../globals/components/layout/SimpleMap";
import VehicleDetailsFields from "../components/form/VehicleDetailsFields";
import Spinner from "../../globals/components/layout/Spinner";
import { BiReset } from "react-icons/bi";
import { FiCheck, FiTerminal } from "react-icons/fi";
// Actions
import { changeVehicleEditorForm, changeVehicleEditorLastPosition, resetVehicleEditor } from "../slices/vehicleEditorSlice";

export default function VehicleEditorContainer() {
  const [ searchParams ] = useSearchParams();
  const id = searchParams.get('id');
  const { vehicle, isLoading: isFetchingVehicle } = useVehicleToEdit(id);
  const [ updateVehicle, { isLoading, validationError }] = useUpdateVehicle(vehicle);
  const dispatch = useDispatch();

  /* 
    * Callbacks 
  */
  const updateForm = useCallback((payload) => {
    dispatch(changeVehicleEditorForm(payload));
  }, [vehicle]);

  const updateFormLocation = useCallback((data) => {
    dispatch(changeVehicleEditorLastPosition(data));
  }, [vehicle?.lastPosition]);

  /* 
    * Effects 
  */
  useEffect(() => {
    return () => dispatch(resetVehicleEditor());
  }, []);

  /* 
    * Render 
  */
  if(isFetchingVehicle) return <div>
    <Spinner />
  </div>

  return (
    <div className="flex flex-col h-full w-full">      
      {/* Sidebar */}
      <div className="flex flex-col md:flex-row h-full">
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
          <span className="text-sm">Modifica veicolo</span>
        </h5>

        <div className="flex items-center gap-2">
          <Button
            className="btn-primary-outline  ml-auto"
            icon={<BiReset />}
            text="Reset"
            onClick={() => dispatch(resetVehicleEditor())}
          />

          <Button
            className="btn-primary ml-auto"
            icon={<FiCheck />}
            text="Aggiorna il veicolo"
            loading={isLoading}
            onClick={() => updateVehicle(vehicle)}
          />
        </div>
      </footer>
    </div>
  )
}