import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import useListOrders from "../../../orders/hooks/useListOrders";
import RangeMonthsPicker from "../../../globals/components/lists/RangeMonthsPicker";
import FilterButton from "../../../globals/components/buttons/FilterButton";
import OrdersListForTravelCreator from "../creator/OrdersListForTravelCreator";
import { SmallTitle } from "../../../globals/components/typography/titles";
import {
  changeTravelCreatorOrderDetails,
  selectTravelCreatorWaypoints
} from "../../slices/travelCreatorSlice";
import { addTravelCreatorOperationThunk, removeTravelCreatorOperationThunk } from "../../api/travels-thunks";
import { changeOrdersListDateRange, selectOrdersListEnd, selectOrdersListStart } from "../../../orders/slices/ordersListSlice";
import Pagination from "../../../globals/components/lists_v2/Pagination";

export default function OrdersPickerForTravelCreator({
  filterBox,
  showFilterBox,
  showOrderDetailsDrawer,
}) {
  const orderCreatedAtStart = useSelector(selectOrdersListStart);
  const orderCreatedAtEnd = useSelector(selectOrdersListEnd);
  const [{ items: orders, isLoading, isFetching, refetch }, pagination ] = useListOrders({
    companyType: "CARRIER",
    status: "TRAVEL"
  });

  const waypoints = useSelector(selectTravelCreatorWaypoints);
  const dispatch = useDispatch();

  const handleClickOrderStamp = useCallback((order) => {
    showOrderDetailsDrawer(true);
    dispatch(changeTravelCreatorOrderDetails(order))
  }, [dispatch, showOrderDetailsDrawer]);

  console.log("In uscita", orders);

  return (
    <section>
      {/* Title */}
      <header>
        <SmallTitle styles="my-4">
          Seleziona ordini da trasportare
        </SmallTitle>
      </header>

      {/* Filters */}
      <div className="sticky top-2 z-50 flex justify-between items-center">
        <RangeMonthsPicker
          label="Periodo ricezione ordini"
          dateFrom={new Date(orderCreatedAtStart)}
          dateTo={new Date(orderCreatedAtEnd)}
          updateMonthDateRange={(value) => dispatch(changeOrdersListDateRange(value))}
          className="inline-block w-full mr-2 bg-light-300 dark:bg-dark-300 shadow-md rounded-r-full border border-light-100 dark:border-dark-200"
        />

        <Pagination
          goBack={pagination?.goBack}
          goNext={pagination?.goNext}
          page={pagination?.page}
          nextToken={pagination?.nextToken}
          previousTokens={pagination?.previousTokens}
        />
        
        <FilterButton
          className="mr-3 p-1 shadow-md"
          open={filterBox}
          onClick={() => showFilterBox(prev => !prev)}
        />
      </div>

      {/* Orders list */}
      <div className="mt-2">
        <OrdersListForTravelCreator
          orders={orders}
          isLoading={isFetching || isLoading}
          onClick={handleClickOrderStamp}
          addOrder={(order) => dispatch(addTravelCreatorOperationThunk({ order, waypoints }))}
          removeOrder={(order) => dispatch(removeTravelCreatorOperationThunk({ order, waypoints }))}
        />
      </div>
    </section>
  )
}