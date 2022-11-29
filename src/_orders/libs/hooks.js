import { useState, useCallback, useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderThunk } from "../../app/thunks/ordersThunks";
import { enhancedReducer } from "./reducer";
import { selectTenant } from "../../company/slices/companyInfoSlice";
import { API, graphqlOperation } from "aws-amplify";
// Helpers
import { consoleInfo } from "../../globals/libs/helpers";
import { listenerCreateOrderInList, listenerDeleteOrderInList, listenerUpdateOrderInList } from "../slices/ordersSlice";
// Subs
import { 
  ON_CREATE_ORDER_BY_TENANT_CARRIER,
  ON_CREATE_ORDER_BY_TENANT_RECEIVER,
  ON_CREATE_ORDER_BY_TENANT_SENDER,
  ON_DELETE_ORDER_BY_TENANT_CARRIER,
  ON_DELETE_ORDER_BY_TENANT_RECEIVER,
  ON_UPDATE_ORDER_BY_TENANT_RECEIVER,
  ON_UPDATE_ORDER_BY_TENANT_SENDER 
} from "../api/graphql/subscriptions";

export function useRemoteOrder(orderId) {
  const [ order, updateOrderState ] = useReducer(enhancedReducer, null);
  const dispatch = useDispatch();

  const initOrderEditor = useCallback((orderId) => {
    dispatch(getOrderThunk({ id: orderId }));
  }, []);

  useEffect(() => {
    if(orderId) {
      initOrderEditor(orderId)
    }
  }, [orderId]);

  return [order, updateOrderState];
}

export function useOrderSubscription(inputSubs) {
  const [ subs, setSubs ] = useState([...inputSubs]);
  const tenant = useSelector(selectTenant);
  const dispatch = useDispatch();

  useEffect(() => {
    if(tenant && subs?.length > 0) {
      let create_sender_sub = null;
      let create_carrier_sub = null;
      let delete_carrier_sub = null;
      let update_sender_sub = null;
      let create_receiver_sub = null;
      let update_receiver_sub = null;
      let delete_receiver_sub = null;

      // Subscriptions for external changes
      if(subs.includes("sender")) {
        consoleInfo("+ This module listen changes from orders as sender");

        create_sender_sub = tenant && API.graphql(
          graphqlOperation(ON_CREATE_ORDER_BY_TENANT_SENDER, { tenantSender: tenant })
        ).subscribe({ next: (res) => {
          dispatch(listenerCreateOrderInList({ 
            data: res.value.data.onCreateOrderByTenantSender, 
            list: "sender"
          }));
        }});

        update_sender_sub = tenant && API.graphql(
          graphqlOperation(ON_UPDATE_ORDER_BY_TENANT_SENDER, { tenantSender: tenant })
        ).subscribe({ next: (res) => {
          dispatch(listenerUpdateOrderInList({ 
            data: res.value.data.onUpdateOrderByTenantSender, 
            list: "sender"
          }));
        }});
      }

      if(subs.includes("carrier")) {
        consoleInfo("+ This module listen changes from orders as carrier");
        create_carrier_sub = tenant && API.graphql(
          graphqlOperation(ON_CREATE_ORDER_BY_TENANT_CARRIER, { tenantCarrier: tenant })
        ).subscribe({ next: (res) => {
          dispatch(listenerCreateOrderInList({ 
            data: res.value.data.onCreateOrderByTenantCarrier, 
            list: "carrier"
          }));
        }});

        delete_carrier_sub = tenant && API.graphql(
          graphqlOperation(ON_DELETE_ORDER_BY_TENANT_CARRIER, { tenantCarrier: tenant })
        ).subscribe({ next: (res) => {
          dispatch(listenerDeleteOrderInList({
            data: res.value.data.onDeleteOrderByCarrier, 
            list: "carrier"
          }));
        }});
      }
  
      if(subs.includes("receiver")) {
        consoleInfo("+ This module listen changes from orders as receiver");

        create_receiver_sub = tenant && API.graphql(
          graphqlOperation(ON_CREATE_ORDER_BY_TENANT_RECEIVER, { tenantReceiver: tenant })
        ).subscribe({ next: (res) => {

          dispatch(listenerCreateOrderInList({ 
            data: res.value.data.onCreateOrderByTenantReceiver, 
            list: "receiver"
          }));
        }});

        update_receiver_sub = tenant && API.graphql(
          graphqlOperation(ON_UPDATE_ORDER_BY_TENANT_RECEIVER, { tenantReceiver: tenant })
        ).subscribe({ next: (res) => {
          dispatch(listenerUpdateOrderInList({
            data: res.value.data.onUpdateOrderByTenantReceiver, 
            list: "receiver"
          }));
        }});
        
        delete_receiver_sub = tenant && API.graphql(
          graphqlOperation(ON_DELETE_ORDER_BY_TENANT_RECEIVER, { tenantReceiver: tenant })
        ).subscribe({ next: (res) => {
          console.log("È STATO ELIMINATO QUALCOSA: ", res);

          dispatch(listenerDeleteOrderInList({
            data: res.value.data.onDeleteOrderByReceiver, 
            list: "receiver"
          }));
        }});
      }

      // Clean up subscriptions on dispose
      return () => {
        consoleInfo('- Unsubscribe from orders');
        create_sender_sub && create_sender_sub?.unsubscribe?.();
        update_sender_sub && update_sender_sub?.unsubscribe?.();
        create_carrier_sub && create_carrier_sub?.unsubscribe?.();
        delete_carrier_sub && delete_carrier_sub?.unsubscribe?.();
        create_receiver_sub && create_receiver_sub?.unsubscribe?.();
        update_receiver_sub && update_receiver_sub?.unsubscribe?.();
        delete_receiver_sub && delete_receiver_sub?.unsubscribe?.();
      };
    }
  }, [tenant, subs]);

  return [ subs, setSubs ]
}