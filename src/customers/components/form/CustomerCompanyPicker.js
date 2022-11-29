import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { FiEdit } from 'react-icons/fi';
import InputCheckbox from '../../../globals/components/dataEntry_v2/InputCheckbox';
import Dialog, { DialogActions, DialogContent } from '../../../globals/components/layout/Dialog';
import { HiOutlineDocumentSearch } from "react-icons/hi";
import { changeCreatorSelectedCustomer } from '../../slices/customerCreatorSlice';

export default function CustomerCompanyPicker({
  selectedCustomer,
  vatNumber,
  showForm,
  companies,
  open,
  close
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    if(selectedCustomer) {
      showForm(true);
    }
  }, [selectedCustomer, showForm]);

  if(!companies) return null;

  const dialogTitle = <span className='flex flex-col items-center'>
    <HiOutlineDocumentSearch className='text-4xl mb-2 text-gray-400 dark:text-gray-500' />
    <span>Hai cercato {vatNumber}</span>
  </span>

  const buttons = [{
    className: "",
    onClick: () => showForm(true),
    text: "Aggiungi manualmente",
    icon: <FiEdit />,
  }];


  return (
    <Dialog open={open} close={close}>
      <DialogContent
        title={dialogTitle}
        topMessage={`La ricerca ha prodotto i seguenti risultati: `}
        topMessageClassName="mt-4"
        bottomMessage={`L'azienda che cerchi non è presente?`}
      >
        <div className='mt-4 w-full p-2 text-center rounded-md'>
          <ul className='my-2 p-2 text-2xl'>
            { companies.map(company => (
              <li key={company.id} className="flex flex-col items-center justify-center pb-2 border-b border-light-300">
                <div className='flex items-center'>
                  <InputCheckbox
                    value={company.id}
                    label={null}
                    id={"selectedCompany"}
                    name="selectedCompany"
                    initialValues={selectedCustomer?.id ? [selectedCustomer.id] : []}
                    className='mr-0'
                    inputClassName='cursor-pointer'
                    callback={() => dispatch(changeCreatorSelectedCustomer(company.id))}
                  />
                  <span className='block text-secondary-200 dark:text-secondary-300'>{company.name}</span>
                </div>

                <span className='block text-base text-gray-500 dark:text-gray-400'>{company.address}</span>
              </li>
            ))}
          </ul>
        </div>
      </DialogContent>

      <DialogActions buttons={buttons} />
      <p className='text-xs mt-2'>*Ricorda che non è possibile creare più aziende con gli stessi dati anagrafici</p>
    </Dialog>
  )
}
