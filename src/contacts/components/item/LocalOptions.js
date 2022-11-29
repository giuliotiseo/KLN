import { Link, useLocation } from 'react-router-dom';
import { RiMailSendLine, RiEditBoxLine, RiChatDeleteLine } from 'react-icons/ri';
import { FiRefreshCw } from 'react-icons/fi';
import { CONTACT_TYPES_SCOPE } from '../../libs/helpers';

const LocalOptions = ({ contact, setModal }) => {
  const location = useLocation();
  const rootPath = 
    location.pathname === '/'
      ? 'company'
      : location.pathname.split('/')[1];
  
  return (
    <div className="flex items-center">
      <ul className="text-2xl">
        { !contact.sync && (
          <li data-tip="Invita" className="inline-block mr-4 opacity-50 hover:opacity-100">
            <button onClick={() => setModal('invite')} className="hover:text-primary-200 dark:hover:text-primary-300">
              <RiMailSendLine />
            </button>
          </li>
        )}

        <li data-tip="Sincronizza" className="inline-block mr-4 opacity-50 hover:opacity-100">
          <button onClick={() => setModal('sync')} className="hover:text-primary-200 dark:hover:text-primary-300">
            <FiRefreshCw />
          </button>
        </li>

        <li data-tip="Modifica" className="inline-block mr-4 opacity-50 hover:opacity-100">
          <Link
            className="hover:text-primary-200 dark:hover:text-primary-300"
            to={`/contacts/edit/${(CONTACT_TYPES_SCOPE[contact.type]).toLowerCase()}?id=${contact.id}&from=${rootPath}`}>
              <RiEditBoxLine />
          </Link>
        </li>
        
          <button onClick={() => setModal('delete')} className="hover:text-red-500 dark:hover:text-primary-300">
            <li data-tip="Elimina" className="inline-block mr-4 opacity-50 hover:opacity-100"><RiChatDeleteLine /></li>
          </button>
      </ul>
    </div>
  )
}

export default LocalOptions;