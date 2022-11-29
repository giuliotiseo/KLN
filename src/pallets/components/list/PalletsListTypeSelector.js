const MOVEMENTS_TYPE = {
  TRADE: "Scambio",
  REVERSAL: "Storno",
}

const PalletsListTypeSelector = ({
  value,
  onChange,
}) => {
  return (
    <div className='inline-flex flex-col items-start p-2 rounded-r-full mx-2'>
      <p className='text-sm font-bold px-1'>Tipo movimentazione</p>
      <select
        className='bg-transparent text-left cursor-pointer outline-none'
        defaultValue={value}
        onChange={({ target: { value }}) => onChange(value)}
      >
        { Object.keys(MOVEMENTS_TYPE).map(type => (
          <option key={type} value={type}>
            { MOVEMENTS_TYPE[type]}
          </option>
        ))}
      </select>
    </div>
  )
}

export default PalletsListTypeSelector;