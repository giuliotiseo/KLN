/* - Contact ----------------------------------------------------------------------------------- */
export const CREATE_CONTACT = /* GraphQL */ `
  mutation CreateContact(
    $input: CreateContactInput!
    $condition: ModelContactConditionInput
  ) {
    createContact(input: $input, condition: $condition) {
      id
      tenant
      companyId
      name
      surname
      searchable
      fiscalCode
      phone
      email
      type
      avatar { filename identityId bucket region key extension timestamp }
      employee
      jobName
      jobId
      job { id name }
    }
  }
`;

export const UPDATE_CONTACT = /* GraphQL */ `
  mutation UpdateContact(
    $input: UpdateContactInput!
    $condition: ModelContactConditionInput
  ) {
    updateContact(input: $input, condition: $condition) {
      id
      companyId
      tenant
      name
      surname
      searchable
      fiscalCode
      phone
      email
      type
      avatar { filename identityId bucket region key extension timestamp }
      createdAt
      updatedAt
      employee
      jobName
      invited
      log { authorId author description timestamp }
      windows { start end days type }
      note
      jobId
      job {
        id
        companyCode
        vatNumber
        name
        fiscalCode
        location { place_id region province city }
      }
    }
  }
`;

export const DELETE_CONTACT = /* GraphQL */ `
  mutation DeleteContact($input: DeleteContactInput!) {
    deleteContact(input: $input) {
      id
      companyId
      name
      employee
      log { authorId author description timestamp }
    }
  }
`;


export const UPDATE_INVITE_STATUS = `
  mutation UpdateContact($input: UpdateContactInput!) {
    updateContact(input: $input) {
      id
      tenant
      name
      email
      invited
    }
  }
`;


export const UPDATE_CONTACT_TAG = `
  mutation UpdateContact($input: UpdateContactInput!) {
    updateContact(input: $input) {
      id
      tenant
      name
      tag
    }
  }
`;

export const UPDATE_CONTACT_LOCATIONS = `
  mutation UpdateContact($id: ID!, $tenant: ID, $checkpoints: [CheckpointInput]) {
    updateContact(input: { id: $id, tenant: $tenant, checkpoints: $checkpoints }) {
      id
      name
      tenant
      checkpoints {
        warehouseId
        extId
        name
        location { region province city address coordinate place_id }
        contacts { contactId name email phone job }
        windows { start end days type }
        maxLength
        tools
        note
      }
      log { authorId author description timestamp }
    }
  }
`