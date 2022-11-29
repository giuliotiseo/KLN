import { v4 } from "uuid"
import { formatWindowsToDynamoDb } from "../../globals/libs/helpers"
import { formatLocationCoords } from "../../warehouses/libs/helpers"

// Create --------------------------------------------------------------------------------------------------------------------------------
export const createCustomerFormatter = (params) => {
  return {
    input: {
      ...params,
      customCheckpoints: params?.customCheckpoints?.length > 0
        ? params.customCheckpoints.map(chk => ({
          extId: v4(),
          name: chk?.name,
          location: {
            ...chk.location,
            coordinate: chk?.location?.coordinate ? formatLocationCoords(chk.location.coordinate) : []
          },
          thirdCompanyId: chk?.companyId,
          thirdCompanyOwner: chk?.companyOwner,
          thirdCompanyName: chk?.companyName,
          thirdCompanyVat: chk?.companyVatNumber,
          contacts: chk.contacts?.length 
            ? chk.contacts.map(referent => ({
                contactId: referent?.contactId || v4(),
                name: referent?.name,
                email: referent?.email,
                phone: referent?.phone,
                job: referent?.job
              }))
            : [],
          windows: chk?.windows ? formatWindowsToDynamoDb(chk.windows).filter(wind => wind?.start && wind?.end && wind?.days?.length >= 0) : [],
          maxLength: chk?.maxLength,
          tools: chk?.tools,
          cargoBay: chk?.cargoBay || 0,
          trades: chk?.trades || [],
          containerUnloading: chk?.containerUnloading || false,
          note: chk?.note
        })) 
        : []
    }
  }
}

export const createCustomerCompanyFormatter = (params) => {
  return {
    input: { ...params }
  }
}


// Update --------------------------------------------------------------------------------------------------------------------------------
export const updateCustomerFormatter = (params) => {
  let dataToSend = {
    input: { ...params }
  };

  if(Object.keys(params).includes("customCheckpoints")) {
    dataToSend.input.customCheckpoints = params?.customCheckpoints?.length > 0
      ? params.customCheckpoints.map(chk => ({
        name: chk?.name,
        extId: chk?.extId,
        thirdCompanyId: chk?.thirdCompanyId || "",
        thirdCompanyOwner: chk?.thirdCompanyOwner || "",
        thirdCompanyName: chk?.thirdCompanyName || "",
        thirdCompanyVat: chk?.thirdCompanyVat || "",
        location: {
          ...chk.location,
          coordinate: chk?.location?.coordinate ? formatLocationCoords(chk.location.coordinate) : []
        },
        contacts: chk.contacts?.length 
          ? chk.contacts.map(referent => ({
              contactId: referent?.contactId || v4(),
              name: referent?.name,
              email: referent?.email,
              phone: referent?.phone,
              job: params.name
            }))
          : [],
        windows: chk?.windows ? formatWindowsToDynamoDb(chk.windows) : [],
        maxLength: chk?.maxLength,
        tools: chk?.tools,
        note: chk?.note
      })) 
    : []
  }

  return dataToSend;
}
