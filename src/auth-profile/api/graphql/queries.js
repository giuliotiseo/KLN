export const LIST_PROFILES = /* GraphQL */ `
  query ListProfiles(
    $filter: ModelProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProfiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        companyId
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
        tenant
        company {
          id
          companyCode
          vatNumber
          name
          fiscalCode
          city
          address
          uniqueCode
          pec
          trades
          type
          createdAt
          updatedAt
        }
        roleIds
        psw
        note
        refreshTokens
        log {
          authorId
          author
          description
          timestamp
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;