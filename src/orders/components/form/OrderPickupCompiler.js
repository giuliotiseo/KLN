import React from 'react'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Select from '../../../globals/components/dataEntry_v2/Select';
import SafeCol from '../../../globals/components/layout/SafeCol';
import OrderPickupFormRouter from '../../router/OrderPickupFormRouter';
import PreOrdersPicker from './PreOrdersPicker';
import { selectOrderCreatorPickupPickerMethod } from '../../slices/orderCreatorSlice';

const methods = ["PREORDER", "MANUAL"];
const METHODS_DESCRIPTION = {
  PREORDER: "Collegamento ad elenco pre-ordini (consigliato)",
  MANUAL: "Inserimento manuale"
}

function OrderPickupCompiler({
  order,
  preOrdersQuery,
  customersQuery,
  customerDetailsQuery,
  ordersInPreOrderQuery,
  setCustomerSearchable,
  setPreOrderDrawer,
  updateForm,
  updateCustomer,
  updateTrades,
  updatePreOrder,
  updatePickupCheckpoint,
}) {
  const { pathname } = useLocation();
  const method = useSelector(selectOrderCreatorPickupPickerMethod);
  const companyType = pathname.split("/").at(-1).toUpperCase(); // CARRIER || SENDER
  if(!companyType) return null;

  return (
    <SafeCol id="OrderPickupCompiler">
      <section className='my-2 pr-4'>
        <h2 className="title-5 mb-4 uppercase text-gray-500 dark:text-gray-600">
          1. Informazioni di ritiro
        </h2>

        <div className='bg-base-100 mt-2 mb-4 px-4 py-4 rounded-md'>
          <Select
            id="pickupPickerMethod"
            label="Scegli il metodo di configurazione del ritiro"
            value={method}
            selectClassName="block w-full bg-light-300 dark:bg-dark-300"
            callback={updateForm}
          >
            { methods.map(meth => (
              <option key={meth} value={meth}>{METHODS_DESCRIPTION[meth]}</option>
            ))}
          </Select>

          { method === "MANUAL" && (
            <p className="alert-warn px-4 mt-2">
              <span className='block font-bold'>Attenzione!</span>
              Se inserisci un nuovo ordine senza collegarlo ad un pre-ordine potresti imbatterti in problemi nella gestione del trasporto. Per ottimizzare la comunicazione fra le aziende coinvolte, si consiglia di procedere con questa modalità solo se vi è certezza della disponibilità del mittente e del vettore, in caso contrario passa all'invio di un pre-ordine.
            </p>
          )}
        </div>

        { method === "PREORDER"
          ? <PreOrdersPicker
              preOrdersQuery={preOrdersQuery}
              setPreOrderDrawer={setPreOrderDrawer}
              ordersInPreOrderQuery={ordersInPreOrderQuery}
              callback={updatePreOrder}
              companyType={companyType}
          />
          : <OrderPickupFormRouter
              order={order}
              customersQuery={customersQuery}
              customerDetailsQuery={customerDetailsQuery}
              setCustomerSearchable={setCustomerSearchable}
              callback={updateCustomer}
              companyType={companyType}
              updateForm={updateForm}
              updatePickupCheckpoint={updatePickupCheckpoint}
              updateTrades={updateTrades}
            />
        }
      </section>
    </SafeCol>
  )
}

export default OrderPickupCompiler
