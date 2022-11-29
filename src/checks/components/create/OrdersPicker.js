import { useState } from "react";
// Helpers
import OrdersListForChecks from "./OrdersListForChecks";
import useListOrders from "../../../orders/hooks/useListOrders";
import OrdersPickerFilters from "./OrdersPickerFilters";

export default function OrdersPicker({
  queryFrom,
  statuses,
  inputFilter,
  callback = (order) => console.log("Callback:", order)
}) {
  const [ filter, setFilter ] = useState(inputFilter); // { collectChecks: { eq: true }}
  const [{ items: orders, isLoading, isFetching, refetch }, pagination ] = useListOrders({
    companyType: queryFrom.toUpperCase(),
    status: "CHECK"
  });

  return (
    <section>
      {/* Title */}
      <header>
        <h3 className="title-3 my-4">
          Associa ordine
        </h3>
      </header>

      {/* Filters */}
      <OrdersPickerFilters
        loading={isLoading || isFetching}
        refetch={refetch}
        pagination={pagination}
      />

      {/* Orders list */}
      <OrdersListForChecks
        orders={orders}
        loading={isFetching || isLoading}
        onClick={callback}
      />
    </section>
  )
}