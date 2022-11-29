import React from 'react'
import { useState } from 'react';
import { FiCheckSquare, FiRefreshCcw, FiSquare } from 'react-icons/fi';
import { TbInfoCircle } from 'react-icons/tb';
import { useSelector } from 'react-redux';
import Button from '../../../globals/components/buttons_v2/Button';
import CardDetails from '../../../globals/components/dataDisplay/CardDetails';
import InputText from '../../../globals/components/dataEntry_v2/InputText';
import Spinner from '../../../globals/components/layout/Spinner';
import Pagination from '../../../globals/components/lists_v2/Pagination';
import { COMPLEX_VEHICLE_TYPE_DESCRIPTION } from '../../../globals/libs/constants';
import { SHIPMENT_METHOD_DESCRIPTION } from '../../../globals/libs/models';
import PreOrderDatesDetails from '../../../pre-orders/components/viewer/PreOrderDatesDetails';
import { selectOrderCreatorSelectedPreOrder } from '../../slices/orderCreatorSlice';
import LinkedOrdersByPreOrder from './LinkedOrdersByPreOrder';

const PreOrderPickerCompanyLabel = ({ name }) => <span className='text-secondary-200 dark:text-secondary-300'>{name}</span>

const PreOrderPickerListItem = ({
  preOrder,
  onClick,
  isChecked,
  editable,
  setPreOrderDrawer
}) => {
  return (
    <li className='bg-base-100 rounded-md p-2 dark:border-dark-50 last:border-none'>
      { editable 
        ? <div>
            <div className='flex justify-between'>
              <Button
                icon={isChecked ? <FiCheckSquare className='mr-2 mt-1 opacity-100 text-primary-200 dark:text-primary-300' /> : <FiSquare className='mr-2 mt-1' />}
                text={<div className='flex items-center text-left'>{preOrder.name}</div>}
                className={`
                  text-lg flex items-start pl-0 pb-0 transition-opacity duration-200 
                  ${ isChecked ? 'opacity-100' : 'opacity-70 hover:opacity-100 '}
                `}
                onClick={() => onClick(preOrder)}
              />

              <Button
                icon={<TbInfoCircle className='text-xl' />}
                className="btn-ghost"
                onClick={() => setPreOrderDrawer(preOrder.id)}
              />
            </div>
            <div className="text-sm ml-8">
              <p>Inviato da <PreOrderPickerCompanyLabel name={preOrder.senderName} /> a <PreOrderPickerCompanyLabel name={preOrder.carrierName} /></p>
              { preOrder?.storageId !== preOrder.senderId && <p>Punto di ritiro presso azienda terza: <span className="text-secondary-200 dark:text-secondary-300">
                { preOrder.storageName}
                </span>
              </p> }
              <p>{SHIPMENT_METHOD_DESCRIPTION[preOrder.shipmentType]} - { preOrder.shipmentType === "GROUPAGE"
                ? `${preOrder.slot} basi a terra 80x120`
                : `${COMPLEX_VEHICLE_TYPE_DESCRIPTION[preOrder.vehicleType]}`
              }</p>
            </div>

          </div>
          : <div className='py-2'>
            <p>{preOrder.name}</p>
            <p className="text-sm ml-8">{SHIPMENT_METHOD_DESCRIPTION[preOrder.shipmentType]} - { preOrder.shipmentType === "GROUPAGE"
              ? `${preOrder.slot} basi a terra 80x120`
              : `${COMPLEX_VEHICLE_TYPE_DESCRIPTION[preOrder.vehicle.type]}`
            }</p>
          </div>
        }
    </li>
  )
}

function PreOrdersPicker({
  preOrdersQuery,
  setPreOrderDrawer,
  ordersInPreOrderQuery,
  companyType,
  callback = () => console.log("Default callback in <PreOrdersPicker />"),
  editable = true
}) {
  const [ searchStamp, setSearchStamp ] = useState("");
  const selectedPreOrder = useSelector(selectOrderCreatorSelectedPreOrder);
  const [{ items: preOrders, isLoading, isFetching, refetch }, pagination ]  = preOrdersQuery;
  const { data, isLoading: isLoadingOrders, isFetching: isFetchingOrders, refetch: refetchOrders } = ordersInPreOrderQuery;
  const ordersInPreOrder = data?.ids?.length > 0 ? data.ids.map(id => data.entities[id]) : [];
  const { goBack, goNext, page, nextToken, previousTokens } = pagination;
  const loading = isLoading || isFetching;

  return (
    <section>
      <CardDetails
        header={<h3 className="title-3">Collega un Pre-Ordine</h3>}
        className="h-full mb-4"
        footer={null}
        clear={false}
      >        
        <div className="top-0 bg-base-100 flex gap-2 justify-between p-2 border-b border-light-100 dark:border-dark-100 rounded-md mb-1">
          <Button
            icon={<FiRefreshCcw />}
            onClick={refetch}
            className="btn-ghost"
          />

          <InputText
            id="stamp"
            className="flex-col w-full"
            placeholder='Filtra codice'
            contentClassName="w-full text-lg"
            labelClassName="block"
            value={searchStamp}
            forceUpperCase={true}
            callback={({ value }) => setSearchStamp(value)}
            // onPressEnter={() => searchCompany(searchCompanyName)}
            onPressEnter={() => console.log("Cerca marca", searchStamp)}
            disabled={loading}
          />

          <Pagination
            goBack={goBack}
            goNext={goNext}
            page={page}
            nextToken={nextToken}
            previousTokens={previousTokens}
            className="bg-base-100 border bg-base-100 rounded-full"
          />
        </div>

        { loading 
          ? <Spinner className = "h-5 w-5 text-primary-200 dark:text-primary-300" />
          : preOrders?.length > 0
            ? <ul>
              { preOrders.map(preOrder => (
                <PreOrderPickerListItem
                  key={preOrder.id}
                  preOrder={preOrder}
                  onClick={callback}
                  editable={editable}
                  isChecked={selectedPreOrder?.id === preOrder.id}
                  setPreOrderDrawer={setPreOrderDrawer}
                />
              ))}
            </ul>
            : <p className='text-gray-400 dark:text-gray-500'>Non è presente alcun pre-ordine selezionabile</p>
        }
      </CardDetails>

      { selectedPreOrder && (
        <div className='w-full'>
          <PreOrderDatesDetails preOrder={selectedPreOrder} />
        </div>
      )}
      
      { selectedPreOrder && (
        <div className='w-full mt-4'>
          <LinkedOrdersByPreOrder
            linkedOrders={ordersInPreOrder}
            preOrder={selectedPreOrder}
            enableDelete={true}
            companyType={companyType}
            visualization="column"
            itemClassName="bg-base-100 rounded-md p-2 m-0"
          />
        </div>
      )}


    </section>
  )
}

export default PreOrdersPicker;
