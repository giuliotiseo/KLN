import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentRoles } from "../../auth-profile/slices/authProfileSlice";
import { selectCurrentCompany } from "../../company/slices/companySlice";
import { useAuth } from "./useAuth";

function useLogParams({
  action,
  data,
  propsGlossary,
  limit,
  previousLogs,
  enableDomain = false
}) {
  const { auth } = useAuth();
  const { id, name } = useSelector(selectCurrentCompany);
  const roleIds = useSelector(selectCurrentRoles);
  const logParams = {
    cognitoUser: auth,
    domain: enableDomain ? { id, name } : null,
    roleIds,
    previousLogs,
    data,
    action,
    propsGlossary,
    limit,
  }

  return logParams
}

export default useLogParams;