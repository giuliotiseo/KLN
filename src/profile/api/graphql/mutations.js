export const UPDATE_PROFILE = /* GraphQL */ `
  mutation UpdateProfile(
    $input: UpdateProfileInput!
    $condition: ModelProfileConditionInput
  ) {
    updateProfile(input: $input, condition: $condition) {
      id
      username
      fiscalCode
      email
      searchable
      name
      surname
      phone
      avatar {
        filename
        identityId
        bucket
        region
        key
        extension
        timestamp
      }
      deviceId
      owner
      tenant
      roleIds
      psw
      refreshTokens
      note
      log {
        authorId
        author
        description
        timestamp
      }
      createdAt
      updatedAt
      company { id name vatNumber companyCode }
    }
  }
`;


export const UPDATE_AVATAR = `
mutation UpdateProfile($input: UpdateProfileInput!) {
  updateProfile(input: $input) {
    username
    avatar {
      identityId
      bucket
      region
      key
    }
  }
}`

export const UPDATE_PROFILE_LOCATION = `
mutation UpdateProfile($input: UpdateProfileInput!) {
  updateProfile(input: $input) {
    username
    location {
      region
      province
      city
      address
      coordinate
    }
  }
}`

export const UPDATE_PROFILE_NOTE = `
mutation UpdateProfile($input: UpdateProfileInput!) {
  updateProfile(input: $input) {
    username
    note
  }
}`

export const UPDATE_PROFILE_INFO = `
mutation UpdateProfile($input: UpdateProfileInput!) {
  updateProfile(input: $input) {
    username
    name
    phone
    searchable
  }
}`