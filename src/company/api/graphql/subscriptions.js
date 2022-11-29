export const onUpdateCompany = `
  subscription OnUpdateCompany($companyId: ID!) {
    onUpdateCompany(companyId: $companyId) {
      companyId
      logo { identityId bucket region key extension timestamp }
      email
      phone
      type
      vatNumber
      tag
      name
      uniqueCode
      pec
      trades
      log { authorId author description timestamp }
    }
  }
`;