// Custom components
import ActionButton from "../../globals/components/buttons/ActionButton";
import CheckboxGroup from "../../globals/components/dataEntry/CheckboxGroup";
import ControlledSelector from "../../globals/components/dataEntry/ControlledSelector";
import FormText from "../../globals/components/dataEntry/FormText";
import RangeItemSlider from "../../globals/components/dataEntry/RangeItemSlider";
import SearchPlaces from "../../globals/components/dataEntry/SearchPlaces";
import TextEditor from "../../globals/components/dataEntry/TextEditor";
import LocationItem from "../../globals/components/layout/LocationItem";
import { SmallParagraph } from "../../globals/components/typography/paragraphs";
import { SmallTitle, TinyTitle } from "../../globals/components/typography/titles";
import WindowCompiler from "./WindowCompiler";
import RangeSlider from "../../globals/components/dataEntry/RangeSlider";
// Reducers
import { windowOppositeTypes } from "../../contacts/libs/reducers";
// Models & helpers
import {
  WAREHOUSE_AUTOMATION_LEVEL, 
  WAREHOUSE_SPECIALIZATION,
  WAREHOUSE_BUILDING_TYPE, 
  WAREHOUSE_SCOPE,
  WAREHOUSE_TOOLS
} from "../libs/helpers";
import { forcedCapitalize } from "../../globals/libs/helpers";
import { COMPLEX_VEHICLE_TYPE_DESCRIPTION } from "../../vehicles/libs/helpers";
import { starterWindow } from "../../contacts/libs/helpers";
// Icons
import { FiCopy } from "react-icons/fi";

