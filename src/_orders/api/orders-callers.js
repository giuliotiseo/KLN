// import { ordersByCarrierStatusSenderCreatedAt, ordersBySenderStatusCreatedAt } from "../../graphql/queries";
// import { ORDERS_BY_CARRIER_CREATEDAT, ORDERS_BY_CARRIER_STATUS_CREATEDAT } from "./graphql/queries";
// import { formatParamsOrdersByTenant, formatParamsOrdersByTenantCreatedAt } from "./orders-params-formatters";

// // Helpers
// const getTenantIdentifier = (params) => Object.keys(params).filter(keyParam => keyParam.includes('tenant'))[0];

// // Query attachments
// const querySelectorByStatus = {
//   tenantCarrier: ORDERS_BY_CARRIER_STATUS_CREATEDAT,
//   tenantSender: ordersBySenderStatusCreatedAt,
// }

// const querySelectorByCreatedAt = {
//   tenantCarrier: ORDERS_BY_CARRIER_CREATEDAT,
// }

// // Callers
// // Get --------------------------------------------------------------------------------------------------------------------------------
// export const getOrdersByTenantStatus = (params) => {
//   return ({
//     body: querySelectorByStatus[getTenantIdentifier(params)],
//     args: formatParamsOrdersByTenant(params, getTenantIdentifier(params))
//   })
// };

// export const getOrdersByTenantCreatedAt = (params) => {
//   return ({
//     body: querySelectorByCreatedAt[getTenantIdentifier(params)],
//     args: formatParamsOrdersByTenantCreatedAt(params, getTenantIdentifier(params))
//   })
// };