import {
  CongelatoIcon,
  FrescoIcon,
  SeccoIcon,
} from '../../../../globals/assets/icons';
import { forcedCapitalize } from '../../../../globals/libs/helpers';
import { OrderTrades } from '../../../../globals/libs/models';

const icons = {
  CONGELATO: <CongelatoIcon className="w-8 h-auto fill-current" />,
  FRESCO: <FrescoIcon className="w-8 h-auto fill-current" />,
  SECCO: <SeccoIcon className="w-8 h-auto fill-current" />,
}

/* - Components -------------------------------------------------------------------------------- */
const Trade = ({ selectedTrades, item, handleSelected }) => {
  return (
    <div className="mr-2">
      <label htmlFor={item} className={`inline-flex mb-4 text items-center text-center cursor-pointer ${selectedTrades.includes(item) ? 'text-primary-200 dark:text-primary-300 opacity-100' : 'text-dark-300 dark:text-light-100 text-opacity-30'}`}>
        { icons[item] }
        <span className={`block mt-1 px-2 rounded-full text-dark-300 dark:text-light-100 text-xl ${selectedTrades.includes(item) ? 'opacity-100' : 'opacity-50'}`}>
          {forcedCapitalize(item)}
        </span>
      </label>
      <input 
        className="fixed -left-full"
        id={item}
        name={item} 
        type="checkbox"
        checked={selectedTrades.includes(item) }
        onChange={() => handleSelected(item)}
      />
    </div>
  )
}

/* - Main Component -------------------------------------------------------------------------------- */
export default function CheckpointTradeSelector ({ selectedTrades, setSelectedTrades, label, availableTrades = [] }) {
  const tradesToRender = availableTrades?.length > 0
    ? availableTrades
    : Object.keys(OrderTrades)

  return (
    <div>
      { label && <p className="label">{label}</p> }
      <div className="flex mt-4 flex-wrap">
        {tradesToRender.map((item) => (
          <Trade 
            key={item} 
            item={item} 
            handleSelected={setSelectedTrades}
            selectedTrades={selectedTrades}
          />
        ))}
      </div>
    </div>
  );
}