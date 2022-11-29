import {  useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import useListPreOrders from '../hooks/useListPreOrders';
import RoundedBg from '../../globals/components/layout/RoundedBg';
// Actions
import { changePreOrdersList, selectPreOrdersListEnd, selectPreOrdersListLimit, selectPreOrdersListStamp, selectPreOrdersListStart } from '../slices/preOrdersListSlice';
import { selectCurrentCompany } from '../../company/slices/companySlice';
import PreOrdersListSideMenu from '../components/list/PreOrdersListSideMenu';
import PreOrdersListLayout from '../layout/PreOrdersListLayout';

// Main component -----------------------------------------------------------------------------------------------
export default function PreOrdersListContainer() {
  const currentCompany = useSelector(selectCurrentCompany);
  const [ searchParams, setSearchParams ] = useSearchParams();
  const listStatus = searchParams.get("status");
  const companyType = searchParams.get("company");
  const dateFrom = useSelector(selectPreOrdersListStart);
  const dateTo = useSelector(selectPreOrdersListEnd);
  const limit = useSelector(selectPreOrdersListLimit);
  const listType = {
    status: listStatus || "ALL",
    companyType: companyType || (currentCompany.type === "TRANSPORT" ? "CARRIER" : "SENDER" )
  }

  const [{ items, isLoading, isFetching, refetch }, pagination ] = useListPreOrders(listType);
  const dispatch = useDispatch();

  useEffect(() => {
    if(!listStatus || !companyType) {
      setSearchParams({ status: "ALL", company: currentCompany.type === "TRANSPORT" ? "CARRIER" : "SENDER" })
    } else {
      dispatch(changePreOrdersList({ key: "type", value: listType }))
    }
  }, [listStatus, companyType, currentCompany]);

  return (
    <>      
    {/* Sidebar */}
    <aside className="relative mr-2 rounded-lg flex-1">
      <PreOrdersListSideMenu listType={listType} setSearchParams={setSearchParams} />
    </aside>

    {/* Content */}
    <section className={`relative flex-6 mb-4 ${items.length <= 0 ? 'rounded-tl-full' : ''}`}>
      <RoundedBg />
      <PreOrdersListLayout
        preOrders={items}
        dateFrom={dateFrom}
        dateTo={dateTo}
        limit={limit}
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