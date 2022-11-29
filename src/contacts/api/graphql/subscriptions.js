export const onUpdateContact = `
  subscription onUpdateContact($tenant: ID!) {
    onUpdateContact(tenant: $tenant) {
      id
      tenant
      name
      email
      phone
      uniqueCode
      vatNumber
      pec
      sync
      employee
      job
      searchable
      invited
      avatar { identityId bucket region extension key timestamp }
      log { authorId author description timestamp }
      note
      type
    }
  }
`;

export const onCreateContact = `
  subscription onCreateContact($tenant: ID!) {
    onCreateContact(tenant: $tenant) {
      id
      tenant
      name
      phone
      email
      type
      uniqueCode
      vatNumber
      pec
      employee
      job
      searchable
      checkpoints {
        name
        location { region province city address coordinate place_id }
        contacts { contactId name email phone }
        windows { start end days type }
        maxLength
        tools
        note
      }
      avatar { identityId bucket region key extension timestamp }
      log { authorId author description timestamp }
      note
      sync
    }
  }
`;

export const onDeleteContact = `
  subscription onDeleteContact($tenant: ID!) {
    onDeleteContact(tenant: $tenant) {
      id
      tenant
      name
      employee
      log { authorId author description timestamp }
    }
  }
`;