import { useState } from "react";
import { COMPANY_ROLES } from "../../libs/helpers";
import ActionButton from "../buttons/ActionButton";
import { FiSearch } from "react-icons/fi";

export default function InputSearchByCompanyRole({
  className = "",
  selectClassName = "",
  contentClassName = "",
  callback,
  loading,
}) {
  const [ value, setValue ] = useState(0);
  const [ search, setSearch ] = useState("")

  return (
    <div className={`flex flex-col lg:flex-row ${className}`}>
      <select
        value={value || ""}
        onChange={({ target: { value }}) => setValue(value)}
        className={`${selectClassName} bg-transparent outline-none`}
      >
        { Object.keys(COMPANY_ROLES).map((role, index) => (
          <option key={index} value={index}>{COMPANY_ROLES[role]}</option>
        ))}
      </select>

      <div className={`flex items-center ${contentClassName}`}>
        <input
          type="text"
          className="input w-full" 
          value={search}
          onChange={({ target: { value } }) => setSearch(value)}
          onKeyPress={(e) => e.key === 'Enter' && callback(Object.keys(COMPANY_ROLES)[value], search)}
        />

        <ActionButton
          icon={() => <FiSearch />}
          styles={`btn-primary ml-2`}
          loading={loading}
          onClick={() => callback(Object.keys(COMPANY_ROLES)[value], search)}
        />
      </div>
    </div>
  )
}