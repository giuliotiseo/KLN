import { FiPlus, FiLock, FiXCircle } from 'react-icons/fi'
import Button from '../../globals/components/buttons_v2/Button'
import InputPhone from '../../globals/components/dataEntry_v2/InputPhone'
import InputText from '../../globals/components/dataEntry_v2/InputText'

export default function CompanyPhoneFields({
  phones,
  addField = () => console.log("Default add email in <CompanyPhoneFields />"),
  onChange = () => console.log("Default onChange email in <CompanyPhoneFields />"),
  remove = () => console.log("Default remove email in <CompanyPhoneFields />"),
}) {
  return (
    <section className='mt-4'>
      <div className="flex items-center justify-between">
        <h2 className='title-3 mb-2 flex items-center'>
          Numeri di telefono
        </h2>
        { phones?.length <= 5 && (
          <Button
            onClick={addField}
            className="text-md hover:text-primary-200 dark:hover:text-primary-300"
            icon={<FiPlus className="text-xl" />}
          />
        )}
      </div>
      { phones?.length > 0 && phones.map((phone, index) => (
        <div key={index} className="flex mb-2">
          <Button
            icon={phones?.length <= 1 ? <FiLock /> : <FiXCircle />}
            onClick={() => phones?.length <= 1 ? null : remove(index)}
            disabled={phones?.length <= 1}
            className={`relative top-1 px-0 mr-4 items-start ${
              phones?.length <= 1
                ? ''
                : 'hover:text-red-500 dark:text-red-300'
            }`}
          />

          <div className='flex-1'>
            <InputText
              id={`phone-name-${index}`}
              label="Titolare"
              className="md:flex-col w-full mb-2"
              contentClassName="w-full text-lg"
              inputClassName='input'
              labelClassName="block flex-1 mr-2 md:mr-0 mb-0"
              callback={({ value }) => onChange({ index, target: "name", val: value })}
              value={phone.name}
              disabled={phone?.imported}
            />

            <InputPhone
              id={`phone-value-${index}`}
              label="Telefono"
              className="md:flex-col w-full mb-2"
              contentClassName="w-full text-lg"
              inputClassName='input'
              labelClassName="block flex-1 mr-2 md:mr-0 mb-0"
              placeholder=""
              value={phone.value}
              forceUpperCase={false}
              callback={({ value }) => onChange({ index, target: "value", val: value })}
              disabled={phone?.imported}
            />
          </div>
        </div>
      ))}
    </section>
  )
}
