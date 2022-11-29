import {  useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import useListOrders from '../hooks/useListOrders';
import RoundedBg from '../../globals/components/layout/RoundedBg';
import OrdersListSideMenu from '../components/list/OrderListSideMenu';
import OrdersListLayout from '../layout/OrdersListLayout';
// Actions
import { selectCurrentCompany } from '../../company/slices/companySlice';
import { changeOrdersList, selectOrdersListEnd, selectOrdersListLimit, selectOrdersListSortDirection, selectOrdersListStart } from '../slices/ordersListSlice';

// Main component -----------------------------------------------------------------------------------------------
export default function OrdersListContainer() {
  const currentCompany = useSelector(selectCurrentCompany);
  const [ searchParams, setSearchParams ] = useSearchParams();
  const listStatus = searchParams.get("status");
  const companyType = searchParams.get("company");
  const dateFrom = useSelector(selectOrdersListStart);
  const dateTo = useSelector(selectOrdersListEnd);
  const limit = useSelector(selectOrdersListLimit);
  const sortDirection = useSelector(selectOrdersListSortDirection);
  const listType = {
    status: listStatus || "ALL",
    companyType: companyType || (currentCompany.type === "TRANSPORT" ? "CARRIER" : "SENDER" )
  }

  const [{ items, isLoading, isFetching, refetch }, pagination ] = useListOrders(listType);
  const dispatch = useDispatch();

  useEffect(() => {
    if(!listStatus || !companyType) {
      setSearchParams({ status: "ALL", company: currentCompany.type === "TRANSPORT" ? "CARRIER" : "SENDER" })
    } else {
      dispatch(changeOrdersList({ key: "type", value: listType }))
    }
  }, [listStatus, companyType, currentCompany]);

  return (
    <>      
    {/* Sidebar */}
    <aside className="relative mr-2 rounded-lg flex-1">
      <OrdersListSideMenu listType={listType} setSearchParams={setSearchParams} />
    </aside>

    {/* Content */}
    <section className={`relative flex-6 mb-4 ${items.length <= 0 ? 'rounded-tl-full' : ''}`}>
      <RoundedBg />
      <OrdersListLayout
        orders={items}
        dateFrom={dateFrom}
        dateTo={dateTo}
        limit={limit}
        sortDirection={sortDirection}
        pagination={pagination}
        refetch={refetch}
        isLoading={!listStatus || !companyType || isLoading}
        isFetching={isFetching}
        listType={listType}
      />
    </section>
  </>
  )
}