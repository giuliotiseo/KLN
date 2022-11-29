import { FiEdit, FiX } from "react-icons/fi";
import { TbLink, TbMapPin } from "react-icons/tb";

const HeaderCheckpoint = ({
  checkpoint,
  dispatchEdit,
  handleRemoveCheckpoint,
  editEnabled,
  index
}) => {
  return (
    <header className="flex bg-secondary-300 bg-opacity-10 text-secondary-100 items-center justify-between text-lg mb-2 p-2 rounded-lg">
      <div className="flex items-center w-full">
        <span className="inline-flex flex-1">{checkpoint.name}</span>
        { checkpoint?.remote 
          ? <TbLink data-tip="Remoto" className="text-xl mr-2 text-secondary-200 dark:text-secondary-300" />
          : <TbMapPin data-tip="Personalizzato" className="text-xl mr-2 text-primary-200 dark:text-primary-300" />
        }
      </div>
      { editEnabled && (
        <div className="flex">
          <button
            className="btn text-secondary-100 hover:bg-opacity-20 hover:bg-secondary-300 hover:text-secondary-200 w-10 h-10 rounded-full flex items-center justify-center"
            onClick={() => dispatchEdit({ type: "overwrite", name: "object", value: {
              index,
              ...checkpoint,
            }})}
          >
            <FiEdit className="text-lg" />
          </button>
          <button
            onClick={() => handleRemoveCheckpoint(index)}
            className="btn text-secondary-100 hover:bg-opacity-20 hover:bg-secondary-300 hover:text-secondary-200 ml-1 w-10 h-10 rounded-full flex items-center justify-center"
          >
            <FiX className="text-lg" />
          </button>
        </div>
      )}
    </header>
  )
}

export default HeaderCheckpoint;