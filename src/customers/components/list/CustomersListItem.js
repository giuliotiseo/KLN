import { Link } from "react-router-dom";
import ListItem from '../../../globals/components/layout/ListItem'
import { CUSTOMER_TYPE_DESCRIPTION } from '../../../globals/libs/constants';
import CustomersListItemDropdown from "./CustomerListItemDropdown";

const CustomersListItem = ({ customer }) => {
  return (
    <ListItem className="justify-between p-4">
      <div>
        <h3 className='flex items-center gap-1 text-lg md:text-xl uppercase'>
          <Link to={`view?id=${customer.id}`} className="flex-1 hover:text-primary-200 dark:text-primary-300 transition-colors">
            <span>{ customer.name }</span>
          </Link>
          <span className="hidden md:inline-flex text-sm p-1 rounded-md border text-cyan-700 dark:text-cyan-500">{customer.company.vatNumber}</span>
        </h3>
        <p className='text-gray-400 dark:text-gray-500 mt-2'>{customer.company.location.city} ({customer.company.location.province})</p>
        <div className='flex mt-2 text-sm'>
          { customer.relationships.map(type => (
            <p key={type} className='chip-neutral text-dark-50 dark:text-light-100'>{ CUSTOMER_TYPE_DESCRIPTION[type] }</p>
          ))}
        </div>
      </div>
      
      <CustomersListItemDropdown id={customer.id} />
    </ListItem>
  )
}

export default CustomersListItem
