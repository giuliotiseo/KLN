import { portableGraphqlQuery } from "../../app/api/graphql-api-slice";
import { UPDATE_PROFILE } from "./graphql/mutations";
import { updateProfileFormatter } from "./profile-params-formatters";

// Update --------------------------------------------------------------------------------------------------------------------------------
export const updateCustomerCaller =  async (params) => {
  const dataToReturn = updateProfileFormatter(params);
  const result = await portableGraphqlQuery({
    body: UPDATE_PROFILE,
    args: dataToReturn
  });
  
  return result;
};
