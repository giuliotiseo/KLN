import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { graphqlApiSlice } from "./api/graphql-api-slice";
import { restApiSlice } from './api/rest-api-slice';
import subscribeReducer from "../subscribe/slices/subscribeSlice";
import appUIReducer from "../private-app/slices/appSlice";
import authProfileReducer from "../auth-profile/slices/authProfileSlice";
import companyReducer from "../company/slices/companySlice";
import customersReducer from "../customers/slices";
import contactsReducer from '../contacts/slices';
import warehousesReducer from '../warehouses/slices';
import vehiclesReducer from '../vehicles/slices';
import preOrdersReducer from '../pre-orders/slices';
import ordersReducer from '../orders/slices';
import checksReducer from '../checks/slices';
import travelsReducer from '../travels/slices';
import palletsReducer from '../pallets/slices';

const appReducer = combineReducers({
  // v2 ->
  [graphqlApiSlice.reducerPath]: graphqlApiSlice.reducer,
  [restApiSlice.reducerPath]: restApiSlice.reducer,
  subscribe: subscribeReducer,
  app_ui: appUIReducer,
  company: companyReducer,
  authProfile: authProfileReducer,
  customers: customersReducer,
  contacts: contactsReducer,
  warehouses: warehousesReducer,
  vehicles: vehiclesReducer,
  preOrders: preOrdersReducer,
  orders: ordersReducer,
  checks: checksReducer,
  travels: travelsReducer,
  pallets: palletsReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    return appReducer(undefined, action)
  }

  return appReducer(state, action)
}

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(graphqlApiSlice.middleware)
      .concat(restApiSlice.middleware)
  },
});

export default store;
