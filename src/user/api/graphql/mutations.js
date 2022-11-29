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