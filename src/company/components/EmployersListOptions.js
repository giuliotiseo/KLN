import { useState } from "react";
import SimpleBar from 'simplebar-react';
// Custom components
import ActionButton from "../../globals/components/buttons/ActionButton";
import ControlledSelector from "../../globals/components/dataEntry/ControlledSelector";
import SearchFilter from "../../globals/components/dataEntry/SearchFilter";
// Helpers
import { CONTACT_TYPES, CONTACT_TYPE_DESCRIPTION } from "../../contacts/libs/helpers";
import { limitsQueryOptions } from "../../globals/libs/helpers";
// Icons
import { FiChevronsDown, FiChevronsUp, FiMail, FiRefreshCw, FiSearch } from 'react-icons/fi';


// Constants -----------------------------------------------------------------------------------------------
const limits = limitsQueryOptions;
const types = Object.keys(CONTACT_TYPES.users);

// Filters employers -----------------------------------------------------------------------------------------------
export default function EmployersListOptions({ styles, queryOptions, runQuery, refresh }) {
  const [ searchable, setSearchable ] = useState('');
  const [ email, setEmail ] = useState('');

  return (
    <SimpleBar className="queryOptions" style={{ height: 100 }}>
      <aside className={`flex items-end ${styles}`}>
        {/* Refresh contacts */}
        <ActionButton
          styles="btn--center btn-base-200 mr-1 ml-2"
          icon={() => <FiRefreshCw />}
          onClick={refresh}
        />

        {/* Reorder contacts */}
        <div className="flex items-end flex-1">
          <ActionButton
            styles="btn--center btn-base-200 mr-1"
            icon={() => queryOptions.sortDirection === 'ASC' ? <FiChevronsDown /> : <FiChevronsUp />}
            onClick={() => runQuery({ key: "sortDirection", value: queryOptions.sortDirection === 'ASC' ? 'DESC' : 'ASC' })}
          />

          { types && (
            <div className="flex flex-col text-left mr-1">
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
                { types.map(emp_type => (
                  <option key={emp_type} value={emp_type}>
                    {CONTACT_TYPE_DESCRIPTION[emp_type]}
                  </option>
                ))}
              </ControlledSelector>
            </div>
          )}
        </div>

        {/* Set search entry point: rubrica or network */}
        <div className="text-left mr-2 w-full" style={{ minWidth: 150 }}>
          <div className="flex-1">
            <SearchFilter
              label="Cerca per nome"
              icon={() => <FiSearch className="label-icon" />}
              searchString={searchable}
              setSearchString={setSearchable}
              onPressEnter={() => runQuery({ key: "searchable", value: searchable })}
            />
          </div>
        </div>

        <div className="text-left mr-2 w-full" style={{ minWidth: 150 }}>
          <div className="flex-1">
            <SearchFilter
              searchString={email}
              setSearchString={setEmail}
              placeholder="mariorossi@email.it"
              label="Filtra per email"
              icon={() => <FiMail className="label-icon" />}
              onPressEnter={() => runQuery({ key: "email", value: email })}
            />
          </div>
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