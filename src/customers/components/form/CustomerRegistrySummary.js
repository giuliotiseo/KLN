export default function CustomerRegistrySummary({
  customer
}) {
  const { name, vatNumber, address, companyCode } = customer;
  return (
    <div className="p-2 mb-4 bg-base-100 rounded-md">
      <div className="flex flex-col justify-between">
        <p className='text-xl'>
          <span>{name}</span>
        </p>

        <p className='text-base'>
          <span>{address}</span>
        </p>

        <div className="gap-2 flex flex-wrap items-center justify-between border-t border-light-300 dark:border-dark-100 pt-2 mt-2">
          <p className='text-base text-gray-400 dark:text-gray-500'>
            <span className="tracking-wider">{vatNumber}</span>
          </p>
          <p className='text-base text-gray-400 dark:text-gray-500'>
            <span>{companyCode}</span>
          </p>
        </div>
      </div>
    </div>
  )
}