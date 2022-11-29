import { combineReducers } from 'redux';
import customersListReducer from './customersListSlice';
import customerCreatorReducer from './customerCreatorSlice';
import customerEditorReducer from './customerEditorSlice';

const customersReducer = combineReducers({
  list: customersListReducer,
  creator: customerCreatorReducer,
  editor: customerEditorReducer,
});

export default customersReducer;