export default function WarehouseForm({
  nameState, typeState, specializationState, scopeState, 
  maxLengthState, enabledVehicleState, windowsState,
  automationLevelState, toolsState, locationState, noteState
}) {
  const [ name, setName ] = nameState;
  const [ type, setType ] = typeState;
  const [ specialization, setSpecialization ] = specializationState;
  const [ scope, setScope ] = scopeState;
  const [ maxLength, setMaxLength ] = maxLengthState;
  const [ enabledVehicles, setEnabledVehicles ] = enabledVehicleState;
  const [ windows, dispatchWindows ] = windowsState;
  const [ automationLevel, setAutomationLevel ] = automationLevelState; 
  const [ tools, setTools ] = toolsState;
  const [ location, setLocation ] = locationState;
  const [ note, setNote ] = noteState;

  return (
    <div className="grid grid-cols-1 gap-x-4 gap-y-2 px-8">
      <div className="col-span-1 sticky top-0 bg-base-100 z-10 py-2 bg-opacity-95">
        { !location?.coordinate?.lat || !location?.coordinate?.lng
          ? <SearchPlaces
            label="Cerca un indirizzo" 
            onClick={(data) => setLocation(data)}
            clearAfterClick={true}
          />
          : <LocationItem
              location={location}
              clearLocation={() => setLocation(null)}
            />
        } 
      </div>

      <div className="col-span-1">
        {/* Name */}
        <FormText
          label="Nome magazzino"
          placeholder="Es. Deposito di Roma"
          value={name}
          onChange={({ target: { value }}) => setName(value)}
          type="text"
        />
      </div>

      <div className="col-span-1">
        {/* Building type */}
        <ControlledSelector
          id="warehouse-building-type"
          label="Tipo di edificio"
          value={type}
          styles="w-full"
          labelStyle="mt-2"
          onChange={(val) => setType(val)}
        >
          { Object.keys(WAREHOUSE_BUILDING_TYPE).map(w_building => <option key={w_building} value={w_building}>{WAREHOUSE_BUILDING_TYPE[w_building]}</option>)}
        </ControlledSelector>
      </div>

      <div className="col-span-1">
        {/* Product type */}
        <ControlledSelector
          id="warehouse-specialization"
          label="Specializzazione"
          value={specialization}
          styles="w-full"
          labelStyle="mt-2"
          onChange={(val) => setSpecialization(val)}
        >
          { Object.keys(WAREHOUSE_SPECIALIZATION).map(w_spec => <option key={w_spec} value={w_spec}>{WAREHOUSE_SPECIALIZATION[w_spec]}</option> )}
        </ControlledSelector>
      </div>

      {/* Cargo bay */}
      <div className="col-span-1 mt-6 mb-4">
        <SmallTitle>Accesso al magazzino</SmallTitle>

        <CheckboxGroup
          label="Scegli mezzi consentiti"
          optionsType="object"
          options={COMPLEX_VEHICLE_TYPE_DESCRIPTION}
          values={enabledVehicles}
          onChange={(vals) => setEnabledVehicles(vals)}
          optionStyle="text-lg mr-2 mb-2"
          capitalizeText={true}
          checkboxContainerStyles="flex flex-wrap"
        />

        <RangeSlider
          label="Massimale metraggio transito mezzi"
          min={1}
          max={20}
          step={0.50}
          value={maxLength}
          onChange={setMaxLength}
          styles="mt-4"
          descriptor={`${parseFloat(maxLength).toFixed(1)}m`}
        />
      </div>

      {/* Scope */}
      <div className="col-span-1 mt-0 mb-4">
        <SmallTitle>Disponibilità magazzino</SmallTitle>

        { Object.keys(windows).map(type => (
          <div key={type}>
            <div className="flex items-center justify-between mt-2">
              <TinyTitle>{forcedCapitalize(type)}</TinyTitle>
              <ActionButton
                text={`Copia ${windowOppositeTypes[type].toLowerCase()}`}
                icon={() => <FiCopy />}
                styles="btn-primary-outline text-sm"
                onClick={() => dispatchWindows({ type: "copy_paste", windowType: windowOppositeTypes[type] })}
              />
            </div>
            <label className="label">Indica finestre di <b>{type.toLowerCase()}</b></label>

            { windows[type].map((win, index) => (
              <WindowCompiler
                key={index}
                title={`Finestra di ${type.toLowerCase()}`}
                index={index}
                window={win}
                dispatchWindows={dispatchWindows}
                styles={`border border-light-100 dark:border-dark-200 p-4 rounded-md ${ index < 1 && 'mb-6'}`}
              />
            ))}

            { windows[type]?.length < 2 && <ActionButton
              styles="btn-primary mt-4 mb-6"
              text={`Aggiungi finestra di ${type.toLowerCase()}`}
              onClick={() => dispatchWindows({ type: "add_window", value: {...starterWindow, type }})}
            /> }
          </div>
        ))}
      </div>

      {/* Scope */}
      <div className="col-span-1 my-2">
        <SmallTitle>Caratteristiche del magazzino</SmallTitle>
        <CheckboxGroup
          label="Funzione del magazzino"
          optionsType="object"
          options={WAREHOUSE_SCOPE}
          values={scope}
          onChange={(vals) => setScope(vals)}
          styles="mt-1"
          optionStyle="text-lg"
        />
      </div>

      
      <div className="col-span-1 my-2">
        <RangeItemSlider
          label="Livello di automazione"
          values={Object.keys(WAREHOUSE_AUTOMATION_LEVEL)}
          valueDescriptors={Object.keys(WAREHOUSE_AUTOMATION_LEVEL).reduce((acc, val) => ({ ...acc, [val]: WAREHOUSE_AUTOMATION_LEVEL[val].shortDesc }), {})}
          value={automationLevel}
          onChange={(val) => setAutomationLevel(val)}
          styles="mt-4"
        />

        <SmallParagraph styles="mt-2 px-1">
          { WAREHOUSE_AUTOMATION_LEVEL[automationLevel].longDesc }
        </SmallParagraph>
      </div>

      <div className="col-span-1 my-2">
        <SmallTitle>Asset necessari</SmallTitle>
        <CheckboxGroup
          label="Seleziona i mezzi operativi necessari per effettuare le operazioni di carico / scarico"
          optionsType="object"
          options={WAREHOUSE_TOOLS}
          values={tools}
          onChange={(vals) => setTools(vals)}
          styles="mt-1"
          optionStyle="text-lg"
        />
      </div>

      <div className="col-span-1 my-2">
        <TextEditor
          content={note}
          onSaveTextEditor={(content) => setNote(content)} 
          label="Note punto di interesse"
          actionButtonPosition="INTERNAL"
          showList={true}
        />
      </div>
    </div>
  )
}