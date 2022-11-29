import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import RoundedBg from "../../globals/components/layout/RoundedBg";
import CustomersListSideMenu from "../components/list/CustomersListSideMenu";
import useListCustomers from "../hooks/useListCustomers";
import CustomersListLayout from "../layout/CustomersListLayout";
import { changeCustomersList, selectCustomersListLimit, selectCustomersListSearchable } from "../slices/customersListSlice";

export default function CustomersListContainer() {
  const [ searchParams, setSearchParams ] = useSearchParams();
  const listType = searchParams.get("type");
  const [{ items, isLoading, isFetching, refetch }, pagination ] = useListCustomers(listType || "ALL");
  const limit = useSelector(selectCustomersListLimit);
  const searchable = useSelector(selectCustomersListSearchable);
  const dispatch = useDispatch();

  useEffect(() => {
    if(!listType) {
      setSearchParams({ type: "ALL" })
    } else {
      dispatch(changeCustomersList({ key: "type", value: listType }))
    }
  }, [listType])

  return (
    <>      
      {/* Sidebar */}
      <aside className="relative mr-2 rounded-lg flex-1">
        <CustomersListSideMenu listType={listType} setSearchParams={setSearchParams} />
      </aside>

      {/* Content */}
      <section className={`relative flex-6 ${items.length <= 0 ? 'rounded-tl-full' : ''}`}>
        <RoundedBg />
        <CustomersListLayout
          customers={items}
          listType={listType}
          searchable={searchable}
          limit={limit}
          pagination={pagination}
          refetch={refetch}
          isLoading={!listType || isLoading}
          isFetching={isFetching}
        />
      </section>
    </>
  )
}