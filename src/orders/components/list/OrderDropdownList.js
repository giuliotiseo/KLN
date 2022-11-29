import React from 'react'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useSearchParams } from 'react-router-dom';
import Button from '../../../globals/components/buttons_v2/Button';
import Dropdown, { DropdownList, DropdownListItem } from '../../../globals/components/navigation/Dropdown'

const COMPANY_TYPE_LABEL = {
  CARRIER: "Lista vettore",
  SENDER: "Lista mittente",
  RECEIVER: "Lista destinatario",
  PICKUP_STORAGE: "Lista ritiri",
  DELIVERY_STORAGE: "Lista consegne",
}

function OrderDropdownList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const statusType = searchParams.get('status');
  const companyType = searchParams.get('company');

  if(!companyType) return null;

  return (
    <Dropdown
      id="orders-menu-list-type-dropdown"
      navItem={<div className="btn-ghost p-0 flex items-center mr-2"><FiChevronDown className="text-lg mr-2" /> {COMPANY_TYPE_LABEL[companyType]}</div>}
      navItemOpen={<div className="btn-ghost p-0 flex items-center"><FiChevronUp className="text-lg mr-2" /> Chiudi</div>}
      position="right-0"
      className={`bg-inverse-300 border border-light-100 dark:border-dark-100`}
    >
      <DropdownList id="orders-menu-list-type-dropdown-list">
        <DropdownListItem className="flex items-center justify-end contact-menu-dropdown-list-item-1 hover:bg-base-200">
          <Button
            text="Lista vettore"
            className={`${companyType === "CARRIER" ? 'font-bold text-primary-200 dark:text-primary-300' : ''}`}
            onClick={() => setSearchParams({
              status: statusType,
              company: "CARRIER"
            })}
          /> 
        </DropdownListItem>
        <DropdownListItem className="flex items-center justify-end contact-menu-dropdown-list-item-1 hover:bg-base-200">
          <Button
            text="Lista mittente"
            className={`${companyType === "SENDER" ? 'font-bold text-primary-200 dark:text-primary-300' : ''}`}
            onClick={() => setSearchParams({
              status: statusType,
              company: "SENDER"
            })}
          /> 
        </DropdownListItem>
        <DropdownListItem className="flex items-center justify-end contact-menu-dropdown-list-item-1 hover:bg-base-200">
          <Button
            text="Lista destinatario"
            className={`${companyType === "RECEIVER" ? 'font-bold text-primary-200 dark:text-primary-300' : ''}`}
            onClick={() => setSearchParams({
              status: statusType,
              company: "RECEIVER"
            })}
          /> 
        </DropdownListItem>
        <DropdownListItem className="flex items-center justify-end contact-menu-dropdown-list-item-1 hover:bg-base-200">
          <Button
            text="Lista ritiri"
            className={`${companyType === "PICKUP_STORAGE" ? 'font-bold text-primary-200 dark:text-primary-300' : ''}`}
            onClick={() => setSearchParams({
              status: statusType,
              company: "PICKUP_STORAGE"
            })}
          /> 
        </DropdownListItem>
        <DropdownListItem className="flex items-center justify-end contact-menu-dropdown-list-item-1 hover:bg-base-200">
          <Button
            text="Lista consegne"
            className={`${companyType === "DELIVERY_STORAGE" ? 'font-bold text-primary-200 dark:text-primary-300' : ''}`}
            onClick={() => setSearchParams({
              status: statusType,
              company: "DELIVERY_STORAGE"
            })}
          /> 
        </DropdownListItem>
      </DropdownList>
    </Dropdown>
  )
}

export default OrderDropdownList
