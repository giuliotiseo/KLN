import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InlineSpinner from "../../globals/components/spinners/InlineSpinner";
import { Paragraph } from "../../globals/components/typography/paragraphs";
import OrderListItem from "./OrderListItem";
import ActionButton from "../../globals/components/buttons/ActionButton";
// Store
import {
  selectOrdersList,
  selectOrdersLoadingStatus,
  selectOrdersNextToken
} from "../slices/ordersSlice";
import { selectTenant } from "../../company/slices/companyInfoSlice";
// Hooks
import { useOrderSubscription } from "../libs/hooks";
// Icons
import { FiArrowDownCircle } from "react-icons/fi";

const subs = {
  carrier: { input: ["carrier"], output: "carrierSubs"}, 
  sender: { input: ["sender"], output: "senderSubs"},
  receiver: { input: ["receiver"], output: "receiverSubs"},
}

export default function OrdersList({ queryFrom, queryStatus, next, multiselect, selectedIdsState }) {
  const orders = useSelector((store) => selectOrdersList(store, queryFrom));
  const statusList = useSelector(selectOrdersLoadingStatus);
  const nextToken = useSelector((store) => selectOrdersNextToken(store, queryFrom)); 
  const tenant = useSelector(selectTenant); 
  const dispatch = useDispatch();
  const [_, setSubscribeToOrders] = useOrderSubscription(subs[queryFrom].input);

  // Subs
  useEffect(() => {
    setSubscribeToOrders(queryFrom);
  }, [dispatch, tenant, queryFrom]);

  return (
    <div>
      <div className="absolute left-0 top-0 -translate-y-full">
        <InlineSpinner color="#158084" loading={statusList} />
      </div>
      { orders && orders.length > 0 
        ? (
          <ul>
            { orders.map(item => {
              return (       
                <OrderListItem
                  key={item.id}
                  item={item}
                  tenant={tenant}
                  queryFrom={queryFrom}
                  queryStatus={queryStatus}
                  showDropdown={true}
                  multiselect={multiselect}
                  selectedIdsState={selectedIdsState}
                />
            )})}
          </ul>
        )
        : <Paragraph styles="opacity-50 border-t p-6 dark:border-dark-300">Nessun ordine trovato</Paragraph>
      }
      
      { nextToken ? (
          <ActionButton
            text="Mostra altri"
            loading={nextToken === "loading"}
            icon={() => <FiArrowDownCircle />}
            styles="btn-ghost ml-4"
            onClick={() => next(nextToken)}
          />
        ) : <Paragraph styles="opacity-50 px-4 my-4">Non ci sono altri risultati da mostrare</Paragraph>
      }
    </div>
  )
}