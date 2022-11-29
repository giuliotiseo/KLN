import { combineReducers } from 'redux';
import ordersListReducer from './ordersListSlice';
import orderCreatorReducer from './orderCreatorSlice';
import orderEditorReducer from './orderEditorSlice';

const ordersReducer = combineReducers({
  list: ordersListReducer,
  creator: orderCreatorReducer,
  editor: orderEditorReducer,
});

export default ordersReducer;