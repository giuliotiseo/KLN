import InputEmail from '../../../globals/components/dataEntry_v2/InputEmail';
import InputText from '../../../globals/components/dataEntry_v2/InputText';
import Avatar from '../../../globals/components/layout/Avatar'
import SafeCol from '../../../globals/components/layout/SafeCol'
import InputTag from '../../../globals/components/dataEntry_v2/InputTag';
import CustomerRegistryInputs from './CustomerRegistryInputs';
import CheckboxGroup from '../../../globals/components/dataEntry_v2/CheckboxGroup';
import { CUSTOMER_TYPE_DESCRIPTION } from '../../../globals/libs/constants';
import CustomerRegistrySummary from './CustomerRegistrySummary';
import { removeSpacesFromString } from '../../../globals/libs/helpers';

export default function CustomerRegistryFields({
  selectedCustomer,
  customer,
  updateForm,
  validationError,
  enabledEdit = true,
}) {
  const { name, pec, logo, uniqueCode, relationships, trades } = customer;
  return (
    <SafeCol id="CustomerRegistryFields">
      <div className='mr-3'>
        <div className='my-6 flex'>
          <Avatar
            name={name || selectedCustomer?.name || null}
            size={100}
            stepColor={100}
            src={logo}
          />
        </div>

        <section>
          <h2 className='title-3 mb-2'>Dati anagrafici azienda</h2>
          { !selectedCustomer && enabledEdit
            ? <CustomerRegistryInputs customer={customer} updateForm={updateForm} validationError={validationError} />
            : <CustomerRegistrySummary customer={selectedCustomer || customer} />
          }

          { selectedCustomer?.pec
            ? <p className='my-4 p-2 bg-base-100 rounded-md'>
                <span className='block font-bold'>PEC</span>
                <span>{selectedCustomer.pec}</span>
              </p>
            : <InputEmail
                id="pec"
                label="Indirizzo PEC"
                className="flex-col w-full mb-2"
                contentClassName="w-full text-lg"
                inputClassName='bg-light-100 dark:bg-dark-100'
                labelClassName="block"
                value={pec}
                forceUpperCase={false}
                callback={updateForm}
                disabled={false}
              />
          }

          { selectedCustomer?.uniqueCode
            ? <p className='my-4 p-2 bg-base-100 rounded-md'>
                <span className='block font-bold'>Codice univoco</span>
                <span>{selectedCustomer.uniqueCode}</span>
              </p>
            : <InputText
                id="uniqueCode"
                label="Codice univoco"
                className="flex-col w-full mb-2"
                contentClassName="w-full text-lg"
                inputClassName='bg-light-100 dark:bg-dark-100'
                labelClassName="block"
                value={uniqueCode}
                forceUpperCase={true}
                callback={updateForm}
                disabled={false}
              />
          }
        </section>

        <section className='mt-8'>
          <h2 className='title-3 mt-4'>Settore di operatività</h2>
          { selectedCustomer?.trades?.length > 0 && (
            <ul>
              { selectedCustomer.trades.map(trade => (
                <li className='inline-block chip-neutral mb-2' key={trade}>{trade}</li>
              ))}
            </ul>
          )}

          <InputTag
            id="trades"
            tags={trades.map(trade => ({ id: removeSpacesFromString(trade.toLowerCase()), text: trade }))}
            className="flex-col w-full mb-4"
            suggestions={[]}
            label="Indica l'ambito in cui opera questa azienda"
            labelClassName="whitespace-normal"
            callback={(value) => updateForm({ name: "trades", type: "custom", value })}
          />

          <h2 className='title-3 mt-8 block'>Rapporto con il cliente</h2>
          <CheckboxGroup
            label="Seleziona almeno un valore"
            optionsType="object"
            options={CUSTOMER_TYPE_DESCRIPTION}
            values={relationships || []}
            onChange={(value) => updateForm({ name: "relationships", type: "custom", value })}
            optionClassName="text-lg mr-2 mb-2 block w-full"
            capitalizeText={true}
            checkboxContainerClassName="flex flex-col"
          />
        </section>
      </div>
    </SafeCol>
  )
}
