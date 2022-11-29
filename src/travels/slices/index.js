import { combineReducers } from 'redux';
import travelsListReducer from './travelsListSlice';
import TravelCreatorReducer from './travelCreatorSlice';
import TravelEditorReducer from './travelEditorSlice';

const travelsUIReducer = combineReducers({
  creator: TravelCreatorReducer,
  editor: TravelEditorReducer,
  list: travelsListReducer,
});

export default travelsUIReducer;