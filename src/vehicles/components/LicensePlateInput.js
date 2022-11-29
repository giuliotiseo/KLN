export default ({ licensePlate, setLicensePlate }) => {
  return (
    <div className="flex items-center">
      <input 
        type="text"
        value={licensePlate}
        onChange={({ target: { value }}) => setLicensePlate(value)}
        className="text-2xl font-light tracking-widest uppercase text-center w-full max-w-sm mx-auto border border-dark-200 px-2 py-4 rounded-md outline-none"
      />
    </div>
  )
}