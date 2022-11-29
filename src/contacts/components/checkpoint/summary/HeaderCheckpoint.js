import { FiEdit, FiX } from "react-icons/fi";

const HeaderCheckpoint = ({ checkpoint, dispatchEdit, handleRemoveCheckpoint, editEnabled, index }) => (
  <header className="flex justify-between text-lg mb-2">
    <span>{checkpoint.name}</span>
    { editEnabled && (
      <div className="flex">
        <button
          className="btn btn-primary-outline w-8 h-8 rounded-full text-sm flex items-center justify-center"
          onClick={() => dispatchEdit({ type: "overwrite", name: "object", value: {
            index,
            ...checkpoint,
          }})}
        >
          <FiEdit />
        </button>
        <button
          onClick={() => handleRemoveCheckpoint(index)}
          className="btn btn-primary-outline ml-1 w-8 h-8 rounded-full text-sm flex items-center justify-center"
        >
          <FiX />
        </button>
      </div>
    )}
  </header>
)

export default HeaderCheckpoint;