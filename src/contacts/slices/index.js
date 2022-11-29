import { combineReducers } from 'redux';
import allContactsReducer from './allContactsSlice';
import listContactsReducer from './listContactsSlice';
import contactsListSlice from './contactsListSlice';
import employeesListSlice from './employeesListSlice';
import contactEditorSlice from './contactEditorSlice';

const contactsReducer = combineReducers({
  allContacts: allContactsReducer,
  listContacts: listContactsReducer,
  list: contactsListSlice,
  employees: employeesListSlice,
  editor: contactEditorSlice,
});

export default contactsReducer;