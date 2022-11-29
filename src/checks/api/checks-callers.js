import { portableGraphqlQuery } from "../../app/api/graphql-api-slice";
import { createCheck, deleteCheck, updateCheck } from "./graphql/mutations";
import { formatParamsCreateCheck, formatParamsUpdateCheck, formatRemoveCheckById } from "./checks-params-formatters";

// Create --------------------------------------------------------------------------------------------------------------------------------
export const createCheckByCarrier = (params) => ({
  body: createCheck,
  args: formatParamsCreateCheck(params)
});

export const createCheckCaller = async (params) => {
  const result = await portableGraphqlQuery({
    body: createCheck,
    args: formatParamsCreateCheck(params)
  });
  
  return result;
};

// Update --------------------------------------------------------------------------------------------------------------------------------
export const updateCheckCaller = (params) => ({
  body: updateCheck,
  args: formatParamsUpdateCheck(params)
});

export const updateCheckByCarrier = (params) => ({
  body: updateCheck,
  args: formatParamsUpdateCheck(params)
});

// Remove --------------------------------------------------------------------------------------------------------------------------------
export const removeCheckItem = (id) => ({
  body: deleteCheck,
  args: formatRemoveCheckById(id)
})