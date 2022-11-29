export default function UploadedWarehousesTable({ warehouses }) {
  console.log(warehouses);
  return (
    <table className="table-auto w-full min-h-full bg-base-100">
      <thead className="text-left">
        <tr className="uppercase border-b border-light-50 dark:border-dark-100">
          <th className="px-4 py-2 whitespace-nowrap">n.</th>
          { Object.keys(warehouses[0]).map((th, index) => <th key={index} className="px-4 py-2 whitespace-nowrap">{th}</th>)}
        </tr>
      </thead>
      <tbody className="text-sm">
        { warehouses.map((warehouse, index) => (
          <tr key={index} className={`border-b border-light-50 dark:border-dark-100 ${index%2 === 0 ? 'bg-light-200 dark:bg-dark-200' : ''}`}>
            <td className="px-4 py-2 whitespace-nowrap">{index + 2}</td>
            {Object.keys(warehouse).map((c_key, index) => (
              <td key={index} className="px-4 py-2 whitespace-nowrap">
                {warehouse[c_key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
