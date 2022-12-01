export const isAllowedToDeletePreOrder = (preOrder, currentCompany) => {
  const currentRole = currentCompany.id === preOrder?.carrierId ? 'CARRIER' : 'SENDER';
  return currentRole === "CARRIER"
    ? preOrder?.status === "PENDING"
      ? true
      : false
    : preOrder?.status !== "ACCEPTED" || preOrder?.tenantCarrier === "NOT_OWNED"
      ? true
      : false;
}

export const isAllowedToEditPreOrder = (preOrder, currentCompany) => {
  const currentRole = currentCompany.id === preOrder?.carrierId ? 'CARRIER' : 'SENDER';
  return currentRole === "CARRIER"
    ? preOrder?.status === "PENDING"
      ? true
      : false
    : preOrder?.status === "PENDING" || preOrder?.status === "REJECTED" || preOrder?.tenantCarrier === "NOT_OWNED"
      ? true
      : false;
}