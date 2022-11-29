import { useState } from "react";
import SimpleBar from 'simplebar-react';
// Custom components
import ActionButton from "../../globals/components/buttons/ActionButton";
import ControlledSelector from "../../globals/components/dataEntry/ControlledSelector";
import SearchFilter from "../../globals/components/dataEntry/SearchFilter";
// Helpers
import { limitsQueryOptions } from "../../globals/libs/helpers";
// Icons
import { FiChevronsDown, FiChevronsUp, FiFilter, FiRefreshCw, FiSearch } from 'react-icons/fi';
import { VehicleType, VehicleAvailability, VEHICLE_TYPE_DESCRIPTION, VEHICLE_STATUS_DESCRIPTION, BulkheadType, BULKHEAD_DESCRIPTION } from "../libs/helpers";

// Constants -----------------------------------------------------------------------------------------------
const limits = limitsQueryOptions;
const types = Object.keys(VehicleType);
const statuses = Object.keys(VehicleAvailability);
const bulkheads = Object.keys(BulkheadType);

// Filters employers -----------------------------------------------------------------------------------------------
export default function VehiclesListOptions({ styles = "", queryOptions, runQuery, refresh }) {
  const [ licensePlate, setLicensePlate ] = useState('');
  const [ brand, setBrand ] = useState('');

  return (
    <SimpleBar className="queryOptions" style={{ height: 100 }}>
      <aside className={`flex items-end px-4 py-2 h-full ${styles}`}>
        {/* Refresh contacts */}
        <ActionButton
          styles="btn--center btn-base-200 mr-2"
          icon={() => <FiRefreshCw />}
          onClick={refresh}
      />

        {/* Reorder contacts */}
        <div className="flex items-end flex-1">
          <ActionButton
            styles="btn--center btn-base-200 mr-2"
            icon={() => queryOptions.sortDirection === 'ASC' ? <FiChevronsDown /> : <FiChevronsUp />}
            onClick={() => runQuery({ key: "sortDirection", value: queryOptions.sortDirection === 'ASC' ? 'DESC' : 'ASC' })}
          />

                    
          { statuses && (
            <div className="flex flex-col text-left mr-2">
              <ControlledSelector 
                id="status" 
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
                { statuses.map(veh_status => (
                  <option key={veh_status} value={veh_status}>
                    {VEHICLE_STATUS_DESCRIPTION[veh_status]}
                  </option>
                ))}
              </ControlledSelector>
            </div>
          )}

          { types && (
            <div className="flex flex-col text-left mr-2">
              <ControlledSelector 
                id="vehicle-type" 
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
                { types.map(veh_type => (
                  <option key={veh_type} value={veh_type}>
                    {VEHICLE_TYPE_DESCRIPTION[veh_type]}
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
              label="Cerca targa"
              icon={() => <FiSearch className="label-icon" />}
              searchString={licensePlate}
              setSearchString={setLicensePlate}
              onPressEnter={() => runQuery({ key: "licensePlate", value: licensePlate })}
            />
          </div>
        </div>

        <div className="text-left mr-2 w-full" style={{ minWidth: 150 }}>
          <div className="flex-1">
            <SearchFilter
              searchString={brand}
              setSearchString={setBrand}
              placeholder="Brand mezzo"
              label="Filtra per brand"
              icon={() => <FiFilter className="label-icon" />}
              onPressEnter={() => runQuery({ key: "brand", value: brand })}
            />
          </div>
        </div>

        { bulkheads && (
            <div className="flex flex-col text-left mr-2">
              <ControlledSelector 
                id="bulkhead" 
                value={queryOptions.bulkhead} 
                onChange={(value) => runQuery({ key: "bulkhead", value })}
                label={() => <>
                  <FiFilter className="w-4 h-auto inline-block mr-2" />
                  <span className="inline-block">Filtra tipo paratia</span>
                </>}
              >
                <option key={"ALL"} value={"ALL"}>
                  Tutti
                </option>
                { bulkheads.map(bh => (
                  <option key={bh} value={bh}>
                    {BULKHEAD_DESCRIPTION[bh]}
                  </option>
                ))}
              </ControlledSelector>
            </div>
          )}

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