export const UPDATE_PALLET_HANDLING = /* GraphQL */ `
  mutation UpdatePalletHandling(
    $input: UpdatePalletHandlingInput!
    $condition: ModelPalletHandlingConditionInput
  ) {
    updatePalletHandling(input: $input, condition: $condition) {
      id
      stamp
    }
  }
`;