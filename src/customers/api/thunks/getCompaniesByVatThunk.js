import { createAsyncThunk } from '@reduxjs/toolkit';
import { API } from 'aws-amplify';
import { COMPANIES_BY_VATNUMBER } from '../graphql/queries';

// Read -----------------------------------------------------------------------------------------------------------------------------------------------------
export const getCompaniesByVatThunk = createAsyncThunk(
  'customers/getCompanies',
  async (vatNumber, { rejectWithValue }) => {
    let result;
    const variables = { vatNumber }
    console.log(variables);
    try {
      result = await API.graphql(({
        query: COMPANIES_BY_VATNUMBER, 
        variables: variables, 
        authMode: 'AMAZON_COGNITO_USER_POOLS'
      }));

      console.log('Fetch companies in getCompaniesByVatThunk', result);
      if(result?.data?.companyByVatNumber?.items?.length <= 0) {
        throw rejectWithValue("NO_DATA")
      } else {
        return result?.data?.companyByVatNumber?.items || []
      }
    } catch(err) {
      console.error('Error', err);
      throw rejectWithValue({ error: err, result })
    }
  }
)
