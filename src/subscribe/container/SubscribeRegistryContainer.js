import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '../../globals/components/layout/Avatar';
import InputEmail from '../../globals/components/dataEntry_v2/InputEmail';
import InputTag from '../../globals/components/dataEntry_v2/InputTag';
import InputText from '../../globals/components/dataEntry_v2/InputText';
import SafeCol from '../../globals/components/layout/SafeCol'
import CompanyRegistryBasicInputs from '../components/CompanyRegistryBasicInputs';
import CompanyEmailFields from '../components/CompanyEmailFields';
import CompanyPhoneFields from '../components/CompanyPhoneFields';
import CompanyLocationFields from '../components/CompanyLocationFields';
import { addEmailToSubscribeCompany, addPhoneToSubscribeCompany, changeEmailSubscribeCompany, changePhoneSubscribeCompany, changeSubscribeCompany, changeSubscribeCompanyLocation, removeEmailToSubscribeCompany, removePhoneToSubscribeCompany, selectSubscribeCompany } from '../slices/subscribeSlice';

function SubscribeRegistryContainer() {
  const companyToSubscribe = useSelector(selectSubscribeCompany);
  
  // Callbacks
  const dispatch = useDispatch();
  const updateForm = useCallback((payload) => {
    dispatch(changeSubscribeCompany(payload));
  }, []);
  
  const updateFormLocation = useCallback((payload) => {
    dispatch(changeSubscribeCompanyLocation(payload));
  }, []);
  
  const { name, pec, uniqueCode, trades, emails, phones, location } = companyToSubscribe;

  return (
    <SafeCol id="CustomerRegistryFields">
      <div className='my-6 flex'>
        <Avatar
          name={name}
          size={100}
          stepColor={100}
        />
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 mr-3 gap-4 md:gap-8'>
        <section className='col-span-1'>
          <h2 className='title-3 mb-2'>Dati anagrafici azienda</h2>
          <CompanyRegistryBasicInputs
            company={companyToSubscribe}
            updateForm={updateForm}
            updateFormLocation={updateFormLocation}
            // validationError={validationError}
          />

          <InputEmail
            id="pec"
            label="Indirizzo PEC"
            className="flex-col w-full mb-2"
            contentClassName="w-full text-lg"
            inputClassName='input'
            labelClassName="block"
            placeholder=""
            value={pec}
            forceUpperCase={false}
            callback={updateForm}
            disabled={false}
          />

          <InputText
            id="uniqueCode"
            label="Codice univoco"
            className="flex-col w-full mb-2"
            contentClassName="w-full text-lg"
            inputClassName='input'
            labelClassName="block"
            value={uniqueCode}
            forceUpperCase={true}
            callback={updateForm}
            disabled={false}
          />
        </section>

        <section className='col-span-1'>
          <h2 className='title-3'>Settore di operatività</h2>
          <InputTag
            id="trades"
            tags={trades?.length > 0 ? trades.map(({ id, text }) => ({ id, text })) : []}
            className="flex-col w-full my-2"
            inputClassName="input"
            suggestions={[]}
            label="Indica l'ambito in cui opera l'azienda con delle parole chiave"
            labelClassName="whitespace-normal"
            callback={(value) => updateForm({ name: "trades", type: "custom", value })}
          />

          <CompanyEmailFields
            emails={emails}
            addField={() => dispatch(addEmailToSubscribeCompany())}
            remove={() => dispatch(removeEmailToSubscribeCompany())}
            onChange={(value) => dispatch(changeEmailSubscribeCompany(value))}
          />

          <CompanyPhoneFields
            phones={phones}
            addField={() => dispatch(addPhoneToSubscribeCompany())}
            remove={() => dispatch(removePhoneToSubscribeCompany())}
            onChange={(value) => dispatch(changePhoneSubscribeCompany(value))}
          />
        </section>

        <section className='col-span-1'>
          <h2 className='title-3'>Indirizzo filiale o sede legale</h2>
          <CompanyLocationFields
            updateFormLocation={updateFormLocation}
            location={location}
            address={location?.address || ""}
          />
        </section>
      </div>
    </SafeCol>
  )
}

export default SubscribeRegistryContainer
