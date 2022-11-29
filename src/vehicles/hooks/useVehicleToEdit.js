import { useSelector } from "react-redux";
import { useVehicleByIdQuery } from "../api/vehicles-api-slice";
import { selectVehicleEditor } from "../slices/vehicleEditorSlice";

export default function useVehicleToEdit(id) {
  const { data: selectedVehicle, isFetching, isLoading } = useVehicleByIdQuery({ id });
  const editorVehicle = useSelector(selectVehicleEditor);
  let vehicleToRender = {
    ...selectedVehicle,
    ...editorVehicle
  }

  return {
    vehicle: {
      ...vehicleToRender,
    },
    isLoading: isLoading || isFetching,
  }
}