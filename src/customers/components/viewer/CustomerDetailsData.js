import { FiMail, FiPhone } from 'react-icons/fi';
import MultipleMarkersMap from '../../../globals/components/layout/MultipleMarkersMap';
import SafeArea from '../../../globals/components/layout/SafeArea';
import SafeCol from '../../../globals/components/layout/SafeCol';
import CustomerCheckpointCompiler from '../checkpoint/CustomerCheckpointCompiler';

// Sub components ------------------------------------------------------------------------------------------------------
const DetailsDataItem = ({ data }) => {
  return (
    <li className='flex justify-between w-full p-2 bg-base-100 rounded-md mb-2 text-base lg:text-lg'>
      <span>{data.name}</span>
      <span>{data.value}</span>
    </li>
  )
}

// Main component ------------------------------------------------------------------------------------------------------
function CustomerDetailsData({ customer }) {
  const { warehouses, emails, phones } = customer;
  
  console.log({customer});

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 px-2 h-full">
      <div className="col-span-1 md:col-span-3 lg:col-span-2 py-4">
        <SafeArea>
          <SafeCol>
            <div className="mb-2 mr-4">
              <h2 className='title-3 mt-4 mb-2 flex items-center'>
                <FiMail className="mr-2" />
                <span>Indirizzi di posta</span>
              </h2>
              { emails && emails?.length > 0
                ? <ul className='block'>
                    { emails.map((email, index) => <DetailsDataItem key={index} data={email} /> )}
                  </ul>
                : <p className='text-gray-400 dark:text-gray-500'>Nessuna email presente</p>
              }

              <h2 className='title-3 mt-4 mb-2 flex items-center'>
                <FiPhone className="mr-2" />
                <span>Numeri di telefono</span>
              </h2>

              { phones && phones?.length > 0
                ? <ul className='block'>
                    { phones.map((phone, index) => <DetailsDataItem key={index} data={phone} /> )}
                  </ul>
                : <p className='text-gray-400 dark:text-gray-500'>Nessun telefono presente</p>
              }
            </div>

            <div className="mt-4 mr-4">
              <CustomerCheckpointCompiler
                checkpoints={customer.warehouses}
                editEnabled={false}
                hideTitle={false}
                hideMap={true}
              />
            </div>
          </SafeCol>
        </SafeArea>
      </div>

      <div className="col-span-1 md:col-span-1 lg:col-span-2 py-4">
        <MultipleMarkersMap
          coordinate={warehouses.map(warehouse => warehouse.location.coordinate)}
          onClick={value => console.log("Value", value)}
        />
      </div>
    </div>
  )
}

export default CustomerDetailsData
