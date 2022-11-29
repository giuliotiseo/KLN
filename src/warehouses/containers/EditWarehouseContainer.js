import { useState, useRef, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Custom components
import SafeArea from "../../globals/components/layout/SafeArea";
import SafeCol from "../../globals/components/layout/SafeCol";
import SectionWrap from "../../globals/components/layout/SectionWrap";
import SectionTop from "../../globals/components/layout/SectionTop";
import WarehouseForm from '../components/WarehouseForm';
import SimpleMap from '../../globals/components/layout/SimpleMap';
import { SmallTitle } from '../../globals/components/typography/titles';
import ContactsPicker from '../../contacts/components/ContactsPicker';
import WarehouseStatusToggler from '../components/detail/WarehouseStatusToggler';
import FullSpinner from '../../globals/components/spinners/FullSpinner';
import { Navigate } from 'react-router-dom';
// Selectors
import { selectCompanyInfo, selectStorekeepers, selectTenant } from '../../company/slices/companyInfoSlice';
import { selectWarehouseFromAllLists } from '../slices/warehousesListSlice';
// Icons
import { FiCheck, FiMapPin } from 'react-icons/fi';
// Helpers
import { toggleValues, truncateString } from '../../globals/libs/helpers';
import { useDataFinder } from '../../globals/libs/hooks';
import { reformattedWindows, starterCheckpoint } from '../../contacts/libs/helpers';
// Thunks & Api
import { updateWarehouseThunk } from '../../app/thunks/warehousesThunks';
import { fetchWarehouse } from '../api/fetch';
import { useEffect } from 'react';
import { checkpointReducer } from '../../contacts/libs/reducers';

// Wrapper component -----------------------------------------------------------------------------------------------
export default function EditWarehouseWrapper() {
  const [ warehouse, getWarehouseStatus ] = useDataFinder({
    queryStringKey: "id", 
    selector: selectWarehouseFromAllLists, 
    primaryKey: "id",
    query: fetchWarehouse,
  }) 

  if(getWarehouseStatus === 'loading') return <FullSpinner />
  if(getWarehouseStatus === 'success' && !warehouse) return <Navigate to="/warehouses" replace />
  return <EditWarehouseContainer warehouse={warehouse} />
}

// Main component -----------------------------------------------------------------------------------------------
function EditWarehouseContainer({ warehouse }) {
  const [ name, setName ] = useState(warehouse.name);
  const [ type, setType ] = useState(warehouse.type);
  const [ specialization, setSpecialization ] = useState(warehouse.specialization);
  const [ scope, setScope ] = useState(warehouse.scope);
  const [ automationLevel, setAutomationLevel ] = useState(warehouse.automationLevel);
  const [ tools, setTools ] = useState(warehouse.tools);
  const [ note, setNote ] = useState(warehouse.note);
  const [ contactIds, setContactIds ] = useState(warehouse.contactIds);
  const [ contacts, setContacts ] = useState();
  const [ maxLength, setMaxLength ] = useState(warehouse.maxLength);
  const [ enabledVehicles, setEnabledVehicles ] = useState(warehouse.enabledVehicles);
  const myCompany = useSelector(selectCompanyInfo);
  const [{ windows }, dispatchWindows ] = useReducer(checkpointReducer, {
    ...starterCheckpoint, 
    windows: reformattedWindows(warehouse.windows)
  });

  const [ location, setLocation ] = useState(() => ({
    ...warehouse.location,
    coordinate: {
      lat: warehouse.location.coordinate[0], 
      lng: warehouse.location.coordinate[1]
    }
  }));
  const [ loadingSave, setLoadingSave ] = useState(false);
  const tenant = useSelector(selectTenant);
  const storekeepers = useSelector(selectStorekeepers);
  const scrollableRefList = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    setContacts(() => contactIds.length > 0
    ? contactIds.map(c_id => ({ 
      contactId: c_id,
      name: storekeepers[c_id].name, 
      email: storekeepers[c_id].email,
      phone: storekeepers[c_id].phone,
      job: myCompany?.name,
    }))
    : []);
  }, [contactIds])

  // Button save config
  const btn_save = {
    text: "Salva",
    icon: () => <FiCheck />,
    loading: loadingSave,
    onClick: () => handleEditWarehouse({
      id: warehouse.id, tenant, name, type, specialization, scope, maxLength, enabledVehicles, windows,
      automationLevel, tools, location, note, contactIds, contacts, log: warehouse.log
    }),
  }

  // Create handler
  async function handleEditWarehouse(warehouse) {
    setLoadingSave(true);
    await dispatch(updateWarehouseThunk({ warehouse }));
    setLoadingSave(false);
  }

  return (
    <SectionWrap>      
      <SectionTop
        title={`Modifica ${truncateString(name.toLowerCase(), 50)}`}
        icon={() => <FiMapPin className="w-8 h-auto mr-4"/>}
        backPath="/warehouses"
        action={btn_save}
        filters={null}
      />

      <SafeArea className="grid grid-cols-2 grid-rows-3">
        <div className="col-span-2 row-span-1 md:row-span-3 md:col-span-1">
          <div className="relative w-full h-full">
            <SimpleMap
              lat={location?.coordinate?.lat}
              lng={location?.coordinate?.lng}
              onClick={(value) => setLocation(value)}
            />
          </div>
        </div>
        <div className="relative col-span-2 row-span-2 md:row-span-3 md:col-span-1">
          <SafeCol id="warehouses-list" className="py-4" ref={scrollableRefList}>
            <SmallTitle styles="px-8 mb-4">Configurazione magazzino</SmallTitle>
            <WarehouseForm
              nameState={[name, setName]}
              typeState={[type, setType]}
              specializationState={[specialization, setSpecialization]}
              scopeState={[scope, setScope]}
              maxLengthState={[maxLength, setMaxLength]}
              enabledVehicleState={[enabledVehicles, setEnabledVehicles]}
              windowsState={[windows, dispatchWindows]}
              automationLevelState={[automationLevel, setAutomationLevel]}
              toolsState={[tools, setTools]}
              locationState={[location, setLocation]}
              noteState={[note, setNote]}
            />

            <div className="mx-8 my-4">
              <WarehouseStatusToggler warehouse={warehouse} />
            </div>
            

            {/* Contacts */}
            <ContactsPicker
              title="Rubrica magazzinieri"
              storekeepers={storekeepers}
              initialContactIds={contactIds}
              subtitle="Seleziona un referente per questo magazzino"
              styles="px-8"
              handleSelectedContacts={(value) => toggleValues({
                value,
                values: contactIds,
                onChange: setContactIds
              })}
            />
          </SafeCol>
        </div>
      </SafeArea>
    </SectionWrap>
  )
}