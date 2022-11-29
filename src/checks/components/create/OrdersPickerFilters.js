import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputText from "../../../globals/components/dataEntry/InputText";
import InputSearchByCompanyRole from "../../../globals/components/dataEntry/InputSearchByCompanyRole";
import RangeMonthsPicker from "../../../globals/components/lists_v2/RangeMonthsPicker";
import Pagination from "../../../globals/components/lists_v2/Pagination";
import RefreshListButton from "../../../globals/components/lists/RefreshListButton";
// Icons
import { FiSearch } from "react-icons/fi";
import { RiFilterLine, RiFilterOffLine } from "react-icons/ri";
import { changeOrdersList, changeOrdersListDateRange, changeOrdersListLimit, resetOrdersList, selectOrdersListFilterObject } from "../../../orders/slices/ordersListSlice";
import { selectOrdersListEnd, selectOrdersListStart } from "../../../orders/slices/ordersListSlice";

// Main component ------------------------------------------------------------------------------------------------------------------------
export default function OrdersPickerFilters({
  className,
  pagination,
  refetch,
  loading
}) {
  const [ open, setOpen ] = useState(false);
  const dateFrom = useSelector(selectOrdersListStart);
  const dateTo = useSelector(selectOrdersListEnd);
  const { stamp } = useSelector(selectOrdersListFilterObject);
  const { goNext, goBack, page, nextToken, previousTokens } = pagination;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeOrdersListLimit(9999));
    dispatch(changeOrdersList({ key: 'status', value: "DELIVERED"}));
    return () => dispatch(resetOrdersList());
  }, []);

  return (
    <aside className={`sticky top-0 mb-4 bg-base-100 px-4 pb-4 rounded-md shadow-md ${className}`}>
      {/* Created at */}
      <div className="flex flex-1 border-b border-light-100 dark:border-dark-100">
        <RefreshListButton refresh={refetch} />

        <RangeMonthsPicker
          dateFrom={dateFrom}
          dateTo={dateTo}
          updateMonthDateRange={(value) => dispatch(changeOrdersListDateRange(value))}
          className="inline-block w-full"
        />

        <Pagination
          goBack={goBack}
          goNext={goNext}
          page={page}
          nextToken={nextToken}
          previousTokens={previousTokens}
        />
      </div>
      
      <div className="pt-2">
        <h3 className="title-4 flex items-center hover:text-primary-200 dark:hover-text-primary-300">
          <button className="flex font-bold text-left w-full" onClick={() => setOpen(prev => !prev)}>
            { open 
              ? <RiFilterOffLine className="mr-1" />
              : <RiFilterLine className="mr-1" />
            }
              Filtra elenco ordini
          </button>
        </h3>
        <div className={`${ open ? 'block' : 'hidden'} mt-4`}>
          {/* Companies search */}
          <InputSearchByCompanyRole
            className="mb-2"
            selectClassName="flex-1 label cursor-pointer mb-0"
            contentClassName="flex-[3_2_0%]"
            callback={(type, value) => dispatch(changeOrdersList({ key: `${type}Name`, value }))}
            loading={loading}
          />

          {/* Stamp */}
          <InputText
            id="stamp"
            label="Marca ordine"
            selected={stamp}
            textButton={null}
            iconButton={() => <FiSearch />}
            className="flex-col lg:flex-row mb-2"
            contentClassName="flex-[3_2_0%]"
            labelClassName="flex-1 items-center mb-0"
            callback={(payload) => dispatch(changeOrdersList({ key: payload.id, value: payload.value }))}
            statusLabel={false}
            loading={loading}
          />
      </div>
      </div>
    </aside>
  )
}