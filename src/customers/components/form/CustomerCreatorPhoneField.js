import { FiLock, FiPhone, FiPlus } from 'react-icons/fi'
import { RiDeleteBack2Line } from 'react-icons/ri'
import Button from '../../../globals/components/buttons_v2/Button'
import InputPhone from '../../../globals/components/dataEntry_v2/InputPhone'
import InputText from '../../../globals/components/dataEntry_v2/InputText'

export default function CustomerCreatorPhoneField({
  phones,
  addField = () => console.log("Default add phone in <CustomerCreatorPhoneField />"),
  onChange = () => console.log("Default onChange phone in <CustomerCreatorPhoneField />"),
  remove = () => console.log("Default remove phone in <CustomerCreatorPhoneField />"),
}) {
  return (
    <section className="mt-4">
      <div className="flex items-center justify-between">
        <h2 className='title-3 mb-2 flex items-center'>
          <FiPhone className="mr-2" />
          <span>Numeri di telefono</span>
        </h2>
        { phones?.length <= 5 && (
          <Button
            onClick={addField}
            className="text-md hover:text-primary-200 dark:hover:text-primary-300"
            icon={<FiPlus className="text-xl" />}
          />
        )}
      </div>

      { phones?.length > 0 && phones.map((ph, index) => (
        <div key={index} className="flex flex-col md:flex-row gap-2 py-2 px-4 bg-base-100 rounded-lg mb-2">
          <InputText
            id={`phone-name-${index}`}
            label="Titolare"
            className="flex-row md:flex-col w-full mb-2"
            contentClassName="w-full text-lg"
            inputClassName='input'
            labelClassName="block flex-1 mr-2 md:mr-0 mb-0"
            callback={({ value }) => onChange({ index, target: "name", val: value })}
            value={ph.name}
            disabled={ph?.imported}
          />

          <InputPhone
            id={`phone-value-${index}`}
            label="Telefono"
            className="flex-row md:flex-col w-full mb-2"
            contentClassName="w-full text-lg"
            inputClassName='input'
            labelClassName="block flex-1 mr-2 md:mr-0 mb-0"
            value={ph.value}
            forceUpperCase={false}
            callback={({ value }) => onChange({ index, target: "value", val: value })}
            disabled={ph?.imported}
          />

          <Button
            icon={ph.imported ? <FiLock /> : <RiDeleteBack2Line />}
            onClick={() => ph.imported ? null : remove(index)}
            disabled={ph.imported}
            className={`relative top-1 px-0 ${
              ph?.imported
                ? ''
                : 'hover:text-red-500 dark:text-red-300'
            }`}
          />
        </div>
      ))}
    </section>
  )
}
