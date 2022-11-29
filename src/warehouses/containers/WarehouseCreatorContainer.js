import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import useCreateWarehouse from "../hooks/useCreateWarehouse";
// Components
import Button from "../../globals/components/buttons_v2/Button";
import SimpleMap from "../../globals/components/layout/SimpleMap";
import WarehouseOwnershipForm from "../components/form/WarehouseOwnershipForm";
import WarehouseDetailsFields from "../components/form/WarehouseDetailsFields";
import ThirdPartyWarehouseFields from "../components/form/ThirdPartyWarehouseFields";
// Icons
import { FiCheck, FiTerminal } from "react-icons/fi";
import { BiReset } from "react-icons/bi";
// Helpers
import { getStandardCoordinatesByCheckpoint } from "../../globals/libs/helpers";
import { addWarehouseCreatorWindow, changeWarehouseCreatorContacts, changeWarehouseCreatorForm, changeWarehouseCreatorLocation, changeWarehouseCreatorWindow, copyPasteWarehouseCreatorWindows, resetWarehouseCreator, selectWarehouseCreator } from "../slices/warehouseCreatorSlice";
import { windowOppositeTypes } from "../libs/constants";

export default function WarehouseCreatorContainer() {
  const warehouse = useSelector(selectWarehouseCreator);
  const [ createWarehouse, { isLoading, validationError }] = useCreateWarehouse();
  let checkpoint = warehouse?.isLinked === 0 && warehouse;

  if(warehouse?.isLinked === 0) {
    checkpoint = warehouse;
  } else if(warehouse?.isLinked === 1) {
    checkpoint = warehouse.linkedWarehouse;
  } else {
    checkpoint = {};
  }

  const standard_coordinate = getStandardCoordinatesByCheckpoint(checkpoint);
  const dispatch = useDispatch();

  /*
    * Callbacks 
  */

  const updateForm = useCallback((payload) => {
    dispatch(changeWarehouseCreatorForm(payload));
  }, [warehouse]);

  const updateFormLocation = useCallback((data) => {
    dispatch(changeWarehouseCreatorLocation(data));
  }, [warehouse?.location]);

  const updateFormWindowBasic = useCallback((data) => {
    dispatch(changeWarehouseCreatorWindow(data));
  }, [warehouse?.window]);

  const updateFormWindowDates = useCallback((data) => {
    dispatch(changeWarehouseCreatorWindow({ ...data, value: data.value.toISOString() }));
  }, [warehouse?.window]);

  const updateFormWarehouseContact = useCallback((data) => {
    dispatch(changeWarehouseCreatorContacts(data));
  }, [warehouse?.contacts]);
  
  /*
    * Reset effect 
  */

  useEffect(() => {
    return () => dispatch(resetWarehouseCreator());
  }, []);

  if(warehouse.isLinked === "NONE") {
    return (
      <div className="flex flex-col h-full w-full">
        <div className="bg-warehouse w-full h-[350px]" />
        <WarehouseOwnershipForm
          callback={(value) => updateForm({ name: "isLinked", value })} />
      </div>
    )
  }
  return (
    <div className="flex flex-col h-full w-full">      
      {/* Sidebar */}
      <div className="flex gap-2 flex-col md:flex-row h-full">
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
          { warehouse.isLinked === 1
              ? <ThirdPartyWarehouseFields
                  warehouse={warehouse}
                  updateForm={updateForm}
                />
              : <WarehouseDetailsFields
                  warehouse={warehouse}
                  validationError={validationError}
                  updateForm={updateForm}
                  copyPaste={windowType => dispatch(copyPasteWarehouseCreatorWindows(windowOppositeTypes[windowType]))}
                  addWindow={windowType => dispatch(addWarehouseCreatorWindow(windowType))}
                  updateLocation={data => updateFormLocation(data)}
                  updateWindow={data => updateFormWindowBasic(data)}
                  updateWindowDates={data => updateFormWindowDates(data)}
                  updateWarehouseContacts={data => updateFormWarehouseContact(data)}
                />
          }
        </section>
      </div>

      <footer className="footer">
        <h5 className="title-5 uppercase opacity-50 flex items-center">
          <FiTerminal className="mr-1" />
          <span className="text-sm">Creazione magazzino</span>
        </h5>

        <div className="flex items-center gap-2">
          <Button
            className="btn-primary-outline  ml-auto"
            icon={<BiReset />}
            text="Reset"
            onClick={() => dispatch(resetWarehouseCreator())}
          />

          <Button
            className="btn-primary ml-auto"
            icon={<FiCheck />}
            text="Salva il magazzino"
            loading={isLoading}
            onClick={() => createWarehouse(warehouse)}
          />
        </div>
      </footer>
    </div>
  )
}