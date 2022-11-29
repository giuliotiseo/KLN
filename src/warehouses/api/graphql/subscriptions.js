export const onUpdateWarehouse = `
  subscription onUpdateWarehouse($tenant: ID!) {
    onUpdateWarehouse(tenant: $tenant) {
      id
      tenant
      name
      searchable
      type
      location { region province city address coordinate }
      log { authorId author description timestamp }
      status
      contactIds
      contacts { contactId name email phone}
      specialization
      scope
      maxLength 
      tools
      automationLevel
      note
    }
  }
`;

export const onCreateWarehouse = `
  subscription onCreateWarehouse($tenant: ID!) {
    onCreateWarehouse(tenant: $tenant) {
      id
      tenant
      name
      searchable
      type
      location { region province city address coordinate }
      log { authorId author description timestamp }
      status
      contactIds
      contacts { contactId name email phone}
      specialization
      scope
      maxLength
      
      tools
      automationLevel
      note
    }
  }
`;

export const onDeleteWarehouse = `
  subscription onDeleteWarehouse($tenant: ID!) {
    onDeleteWarehouse(tenant: $tenant) {
      id
      name
      tenant
      log { authorId author description timestamp }
    }
  }
`;