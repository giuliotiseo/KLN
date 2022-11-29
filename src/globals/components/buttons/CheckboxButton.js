import { FiCheckSquare } from "react-icons/fi"
import ActionButton from "./ActionButton"

export default function CheckboxButton({ text, onClick, value, styles }) {
  return (
    <div className={`relative ${styles} flex items-center`}>
      <span
        className="cursor-pointer" 
        onClick={onClick}
      >
        {text}
      </span>
      <ActionButton
        styles={`btn--center mr-2 ${value ? 'btn-primary' : 'btn-off'}`}
        icon={() => <FiCheckSquare />}
        onClick={onClick}
      />
    </div>
  )
}