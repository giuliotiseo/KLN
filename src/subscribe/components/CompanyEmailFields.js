import { FiPlus, FiLock, FiXCircle } from 'react-icons/fi'
import Button from '../../globals/components/buttons_v2/Button'
import InputEmail from '../../globals/components/dataEntry_v2/InputEmail'
import InputText from '../../globals/components/dataEntry_v2/InputText'

export default function CompanyEmailFields({
  emails,
  addField = () => console.log("Default add email in <CompanyEmailFields />"),
  onChange = () => console.log("Default onChange email in <CompanyEmailFields />"),
  remove = () => console.log("Default remove email in <CompanyEmailFields />"),
}) {
  return (
    <section className='mt-4'>
      <div className="flex items-center justify-between">
        <h2 className='title-3 mb-2 flex items-center'>
          Indirizzi di posta
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
        <div key={index} className="flex mb-2">
          <Button
            icon={emails?.length <= 1 ? <FiLock /> : <FiXCircle />}
            onClick={() => emails?.length <= 1 ? null : remove(index)}
            disabled={emails?.length <= 1}
            className={`relative top-1 px-0 mr-4 items-start ${
              emails?.length <= 1
                ? ''
                : 'hover:text-red-500 dark:text-red-300'
            }`}
          />

          <div className='flex-1'>
            <InputText
              id={`email-name-${index}`}
              label="Titolare"
              className="md:flex-col w-full mb-2"
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
              className="md:flex-col w-full mb-2"
              contentClassName="w-full text-lg"
              inputClassName='input'
              labelClassName="block flex-1 mr-2 md:mr-0 mb-0"
              placeholder=""
              value={em.value}
              forceUpperCase={false}
              callback={({ value }) => onChange({ index, target: "value", val: value })}
              disabled={em?.imported}
            />
          </div>
        </div>
      ))}
    </section>
  )
}
