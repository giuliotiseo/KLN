export const GET_COMPANY_BY_ID = /* GraphQL */ `
  query GetCompany($id: ID!) {
    getCompany(id: $id) {
      id
      vatNumber
      address
    }
  }
`;
