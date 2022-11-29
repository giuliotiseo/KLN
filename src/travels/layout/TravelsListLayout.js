import { useState } from "react";
import { useScrollFull } from "../../globals/hooks/useScrollFull";
import SafeCol from "../../globals/components/layout/SafeCol";
import TravelsListOptions from "../components/list/TravelsListOptions";
import TravelsList from "../components/list/TravelsList";
import TravelsListFilters from "../components/list/TravelsListFilters";
import Spinner from "../../globals/components/layout/Spinner";

// Main component -----------------------------------------------------------------------------------------------
export default function TravelsListLayout({
  travels,
  dateFrom,
  dateTo,
  limit,
  pagination,
  refetch,
  isLoading,
  isFetching,
  listType,
}) {
  const [ isOpenFilters, setIsOpenFilters ] = useState();
  const scrollableRef = useScrollFull();

  return (
    <SafeCol id="ChecksListLayout" ref={scrollableRef}>
      <div className={`${isLoading && 'pointer-events-none'}`}>
        <TravelsListOptions
          dateFrom={dateFrom}
          dateTo={dateTo}
          limit={limit}
          pagination={pagination}
          refetch={refetch}
          companyRole={listType}
        />
      </div>

      { isLoading || isFetching
        ? <div className="flex h-full w-full items-center justify-center">
            <Spinner className="h-5 w-5 text-primary-200 dark:text-primary-300" />
          </div>
        : <TravelsList
            travels={travels}
            isFetching={isLoading || isFetching}
          />
      }

      {/* Floating elements */}
      <TravelsListFilters
        isOpenFilters={isOpenFilters}
        setIsOpenFilters={setIsOpenFilters}
      />

    </SafeCol>
  )
}