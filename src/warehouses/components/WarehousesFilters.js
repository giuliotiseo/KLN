import { useState } from 'react';
// Components
import SimpleBar from 'simplebar-react';
import ActionButton from "../../globals/components/buttons/ActionButton";
import ControlledSelector from "../../globals/components/dataEntry/ControlledSelector";
import SearchFilter from "../../globals/components/dataEntry/SearchFilter";
// Helpers
import { WAREHOUSE_BUILDING_TYPE, WAREHOUSE_SCOPE, WAREHOUSE_SPECIALIZATION, WAREHOUSE_STATUS } from "../libs/helpers";
import { v4 } from "uuid";
// Icons
import { FiChevronsDown, FiChevronsUp, FiFilter, FiRefreshCw, FiSearch } from "react-icons/fi";
import { capitalize, limitsQueryOptions } from '../../globals/libs/helpers';

export default function WarehousesFilters({ queryOptions, storekeepers, runQuery, refresh }) {
  const [ searchable, setSearchable ] = useState('');

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

        {/* Change status */}
        <div className="text-left mr-2">
          <ControlledSelector
            id="warehouse-status" 
            value={queryOptions.status} 
            onChange={(value) => runQuery({ key: "status", value })}
            label={() => <>
              <FiSearch className="w-4 h-auto inline-block mr-2" />
              <span className="inline-block">Cerca per stato</span>
            </>}
          >
            <option key={"ALL"} value={"ALL"}>
              Tutti
            </option>
            { Object.keys(WAREHOUSE_STATUS).map(status => (
              <option key={v4()} value={status}>
                {WAREHOUSE_STATUS[status].label}
              </option>
            ))}
          </ControlledSelector>
        </div>

        {/* Set search entry point: rubrica or network */}
        <div className="text-left flex-1" style={{ minWidth: 200 }}>
          <div className="mr-2 flex-1">
            <SearchFilter
              icon={() => <FiSearch className="label-icon" />}
              label="Cerca per nome"
              placeholder="Es. Deposito di Roma"
              setSearchString={setSearchable}
              searchString={searchable}
              onPressEnter={() => runQuery({ key: "searchable", value: searchable })}
            />
          </div>
        </div>

        {/* Change type */}
        <div className="text-left mr-2">
          <ControlledSelector
            id="warehouse-type" 
            value={queryOptions.type} 
            onChange={(value) => runQuery({ key: "type", value })}
            label={() => <>
              <FiFilter className="w-4 h-auto inline-block mr-2" />
              <span className="inline-block">Filtra tipo struttura</span>
            </>}
          >
            <option key={"ALL"} value={"ALL"}>
              Tutti
            </option>
            { Object.keys(WAREHOUSE_BUILDING_TYPE).map(b_type => (
              <option key={v4()} value={b_type}>
                {capitalize(WAREHOUSE_BUILDING_TYPE[b_type].replace("Magazzino ", ""))}
              </option>
            ))}
          </ControlledSelector>
        </div>

        {/* Change scope */}
        <div className="text-left mr-2">
          <ControlledSelector
            id="warehouse-scope" 
            value={queryOptions.scope} 
            onChange={(value) => runQuery({ key: "scope", value })}
            label={() => <>
              <FiFilter className="w-4 h-auto inline-block mr-2" />
              <span className="inline-block">Filtra uso</span>
            </>}
          >
            <option key={"ALL"} value={"ALL"}>
              Tutti
            </option>
            { Object.keys(WAREHOUSE_SCOPE).map(w_scope => (
              <option key={v4()} value={w_scope}>
                {WAREHOUSE_SCOPE[w_scope]}
              </option>
            ))}
          </ControlledSelector>
        </div>

        {/* Change specialization */}
        <div className="text-left mr-2">
          <ControlledSelector
            id="warehouse-specialization" 
            value={queryOptions.specialization} 
            onChange={(value) => runQuery({ key: "specialization", value })}
            label={() => <>
              <FiFilter className="w-4 h-auto inline-block mr-2" />
              <span className="inline-block">Filtra per specializzazione</span>
            </>}
          >
            <option key={"ALL"} value={"ALL"}>
              Tutti
            </option>
            { Object.keys(WAREHOUSE_SPECIALIZATION).map(w_spec => (
              <option key={v4()} value={w_spec}>
                {capitalize(WAREHOUSE_SPECIALIZATION[w_spec].replace('Magazzino ',''))}
              </option>
            ))}
          </ControlledSelector>
        </div>

        {/* Change contactId */}
        <div className="text-left mr-2">
          <ControlledSelector
            id="warehouse-contactId" 
            value={queryOptions.contactId} 
            onChange={(value) => runQuery({ key: "contactId", value })}
            label={() => <>
              <FiFilter className="w-4 h-auto inline-block mr-2" />
              <span className="inline-block">Filtra per magazziniere</span>
            </>}
            styles="w-full"
          >
            <option key={"ALL"} value={"ALL"}>
              Tutti
            </option>
            { Object.keys(storekeepers).map(sk_id => (
              <option key={sk_id} value={sk_id}>
                {storekeepers[sk_id].name}
              </option>
            ))}
          </ControlledSelector>
        </div>

        <div className="flex flex-col text-left">
          <ControlledSelector
            id="contact-limit"
            label="N. risultati"
            value={queryOptions.limit}
            onChange={value => runQuery({ key: "limit", value })}
            styles="mr-2"
          >
            { limitsQueryOptions.map(limit => <option key={limit} value={limit}>{limit}</option>)}
          </ControlledSelector>
        </div>
      </aside>
    </SimpleBar>
  )
}