import { combineReducers } from 'redux';
import checksListReducer from './checksListSlice';
import checkCreatorReducer from './checkCreatorSlice';
import checkEditorReducer from './checkEditorSlice';

const checksReducer = combineReducers({
  list: checksListReducer,
  creator: checkCreatorReducer,
  editor: checkEditorReducer,
});

export default checksReducer;