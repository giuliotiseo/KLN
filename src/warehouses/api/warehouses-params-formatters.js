export function formatParamsWarehousesByTenantStatus(params) {
  return {
    tenant: params.tenant,
    statusSearchable:{
      beginsWith: {
        status: params.status,
        searchable: params.searchable
      }
    },
    filter: params?.filter,
    limit: params?.limit,
    nextToken: params?.nextToken 
  }
}