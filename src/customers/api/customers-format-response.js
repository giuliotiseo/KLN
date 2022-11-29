import { formatLocationCoords, formatWindowsToApp, removeDuplicates, removeDuplicatesFromArrayOfObj } from "../../globals/libs/helpers";
import { starterWindow } from "../libs/constants";
import { reformattedWindows } from "../libs/helpers";

export const formatCustomerByIdResponse = (response) => {
  const { company } = response;
  console.log("Company", response);
  
  const companyWarehouses  = company.warehouses?.items?.length > 0 
    ? company.warehouses.items.map(warehouse => {
      return warehouse?.warehouseLink?.companyOwner
        ? ({
          ...warehouse,
          remote: true,
          thirdCompanyId: warehouse.warehouseLink.companyOwner.id,
          thirdCompanyName: warehouse.warehouseLink.companyOwner.name,
          thirdCompanyOwner: warehouse.warehouseLink.companyOwner.owner,
          thirdCompanyVat: warehouse.warehouseLink.companyOwner.vatNumber,
        })
        : ({ ...warehouse, remote: true })
      })
    : []; 

  const trades = [].concat(...(response?.customTrades || [])).concat(...(company?.trades || []));

  let customCheckpoints = response.customCheckpoints?.length > 0
    ? response.customCheckpoints.map(customCheckpoint => ({
      ...customCheckpoint,
      status: 'ACTIVE',
      thirdCompany: customCheckpoint?.thirdCompanyOwner 
        ? {
          id: customCheckpoint?.thirdCompanyId,
          name: customCheckpoint?.thirdCompanyName,
          vatNumber: customCheckpoint?.thirdCompanyVat,
          company: { 
            id: customCheckpoint?.thirdCompanyId,
            name: customCheckpoint?.thirdCompanyName,
            owner: customCheckpoint?.thirdCompanyOwner,
            vatNumber: customCheckpoint?.thirdCompanyVat,
          }
        }
        : []
      }))
    : [];

  const warehouses = [].concat(...companyWarehouses).concat(...customCheckpoints);
  for(let warehouse of warehouses) {
    warehouse.location = {
      ...warehouse.location,
      coordinate: formatLocationCoords(warehouse.location.coordinate)
    };

    if(warehouse?.windows?.length > 0) {
      warehouse.windows = formatWindowsToApp(warehouse.windows)
    } else {
      reformattedWindows([{ ...starterWindow, type: "CARICO" }, { ...starterWindow, type: "SCARICO" }])
    }
  }

  return ({
    ...response,
    address: company?.location?.address,
    location: company?.location,
    fiscalCode: company?.fiscalCode,
    trades: removeDuplicates(trades),
    phones: removeDuplicatesFromArrayOfObj([...response.customPhones, ...response.company.phones.map(data => ({...data, imported: true })) ]),
    emails: removeDuplicatesFromArrayOfObj([...response.customEmails, ...response.company.emails.map(data => ({...data, imported: true })) ]),
    pec: company?.pec || response?.customPec || "",
    uniqueCode: company?.uniqueCode || response?.customUniqueCode || "",
    customCheckpoints,
    warehouses,
    company: {
      ...company,
      warehouses: company.warehouses?.items?.length > 0
        ? company.warehouses.items.map(warehouse => ({
          ...warehouse,
          windows: formatWindowsToApp(warehouse.windows),
          location: {
            ...warehouse.location,
            coordinate: formatLocationCoords(warehouse.location.coordinate)
          }
        }))
        : []
    }
  })
}