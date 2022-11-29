import { limitsQueryOptions } from "../../libs/helpers";

const LimitSelector = ({ limit, updateLimit, label = "N.Risultati" }) => {
  return (
    <div className='inline-flex flex-col items-start p-2 rounded-r-full'>
      <p className='text-sm font-bold px-1'>{ label }</p>
      <select
        className='bg-transparent text-left cursor-pointer outline-none'
        onChange={({ target: { value }}) => updateLimit(value)}
        value={limit}
      >
        { limitsQueryOptions.map(limit => <option key={limit} value={limit}>{limit}</option>)}
      </select>
    </div>
  )
}
export default LimitSelector;