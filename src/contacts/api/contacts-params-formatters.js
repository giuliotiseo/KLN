export function formatParamsEmployeesByType(params) {
  return {
    tenant: params.tenant,
    employeeTypeSearchable:{
      beginsWith: {
        employee: 1,
        type: params.type,
        searchable: params.searchable
      }
    },
    filter: params?.filter,
    limit: params?.limit,
    nextToken: params?.nextToken 
  }
}

export function formatContactsByTypeName(params) {
  return {
    tenant: params.tenant,
    typeSearchable: {
      beginsWith: {
        type: params.type,
        searchable: params.searchable
      }
    },
    filter: params?.filter,
    limit: params?.limit,
    nextToken: params?.nextToken 
  }
}