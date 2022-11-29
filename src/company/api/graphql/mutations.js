export const UPDATE_COMPANY_INFO = `
  mutation UpdateCompanyInfo($companyId: ID!, $logo: S3ObjectInput, $email: String, $phone: String, $uniqueCode: String, $pec: String, $log: [LogInput]) {
    updateCompany(input: { companyId: $companyId, logo: $logo, email: $email, phone: $phone, pec: $pec, uniqueCode: $uniqueCode, log: $log }) {
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