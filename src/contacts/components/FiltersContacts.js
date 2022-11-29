import { useState } from "react";
import SimpleBar from 'simplebar-react';
// Custom components
import BasicSelector from "../../globals/components/dataEntry/BasicSelector";
import ActionButton from "../../globals/components/buttons/ActionButton";
import ControlledSelector from "../../globals/components/dataEntry/ControlledSelector";
import SearchFilter from "../../globals/components/dataEntry/SearchFilter";
// Icons
import { FiChevronsDown, FiChevronsUp, FiFilter, FiRefreshCw, FiSearch } from 'react-icons/fi';
// Helpers
import { CONTACT_TYPES_SCOPE, CONTACT_TYPE_DESCRIPTION } from "../libs/helpers";
import { v4 } from "uuid";
import { limitsQueryOptions } from "../../globals/libs/helpers";// Sub components -----------------------------------------------------------------------------------------------

// Constants -----------------------------------------------------------------------------------------------
const limits = limitsQueryOptions;

// Sub components -----------------------------------------------------------------------------------------------
function SearchContactList({ label, icon, placeholder = 'es: Mario Rossi', searchString, setSearchString, onPressEnter }) {
  return (
    <div className="w-full">
      <label className="mb-2 flex items-center w-full text-sm opacity-70 bold text-dark-100 dark:text-light-300">
        { icon && icon() }
        <span className="inline-block">{label}</span>
      </label>
      <input 
        type="text"
        value={searchString} 
        placeholder={placeholder}
        onChange={(e) => setSearchString(e.target.value)} 
        className="input w-full"
        onKeyPress={(e) => e.key === 'Enter' && onPressEnter()}
      />
    </div>
  )
}


// Main components -----------------------------------------------------------------------------------------------
export default function FiltersContacts({ contacts, queryOptions, runQuery, refresh }) {
  const [ searchable, setSearchable ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ vatNumber, setVatNumber ] = useState('');
  const jobs = contacts && Object.keys(contacts)
    .map(c_id => ({
      id: c_id,
      job: contacts[c_id].job,
      type: contacts[c_id].type,
      description: CONTACT_TYPES_SCOPE[contacts[c_id].type] === 'COMPANY'
        ? `Azienda (${contacts[c_id].job})`
        : `Dipendenti ${contacts[c_id].job}`
    }))
    .filter((opt, index, self) => {
      return opt.job !== null && opt.job !== '' && index === self.findIndex((t) => (
        t.job === opt.job && t.job === opt.job
      ))
    })
    .sort((a,b) => {
      if(a.description < b.description) { return -1; }
      if(a.description > b.description) { return 1; }
      return 1;
    });

  // Render
  return (
    <SimpleBar className="queryOptions" style={{ height: 100 }}>
      <aside className="flex items-end px-4 py-2 h-full">
        {/* Refresh contacts */}
        <ActionButton
          styles="btn--center btn-base-200 mr-2"
          icon={() => <FiRefreshCw />}
          onClick={refresh}
        />

        {/* Reorder contacts */}
        <ActionButton
          styles="btn--center btn-base-200 mr-2"
          icon={() => queryOptions.sortDirection === 'ASC' ? <FiChevronsDown /> : <FiChevronsUp />}
          onClick={() => runQuery({ key: "sortDirection", value: queryOptions.sortDirection === 'ASC' ? 'DESC' : 'ASC' })}
        />

        {/* Change type */}
        <div className="text-left mr-2">
          <ControlledSelector 
            id="contact-type" 
            value={queryOptions.type} 
            onChange={(value) => runQuery({ key: "type", value })}
            label={() => <>
              <FiSearch className="w-4 h-auto inline-block mr-2" />
              <span className="inline-block">Cerca per tipo</span>
            </>}
          >
            <option key={"ALL"} value={"ALL"}>
              Tutti
            </option>
            { Object.keys(CONTACT_TYPE_DESCRIPTION).map(ctyd => (
              <option key={v4()} value={ctyd}>
                {CONTACT_TYPE_DESCRIPTION[ctyd]}
              </option>
            ))}
          </ControlledSelector>
        </div>

        {/* Set search entry point: rubrica or network */}
        <div className="text-left ml-1 flex-1" style={{ minWidth: 200 }}>
          <div className="mr-2 flex-1">
            <SearchFilter
              label="Cerca per nome"
              icon={() => <FiSearch className="label-icon" />}
              setSearchString={setSearchable}
              searchString={searchable}
              onPressEnter={() => runQuery({ key: "searchable", value: searchable })}
            />
          </div>
        </div>

        <div className="text-left ml-1 flex-1" style={{ minWidth: 200 }}>
          <div className="mr-2 flex-1">
            <SearchFilter
              searchString={email}
              setSearchString={setEmail}
              placeholder="mariorossi@email.it"
              label="Filtra elenco per email"
              icon={() => <FiFilter className="label-icon" />}
              onPressEnter={() => runQuery({ key: "email", value: email })}
            />
          </div>
        </div>

        <div className="text-left ml-1 flex-1" style={{ minWidth: 200 }}>
          <div className="mr-2 flex-1">
            <SearchContactList
              searchString={vatNumber}
              setSearchString={setVatNumber}
              placeholder="es. 00000000000"
              label="Filtra elenco per P.IVA"
              icon={() => <FiFilter className="label-icon" />}
              onPressEnter={() => runQuery({ key: "vatNumber", value: vatNumber })}
            />
          </div>
        </div>
        
        <div className="flex flex-col text-left">
          <label className="label whitespace-nowrap mr-4"></label>
          <BasicSelector
            id="jobs"
            icon={() => <FiFilter className="label-icon" />}
            label="Filtra elenco per settore"
            value={queryOptions.job}
            onChange={value => runQuery({ key: "job", value })}
            styles="mr-2"
          >
            <option value={0}>Scegli</option>
            { jobs.map(job => (
              <option key={job.id} value={job.job}>{job.description}</option>
            ))}
          </BasicSelector>
        </div>

        <div className="flex flex-col text-left">
          <ControlledSelector
            id="contact-limit"
            label="N. risultati"
            value={queryOptions.limit}
            onChange={value => runQuery({ key: "limit", value })}
            styles="mr-2"
          >
            { limits.map(limit => <option key={limit} value={limit}>{limit}</option>)}
          </ControlledSelector>
        </div>
      </aside>
    </SimpleBar>
  )
}