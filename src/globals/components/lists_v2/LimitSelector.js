import { LIMITS_OPTIONS } from "../../libs/constants";

const LimitSelector = ({ limit, updateLimit, label = "N.Risultati", className = "" }) => {
  return (
    <div className={`inline-flex flex-col items-start p-2 rounded-r-full ${className}`}>
      <p className='text-sm font-bold px-1'>{ label }</p>
      <select
        className='bg-transparent text-left cursor-pointer outline-none'
        onChange={({ target: { value }}) => updateLimit(value)}
        value={limit}
      >
        { LIMITS_OPTIONS.map(limit => <option key={limit} value={limit}>{limit}</option>)}
      </select>
    </div>
  )
}
export default LimitSelector;