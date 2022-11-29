import { combineReducers } from 'redux';
import warehousesListReducer from './warehousesListSlice';
import warehouseCreatorReducer from './warehouseCreatorSlice';
import warehouseEditorReducer from './warehouseEditorSlice';

const warehousesReducer = combineReducers({
  list: warehousesListReducer,
  creator: warehouseCreatorReducer,
  editor: warehouseEditorReducer,
});

export default warehousesReducer;

