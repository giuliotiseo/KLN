import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useWarehouseToEdit, useUpdateWarehouse } from "../hooks";
// Components
import Button from "../../globals/components/buttons_v2/Button";
import SimpleMap from "../../globals/components/layout/SimpleMap";
import WarehouseDetailsFields from "../components/form/WarehouseDetailsFields";
import ThirdPartyWarehouseEditor from "../components/form/ThirdPartyWarehouseEditor";
import Spinner from "../../globals/components/layout/Spinner";
import { BiReset } from "react-icons/bi";
import { FiCheck, FiTerminal } from "react-icons/fi";
// Actions
import {
  changeWarehouseEditorForm,
  changeWarehouseEditorLocation,
  changeWarehouseEditorWindow,
  changeWarehouseEditorContacts,
  copyPasteWarehouseEditorWindows,
  addWarehouseEditorWindow,
  resetWarehouseEditor,
  removeWarehouseEditorWindow,
} from "../slices/warehouseEditorSlice";
// Helpers
import { getStandardCoordinatesByCheckpoint } from "../../globals/libs/helpers";
import { windowOppositeTypes } from "../libs/constants";

export default function WarehouseEditorContainer() {
  const [ searchParams ] = useSearchParams();
  const id = searchParams.get('id');
  const { warehouse, isLoading: isFetchingWarehouse } = useWarehouseToEdit(id);
  const [ updateWarehouse, { isLoading, validationError }] = useUpdateWarehouse(warehouse);
  const dispatch = useDispatch();
  const standard_coordinate = getStandardCoordinatesByCheckpoint(warehouse);

  /* 
    * Callbacks 
  */
  const updateForm = useCallback((payload) => {
    if(payload.name === "scope" || payload.name === "tools") {
      dispatch(changeWarehouseEditorForm({
        ...payload,
        prev: warehouse[payload.name]
      }));
    } else {
      dispatch(changeWarehouseEditorForm(payload));
    }
  }, [warehouse]);

  const updateFormLocation = useCallback((data) => {
    dispatch(changeWarehouseEditorLocation(data));
  }, [warehouse?.location]);

  const updateWindows = useCallback((payload) => {
    dispatch(changeWarehouseEditorWindow({
      value: payload.value instanceof Date
        ? payload.value.toISOString()
        : payload.value,
      windows: warehouse.windows,
      windowType: payload.windowType,
      index: payload.index,
      name: payload.type === "toggle_day"
        ? "days"
        : payload.name
    }));
  }, [warehouse.windows]);

  const updateFormWarehouseContact = useCallback((data) => {
    dispatch(changeWarehouseEditorContacts({
      value: data,
      prev: warehouse?.contacts || [],
      prevIds: warehouse?.contactIds || []
    }));
  }, [warehouse?.contacts]);

  /* 
    * Effects 
  */
  useEffect(() => {
    console.log("Warehouse editor: ", warehouse);
    return () => dispatch(resetWarehouseEditor());
  }, []);

  /* 
    * Render 
  */
  if(isFetchingWarehouse) return <div>
    <Spinner />
  </div>

  return (
    <div className="flex flex-col h-full w-full">      
      {/* Sidebar */}
      <div className="flex flex-col md:flex-row h-full">
        <aside className="relative rounded-lg flex-1 my-2 overflow-hidden">
          <SimpleMap
            lat={standard_coordinate?.lat}
            lng={standard_coordinate?.lng}
            onClick={(value) => warehouse.isLinked === 1
              ? console.log('Operazione negata', value)
              : updateFormLocation(value)
            }
          />
        </aside>

        {/* Content */}
        <section className="relative flex-3 bg-base-200">
          { warehouse?.remote
            ? <ThirdPartyWarehouseEditor
                warehouse={warehouse}
                updateForm={updateForm}
                validationError={validationError}
              />
            : <WarehouseDetailsFields
                warehouse={warehouse}
                validationError={validationError}
                updateForm={updateForm}
                copyPaste={windowType => dispatch(copyPasteWarehouseEditorWindows(windowOppositeTypes[windowType]))}
                addWindow={windowType => dispatch(addWarehouseEditorWindow({ windowType, windows: warehouse.windows }))}
                updateLocation={data => updateFormLocation(data)}
                updateWindows={updateWindows}
                removeWindow={payload => dispatch(removeWarehouseEditorWindow(payload))}
                updateWarehouseContacts={data => updateFormWarehouseContact(data)}
              />
          
          }
        </section>
      </div>

      <footer className="footer">
        <h5 className="title-5 uppercase opacity-50 flex items-center">
          <FiTerminal className="mr-1" />
          <span className="text-sm">Modifica magazzino</span>
        </h5>

        <div className="flex items-center gap-2">
          <Button
            className="btn-primary-outline  ml-auto"
            icon={<BiReset />}
            text="Reset"
            onClick={() => console.log("Resetta")}
          />

          <Button
            className="btn-primary ml-auto"
            icon={<FiCheck />}
            text="Aggiorna il magazzino"
            loading={isLoading}
            onClick={() => updateWarehouse(warehouse)}
          />
        </div>
      </footer>
    </div>
  )
}