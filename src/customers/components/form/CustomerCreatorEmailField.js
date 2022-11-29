import { FiMail, FiPlus, FiLock } from 'react-icons/fi'
import { RiDeleteBack2Line } from 'react-icons/ri'
import Button from '../../../globals/components/buttons_v2/Button'
import InputEmail from '../../../globals/components/dataEntry_v2/InputEmail'
import InputText from '../../../globals/components/dataEntry_v2/InputText'

export default function CustomerCreatorEmailField({
  emails,
  addField = () => console.log("Default add email in <CustomerCreatorEmailField />"),
  onChange = () => console.log("Default onChange email in <CustomerCreatorEmailField />"),
  remove = () => console.log("Default remove email in <CustomerCreatorEmailField />"),
}) {
  return (
    <section>
      <div className="flex items-center justify-between">
        <h2 className='title-3 mb-2 flex items-center'>
          <FiMail className="mr-2" />
          <span>Indirizzi di posta</span>
        </h2>
        { emails?.length <= 5 && (
          <Button
            onClick={addField}
            className="text-md hover:text-primary-200 dark:hover:text-primary-300"
            icon={<FiPlus className="text-xl" />}
          />
        )}
      </div>
      { emails?.length > 0 && emails.map((em, index) => (
        <div key={index} className="flex flex-col md:flex-row gap-2 py-2 px-4 bg-base-100 rounded-lg mb-2">
          <InputText
            id={`email-name-${index}`}
            label="Titolare"
            className="flex-row md:flex-col w-full mb-2"
            contentClassName="w-full text-lg"
            inputClassName='input'
            labelClassName="block flex-1 mr-2 md:mr-0 mb-0"
            callback={({ value }) => onChange({ index, target: "name", val: value })}
            value={em.name}
            disabled={em?.imported}
          />

          <InputEmail
            id={`email-value-${index}`}
            label="Email"
            className="flex-row md:flex-col w-full mb-2"
            contentClassName="w-full text-lg"
            inputClassName='input'
            labelClassName="block flex-1 mr-2 md:mr-0 mb-0"
            value={em.value}
            forceUpperCase={false}
            callback={({ value }) => onChange({ index, target: "value", val: value })}
            disabled={em?.imported}
          />

          <Button
            icon={em.imported ? <FiLock /> : <RiDeleteBack2Line />}
            onClick={() => em.imported ? null : remove(index)}
            disabled={em.imported}
            className={`relative top-1 px-0 ${
              em?.imported
                ? ''
                : 'hover:text-red-500 dark:text-red-300'
            }`}
          />
        </div>
      ))}
    </section>
  )
}
