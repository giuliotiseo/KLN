import ListItem from "../../../../globals/components/lists/ListItem"
import CopyOnClipboard from "../../../../globals/components/buttons_v2/CopyOnClipboard";

// Main component ----------------------------------------------------------------------------------------------------------------------------------------------------------
const SmartCustomerPalletListItem = ({
  customer,
}) => {

  console.log('Ci siamo quasi dai...', customer.volatilePalletWallet)
  return (
    <div className="mt-2">
      <ListItem
        key={customer.id}
        topTitle={'Cliente'}
        title={`${customer.name}`}
        item={customer}
        path={`niente`}
        aside={null}
        // forcedStatus={pallet.type}
        // subtitle={<p className="whitespace-nowrap text-sm text-secondary-200 dark:text-secondary-300">MOV. {pallet.stamp.split("-")[1]}</p>}
      >
        <div className="text-gray-400 dark:text-gray-500 hover:text-dark-50 dark:hover:text-light-300 transition-colors tracking-wider">
          <CopyOnClipboard tipMessage='' tipSuccess='Copiato' hideInternalDataTip={true} inputData={customer.vatNumber} />
        </div>

        { customer.volatilePalletWallet > 0 && (
          <div className="mt-4 flex items-center font-bold text-lg text-teal-500 dark:text-teal-300">Credito {Math.abs(customer.volatilePalletWallet)} EPAL</div>
        )}

        { customer.volatilePalletWallet < 0 && (
          <div className="mt-4 flex items-center font-bold text-lg text-red-500 dark:text-red-300">Debito {Math.abs(customer.volatilePalletWallet)} EPAL</div>
        )}

        { customer.volatilePalletWallet === 0 && (
          <div className="mt-4 flex items-center font-bold text-lg text-cyan-500 dark:text-cyan-400">In pari</div>
        )}
      </ListItem>
    </div>
  )
}

export default SmartCustomerPalletListItem;