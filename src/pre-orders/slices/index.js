import { combineReducers } from 'redux';
import preOrdersListReducer from './preOrdersListSlice';
import preOrderCreatorReducer from './preOrderCreatorSlice';
import preOrderEditorReducer from './preOrderEditorSlice';

const preOrdersReducer = combineReducers({
  list: preOrdersListReducer,
  creator: preOrderCreatorReducer,
  editor: preOrderEditorReducer,
});

export default preOrdersReducer;