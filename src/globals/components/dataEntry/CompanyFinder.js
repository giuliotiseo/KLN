import { useEffect, useRef, useState } from  'react';
import { useSelector } from 'react-redux';
// Components
import FormText from './FormText';
import BasicSelector from './BasicSelector';
import DropdownComboBox from './DropdownComboBox';
import { selectAllClientsContacts, selectAllTransportersContacts } from '../../../contacts/slices/allContactsSlice';
// Fetch
import { fetchCompanyByTagForContactsControls } from '../../../company/api/fetch';
import { FiDelete, FiSearch } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useClickOutside } from '../../libs/hooks';

// GridButtons settings
const buttonsSettings = [
  { name: 'contacts', text: 'Rubrica', desc: 'Cerca nome in rubrica...' },
  { name: 'tag', text: 'Tag', desc: 'Cerca in rete per tag...' },
];

const buttonStyle = 'bg-primary-200 ml-1 p-2 rounded-md text-light-100';

/* - Components -------------------------------------------------------------------------------- */
export default function CompanyFinder ({
  id,
  reset,
  label,
  company,
  setCompany,
  styles,
  labelClassName = "",
  searchType = null,
  registeredOnly = false,
  hideSearchMethod = false,
  externalTrigger = null,
}) {
  // Query string
  const [ query, setQuery ] = useState(() => company && company?.name ? company.name : "");
  // Selected query type
  const [ queryType, setQueryType ] = useState('contacts');
  // Search results list data
  const [ listResult, setListResult ] = useState([]);
  const [ disabledInput, setDisabledInput ] = useState(company?.name ? true : false);
  const transporters = useSelector(selectAllTransportersContacts);
  const clients = useSelector(selectAllClientsContacts);
  const ref = useRef();
  const companiesFromContacts = !searchType
    ? [...transporters, ...clients]
    : searchType === "TRANSPORT"
      ? transporters
      : clients;

  useClickOutside(ref, () => {
    setListResult([]);
  });

  function handleQueryChange(e) {
    e.preventDefault();
    const { value } = e.target;
    // Store current input value
    setQuery(value);

    if(value === '') {
      setListResult([]);
    }
  }

  // Perform the correct graphql query
  function handleQuery () {
    switch (queryType) {
      case 'tag':
        if (query) {
          searchCompanyByTag(query.toUpperCase());
        };
        break;
      case 'contacts':
        setListResult(() => {
          const res = companiesFromContacts?.filter(item => item.name.toUpperCase().includes(query.toUpperCase()))
          return res;
        });
        break;
      default: throw new Error('Unknown query type');
    }
  }

  // Get companies by tag
  async function searchCompanyByTag (tag) {
    const results = await fetchCompanyByTagForContactsControls(tag);
    const dataToSend = searchType === "TRANSPORT" ? results.filter(comp => comp.type === "TRANSPORT") : results;
    if(dataToSend.length === 0) toast.info(searchType === "TRANSPORT" ? `Non è stata trovata nessun'azienda di trasporti con il tag ${query}` : `Non è stata trovata nessun'azienda con il tag ${query}`);
    setListResult(dataToSend);
  }

  function handleChangeQueryType(val) {
    setQueryType(val);
    setCompany(null);
    setQuery('');
    setListResult([]);
  }

  function handleClear() {
    reset();
    setDisabledInput(false);
    setQuery('');
    setQueryType('contacts');
    setListResult([]);
  }

  function handleSelectCompany(value) {
    let selectedCompany = null;
    if(queryType === "contacts") {
      selectedCompany = companiesFromContacts.filter(company => company.id === value)[0];
      if(registeredOnly && !selectedCompany.tag) {
        toast.error('Impossibile seleziona un\'azienda non registrata alla piattaforma.');
        toast.error('Si prega di effettuare un tentativo di sincronizzazione dalla rubrica contatti. In caso di fallimento, suggeriamo di inviare un invito di iscrizione all\'azienda desiderata.', { autoClose: 10000 });
        handleClear();

        return;
      };
    }

    if(queryType === "tag") {
      selectedCompany = listResult.filter(company => company.companyId === value)[0];
    }

    setQuery(selectedCompany.name)
    setDisabledInput(true);

    // Qui è stata una modifica in seguito all'aggiornamento di CreateOrderContainer (selezione del mittente in form preorder compiler)
    setCompany(selectedCompany);
  }

  // Reset se company è null (quindi resetto dal componente superiore)
  useEffect(() => {
    if(!company) {
      handleClear();
    }
  }, [company]); 

  useEffect(() => {
    if(externalTrigger) {
      handleClear();
    }
  }, [externalTrigger])

  return (
    <form
      className='w-full'
      onSubmit={event => {
        event.preventDefault();
        // Perform remote search
        handleQuery();
      }}
    >
      { label && <p className={`label ${labelClassName}`}>{label}</p>}
      <div className={`flex items-end rounded-md ${styles || ''}`}>
        {/* Query type */}
        { !hideSearchMethod && <div className="my-2">
          <BasicSelector
            id="search-method"
            label={null}
            value={buttonsSettings[0].name}
            onChange={(value) => handleChangeQueryType(value)}
            disabled={disabledInput}
          >
            { buttonsSettings.map((item) => (
              <option key={item.name} value={item.name}>
                {item.text}
              </option>
            ))}
          </BasicSelector>
        </div> }

        {/* Search bar */}
          <div className="relative flex-1 pl-1">
            <div className="flex items-center">
              <FormText
                placeholder={`${buttonsSettings.filter(item => item.name === queryType)[0].desc}`}
                id={id}
                name={id}
                value={query}
                disabled={disabledInput}
                onChange={event => handleQueryChange(event)}
                onKeyPress={event => {
                  if (event.key === 'Enter') {
                    event.preventDefault();
                    handleQuery();
                  }
                }}
              />

              { disabledInput
                ? <button style={{ height: 35, width: 35 }} className={buttonStyle} onClick={() => handleClear()}><FiDelete className="text-lg" /></button>
                : <button style={{ height: 35, width: 35 }} className={buttonStyle} onClick={() => handleQuery()}><FiSearch className="text-lg" /></button>
              }
            </div>

            { listResult?.length !== 0 && !disabledInput && (
              <DropdownComboBox
                data={listResult.map(c => ({ text: c.name, value: queryType === "tag" ? c.companyId : c.id }))} 
                onClick={value => handleSelectCompany(value)} 
                dropdownLabel="Aziende trovate in rubrica"
                focusIndex={null}
                clickOutsideRef={ref}
              /> 
            )}
          </div>
      </div>
    </form>
  );
}