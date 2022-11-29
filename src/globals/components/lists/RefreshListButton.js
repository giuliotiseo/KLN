import { useState } from "react";
import { FiRefreshCw } from "react-icons/fi";

function RefreshListButton ({
  className = "",
  refresh = () => console.log("Default refresh in <RefreshListButton />")
}) {
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
      className={`transition-all p-2 rounded-full text-lg hover:text-primary-100 dark:hover:text-primary-300
        ${ rotate ? 'rotate-180' : ''}
        ${ className }
      `}
    >
      <FiRefreshCw />
    </button>
  )
}

export default RefreshListButton;