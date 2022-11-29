import { combineReducers } from 'redux';
import companyInfoReducer from './companyInfoSlice';
import employersListReducer from './employersListSlice';

const contactsReducer = combineReducers({
  companyInfo: companyInfoReducer,
  employersList: employersListReducer,
});

export default contactsReducer;