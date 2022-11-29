// Update --------------------------------------------------------------------------------------------------------------------------------
export const updateProfileFormatter = (params) => {
  let dataToSend = { ...params };
  if(Object.keys(params).includes("name") && Object.keys(params).includes("surname")) {
    dataToSend.searchable = `${params.name.toLowerCase()} ${params.surname.toLowerCase()}`;
  }

  return {
    input: dataToSend
  }
}
