import { useState, useEffect } from "react";
import SimpleBar from 'simplebar-react';
// Custom components
import ActionButton from "../../globals/components/buttons/ActionButton";
import ControlledSelector from "../../globals/components/dataEntry/ControlledSelector";
import MultipleSearchTextFilter from "../../globals/components/dataEntry/MultipleSearchTextFilter";
// Helpers
import { limitsQueryOptions } from "../../globals/libs/helpers";
import { SHIPMENT_METHOD_DESCRIPTION, ShipmentType } from "../../globals/libs/models";
import { processSearchTextValues } from "../libs/helpers";
// Icons
import { FiChevronsDown, FiChevronsUp, FiRefreshCw } from 'react-icons/fi';

// Constants -----------------------------------------------------------------------------------------------
const limits = limitsQueryOptions;
const allShipmentTypes = Object.keys(ShipmentType);

// Filters employers -----------------------------------------------------------------------------------------------
export default function OrdersListOptions({ styles = "", customStyles, queryOptions, runQuery, refresh, listType }) {
  const [ stamp, setStamp ] = useState('');
  const [ carrierName, setCarrierName ] = useState('');
  const [ senderName, setSenderName ] = useState('');
  const [ receiverName, setReceiverName ] = useState('');
  const [ createdAt, setCreatedAt ] = useState('');
  
  const resetTextFields = () => {
    setStamp('');
    setCarrierName('');
    setCreatedAt('');
  }

  useEffect(() => {
    resetTextFields();
  }, [listType]);

  const searchTextValues = processSearchTextValues({
    listType,
    senderState: [senderName, setSenderName],
    carrierState: [carrierName, setCarrierName],
    receiverState: [receiverName, setReceiverName],
    stampState: [stamp, setStamp],
    createdAtState: [createdAt, setCreatedAt],
    callback: runQuery,
  });

  return (
    <SimpleBar className="queryOptions sticky top-0 bg-base-100 z-10" style={{ height: 100 }}>
      <aside style={customStyles ? customStyles : {}} className={`flex items-end px-4 py-2 h-full ${styles}`}>
        {/* Refresh orders */}
        <ActionButton
          styles="btn--center btn-base-200 mr-2"
          icon={() => <FiRefreshCw />}
          onClick={refresh}
        />

        {/* Reorder orders */}
        <div className="flex items-end flex-1">
          <ActionButton
            styles="btn--center btn-base-200 mr-2"
            icon={() => queryOptions.sortDirection === 'ASC' ? <FiChevronsDown /> : <FiChevronsUp />}
            onClick={() => runQuery({ key: "sortDirection", value: queryOptions.sortDirection === 'ASC' ? 'DESC' : 'ASC' })}
          />

          { queryOptions.shipmentType && (
            <div className="flex flex-col text-left mr-2">
              <ControlledSelector 
                id="shipmentType" 
                value={queryOptions.shipmentType} 
                onChange={(value) => runQuery({ key: "shipmentType", value })}
                label={"Metodo di spedizione"}
              >
                <option key={"ALL"} value={"ALL"}>
                  Tutti
                </option>
                { allShipmentTypes.map(ship_type => (
                  <option key={ship_type} value={ship_type}>
                    {SHIPMENT_METHOD_DESCRIPTION[ship_type]}
                  </option>
                ))}
              </ControlledSelector>
            </div>
          )}
        </div>

        {/* Set search entry point: rubrica or network */}
        <div className="text-left mr-2 w-full" style={{ minWidth: 150 }}>
          <div className="flex-1">
            <MultipleSearchTextFilter
              options={searchTextValues}
              selectedOption="id"
              label={"Cerca per: "}
              reset={resetTextFields}
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