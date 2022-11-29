import {  useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import useListChecks from '../hooks/useListChecks';
import RoundedBg from '../../globals/components/layout/RoundedBg';
import ChecksListSideMenu from '../components/list/ChecksListSideMenu';
import ChecksListLayout from '../layout/ChecksListLayout';
// Actions
import { selectCurrentCompany } from '../../company/slices/companySlice';
import { changeChecksList, selectChecksListEnd, selectChecksListLimit, selectChecksListStart } from '../slices/checksListSlice';

// Main component -----------------------------------------------------------------------------------------------
export default function ChecksListContainer() {
  const currentCompany = useSelector(selectCurrentCompany);
  const [ searchParams, setSearchParams ] = useSearchParams();
  const listStatus = searchParams.get("status");
  const companyType = searchParams.get("company");
  const dateFrom = useSelector(selectChecksListStart);
  const dateTo = useSelector(selectChecksListEnd);
  const limit = useSelector(selectChecksListLimit);
  const listType = {
    status: listStatus || "ALL",
    companyType: companyType || (currentCompany.type === "TRANSPORT" ? "CARRIER" : "SENDER" )
  }

  const [{ items, isLoading, isFetching, refetch }, pagination ] = useListChecks(listType);
  const dispatch = useDispatch();

  useEffect(() => {
    if(!listStatus || !companyType) {
      setSearchParams({ status: "ALL", company: currentCompany.type === "TRANSPORT" ? "CARRIER" : "SENDER" })
    } else {
      dispatch(changeChecksList({ key: "type", value: listType }))
    }
  }, [listStatus, companyType, currentCompany]);

  return (
    <>      
    {/* Sidebar */}
    <aside className="relative mr-2 rounded-lg flex-1">
      <ChecksListSideMenu
        listType={listType}
        setSearchParams={setSearchParams}
      />
    </aside>

    {/* Content */}
    <section className={`relative flex-6 mb-4 ${items.length <= 0 ? 'rounded-tl-full' : ''}`}>
      <RoundedBg />
      <ChecksListLayout
        checks={items}
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