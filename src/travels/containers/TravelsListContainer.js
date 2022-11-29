import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { selectCurrentCompany } from "../../company/slices/companySlice";
import RoundedBg from "../../globals/components/layout/RoundedBg";
import TravelsListSideMenu from "../components/list/TravelsListSideMenu";
import useListTravels from "../hooks/useListTravels";
import TravelsListLayout from "../layout/TravelsListLayout";
import {
  selectTravelsListDepartureDateRange,
  selectTravelsListLimit,
} from "../slices/travelsListSlice";

// Main component -----------------------------------------------------------------------------------------------
export default function TravelsListContainer() {
  const currentCompany = useSelector(selectCurrentCompany);
  const [ searchParams, setSearchParams ] = useSearchParams();
  const listStatus = searchParams.get("status");
  const [dateFrom, dateTo] = useSelector(selectTravelsListDepartureDateRange);
  const limit = useSelector(selectTravelsListLimit);
  const navigate = useNavigate();
  const companyType = "CARRIER"; // forced on Travel
  const [{ items, isLoading, isFetching, refetch }, pagination ] = useListTravels({
    companyType,
    status: listStatus || 'ALL'
  });

  useEffect(() => {
    if(currentCompany.type === 'TRANSPORT') {
      if(!listStatus) {
        setSearchParams({ status: "ALL", company: currentCompany.type === "TRANSPORT" ? "CARRIER" : "SENDER" })
      }
    } else {
      navigate('/unauthorized');
    }
  }, [listStatus, currentCompany]);

  // Good to go
  return (
    <>
      {/* Sidebar */}
      <aside className="relative mr-2 rounded-lg flex-1">
        <TravelsListSideMenu
          queryStatus={listStatus}
          companyType={companyType}
          setSearchParams={setSearchParams}
        />
      </aside>

      {/* Content */}
      <section className={`relative flex-6 mb-4 ${items.length <= 0 ? 'rounded-tl-full' : ''}`}>
        <RoundedBg />
        <TravelsListLayout
          travels={items}
          dateFrom={dateFrom}
          dateTo={dateTo}
          limit={limit}
          pagination={pagination}
          refetch={refetch}
          isLoading={!listStatus || isLoading}
          isFetching={isFetching}
          listType={'CARRIER'}
        />
      </section>
    </>
  )
}
