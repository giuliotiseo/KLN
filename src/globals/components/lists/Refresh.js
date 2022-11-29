import { useState } from "react";
import { FiRefreshCw } from "react-icons/fi";

function RefreshList ({ refresh }) {
  const [ rotate, setRotate ] = useState(false);

  const handleClick = () => {
    refresh();
    setRotate(true);
    const timer = setTimeout(() => {
      setRotate(false);
    }, 500);

    return () => clearTimeout(timer);
  }

  return (
    <button
      data-tip="Aggiorna elenco"
      onClick={handleClick}
      className={`transition-all bg-base-100 p-2 rounded-full border border-zinc-300 dark:border-2 dark:border-dark-100 absolute -left-2 -translate-x-full text-lg hover:text-primary-100 dark:hover:text-primary-300
        ${ rotate ? 'rotate-180' : ''}
      `}
    >
      <FiRefreshCw />
    </button>
  )
}

export default RefreshList;