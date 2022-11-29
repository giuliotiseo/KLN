import { FiCheck } from 'react-icons/fi';
import { DANGER_LABELS } from '../../libs/constants';

const WarningsPicker = ({
  order,
  updateForm
}) => {
  const { warnings } = order;
  return (
    <div className="flex flex-col mt-6">
      <h4 className="title-5 mb-4 uppercase text-gray-500 dark:text-gray-600 border-b">Etichette di sicurezza</h4>

      <ul className="mt-2 flex justify-start flex-wrap">
        { Object.keys(DANGER_LABELS).map(dl => (
          <li 
            key={DANGER_LABELS[dl].img}
            className={`flex items-center my-2 mr-2 cursor-pointer ${warnings.includes(dl) ? "opacity-100" : "opacity-50"} group`}
            onClick={() => updateForm({ type: "warnings", value: dl, name: "warnings" })}
          >
            <div className="relative w-[40px] h-[40px]">
              { warnings.includes(dl) && (
                <span className="absolute left-0 top-0 flex items-center justify-center z-10 w-6 h-6 rounded-full overflow-hidden bg-emerald-500 -translate-x-2 -translate-y-2">
                  <FiCheck className="text-light-300" />
                </span>
              )}
              <img src={DANGER_LABELS[dl].img} alt={DANGER_LABELS[dl].text} className="w-full rounded-full overflow-hidden border-2 border-transparent dark:border-transparent group-hover:border-light-50 dark:group-hover:border-dark-50" />
            </div>
            <p className="ml-2">{DANGER_LABELS[dl].text}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default WarningsPicker;