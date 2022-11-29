import { combineReducers } from 'redux';
import vehiclesListReducer from './vehiclesListSlice';
import vehicleCreatorReducer from './vehicleCreatorSlice';
import vehicleEditorReducer from './vehicleEditorSlice';

const vehiclesReducer = combineReducers({
  list: vehiclesListReducer,
  creator: vehicleCreatorReducer,
  editor: vehicleEditorReducer,
});

export default vehiclesReducer;