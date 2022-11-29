import { useState } from 'react'
import { COMPANY_ROLES } from '../../libs/helpers';
import CustomerFinder from './CustomerFinder';
import Select from './Select'

const opposites = {
  sender: ["carrier", "receiver"],
  carrier: ["sender", "receiver"],
  receiver: ["sender", "receiver"],
  customer: ["carrier"]
}

function CompanyFinderByCustomer({
  className = "",
  label = "",
  companyRole,
  selectedCustomer,
  optionText = COMPANY_ROLES,
  callback,
  clear,
}) {
  const [ searchByRole, setSearchByRole ] = useState(opposites[companyRole][0]);
  if(!companyRole) return null;
  return (
    <div className={`flex items-center ${className}`}>
      { label && <p className="text-sm font-bold mx-2">{ label }</p> }
      <CustomerFinder
        callback={(value) => callback({ role: searchByRole, value })}
        selectedCustomer={selectedCustomer}
        clear={clear}
      />
    </div>
  )
}

export default CompanyFinderByCustomer
