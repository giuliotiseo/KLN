import { useState, useRef, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// Custom components
import SafeArea from "../../globals/components/layout/SafeArea";
import SafeCol from "../../globals/components/layout/SafeCol";
import SectionWrap from "../../globals/components/layout/SectionWrap";
import SectionTop from "../../globals/components/layout/SectionTop";
import WarehouseForm from '../components/WarehouseForm';
import SimpleMap from '../../globals/components/layout/SimpleMap';
import ContactsPicker from '../../contacts/components/ContactsPicker';
import { SmallTitle } from '../../globals/components/typography/titles';
// Selectors
import { selectStorekeepers } from '../../company/slices/companyInfoSlice';
import { selectCompanyInfo } from '../../company/slices/companyInfoSlice';
// Icons
import { FiCheck, FiMapPin } from 'react-icons/fi';
// Thunks
import { createWarehouseThunk } from '../../app/thunks/warehousesThunks';
// Helpers
import { WarehouseAutomationLevel, WarehouseBuildingModel, WarehouseSpecialization } from '../libs/helpers';
import { toggleValues } from '../../globals/libs/helpers';
import { useFromPath } from '../../globals/libs/hooks';
import { checkpointReducer } from '../../contacts/libs/reducers';
import { starterWarehouseCheckpoint } from '../../contacts/libs/helpers';

// Main component -----------------------------------------------------------------------------------------------
export default function CreateWarehouseContainer() {
  const [ name, setName ] = useState('');
  const [ type, setType ] = useState(WarehouseBuildingModel.APERTO);
  const [ specialization, setSpecialization ] = useState(WarehouseSpecialization.GENERALE);
  const [ scope, setScope ] = useState([]);
  const [ maxLength, setMaxLength ] = useState(1);
  const [ enabledVehicles, setEnabledVehicles ] = useState([]);
  const [ automationLevel, setAutomationLevel ] = useState(WarehouseAutomationLevel.LOW);
  const [ tools, setTools ] = useState([]);
  const [ location, setLocation ] = useState(null);
  const [ note, setNote ] = useState(null);
  const [ contactIds, setContactIds ] = useState([]);
  const [ contacts, setContacts ] = useState([]);
  const [ loadingSave, setLoadingSave ] = useState(false);
  const [{ windows }, dispatchWindows ] = useReducer(checkpointReducer, starterWarehouseCheckpoint);
  const myCompany = useSelector(selectCompanyInfo);
  const storekeepers = useSelector(selectStorekeepers);
  const scrollableRef = useRef();
  const navigate = useNavigate();
  const fromPath = useFromPath();
  const dispatch = useDispatch();

  // When is triggered an update on contactIds list change the contact summary variable
  useEffect(() => {
    setContacts(() => contactIds.length > 0
    ? contactIds.map(c_id => ({ 
      contactId: c_id,
      name: storekeepers[c_id].name, 
      email: storekeepers[c_id].email,
      phone: storekeepers[c_id].phone,
      job: myCompany.name,
    }))
    : []);
  }, [contactIds]);

  // Button save config
  const btn_save = {
    onClick: () => handleCreateWarehouse(),
    text: "Registra",
    icon: () => <FiCheck />,
    loading: loadingSave,
  }

  // Create and redirect
  async function handleCreateWarehouse() {
    setLoadingSave(true);
    dispatch(createWarehouseThunk({
      warehouse: { tenant: myCompany.tag, name, type, specialization, scope, maxLength, enabledVehicles,
      windows, automationLevel, tools, location, note, contactIds, contacts },
      displayToast: true
    }));
    
    navigate(fromPath ? `/${fromPath}` : '/warehouses');
  }

  const standard_coordinate = {
    lat: location?.coordinate?.lat,
    lng: location?.coordinate?.lng
  }

  return (
    <SectionWrap>      
      <SectionTop
        title="Creazione magazzino"
        icon={() => <FiMapPin className="w-8 h-auto mr-4"/>}
        backPath="/warehouses"
        action={btn_save}
        filters={null}
      />

      <SafeArea className="grid grid-cols-2 grid-rows-3">
        <div className="col-span-2 row-span-1 md:row-span-3 md:col-span-1">
          <div className="relative w-full h-full">
            <SimpleMap
              lat={standard_coordinate.lat}
              lng={standard_coordinate.lng}
              onClick={(value) => setLocation(value)}
            />
          </div>
        </div>
        <div className="relative col-span-2 row-span-2 md:row-span-3 md:col-span-1">
          <SafeCol id="warehouses-creator" className="py-4" ref={scrollableRef}>
            <SmallTitle styles="px-8">Configurazione magazzino</SmallTitle>
            <WarehouseForm
              nameState={[name, setName]}
              typeState={[type, setType]}
              specializationState={[specialization, setSpecialization]}
              windowsState={[windows, dispatchWindows]}
              scopeState={[scope, setScope]}
              maxLengthState={[maxLength, setMaxLength]}
              enabledVehicleState={[enabledVehicles, setEnabledVehicles]}
              automationLevelState={[automationLevel, setAutomationLevel]}
              toolsState={[tools, setTools]}
              locationState={[location, setLocation]}
              noteState={[note, setNote]}
            />

            {/* Contacts */}
            <ContactsPicker
              title="Rubrica magazzinieri"
              storekeepers={storekeepers}
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