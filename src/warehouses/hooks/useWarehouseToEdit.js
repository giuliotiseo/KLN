import { useSelector } from "react-redux";
import { useWarehouseByIdQuery } from "../api/warehouses-api-slice";
import { starterWindow } from "../libs/constants";
import { reformattedWindows } from "../libs/helpers";
import { selectWarehouseEditor } from "../slices/warehouseEditorSlice";

export default function useWarehouseToEdit(id) {
  const { data: selectedWarehouse, isFetching, isLoading } = useWarehouseByIdQuery({ id });
  const editorWarehouse = useSelector(selectWarehouseEditor);
  let warehouseToRender = {
    ...selectedWarehouse,
    ...editorWarehouse
  }

  return {
    warehouse: {
      ...warehouseToRender,
      windows: warehouseToRender?.windows && Object.keys(warehouseToRender?.windows)?.length > 0
        ? warehouseToRender.windows
        : reformattedWindows([{ ...starterWindow, type: "CARICO" }, { ...starterWindow, type: "SCARICO" }])
    },
    isLoading: isLoading || isFetching,
  }
}