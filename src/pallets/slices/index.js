import { combineReducers } from 'redux';
import palletsListReducer from './palletsListSlice';
import palletCreatorReducer from './palletCreatorSlice';
import palletEditorReducer from './palletEditorSlice';

const palletsReducer = combineReducers({
  creator: palletCreatorReducer,
  editor: palletEditorReducer,
  list: palletsListReducer,
});

export default palletsReducer;