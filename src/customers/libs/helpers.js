import { toast } from "react-toastify";

/*
  * Helpers
*/

// Applicato a useFormReducer per aggiungere logica custom nell'hook
export const customCustomerFormLogic = ({ type, value, name, updateState, }) => {  
  if(type === "custom") {
    if(name === "trades") {
      updateState(prevState => ({
        ...prevState,
        trades: value.map(val => val.text)
      }))
  
      return;
    }

    if(name === "relationships") {
      updateState(prevState => ({
        ...prevState,
        relationships: prevState.relationships?.includes(value)
          ? prevState.relationships.filter(rel => rel !== value)
          : prevState.relationships.concat(value)
      }))
  
      return;
    }

    if(name === "add-email") {
      updateState(prevState => ({
        ...prevState,
        emails: prevState.emails.concat({ name: "", value: "" })
      }))
  
      return;
    }
    
    if(name === "add-phone") {
      updateState(prevState => ({
        ...prevState,
        phones: prevState.phones.concat({ name: "", value: "" })
      }))
  
      return;
    }
    
    if(name === "change-email") {
      const { index, target, val } = value;
      updateState(prevState => ({
        ...prevState,
        emails: [
          ...prevState.emails.slice(0, index),
          {
            ...prevState.emails[index],
            [target]: val
          },
          ...prevState.emails.slice(index + 1)
        ]
      }))
    }
  
    if(name === "remove-email") {
      updateState(prevState => ({
        ...prevState,
        emails: [...prevState.emails.slice(0, value), ...prevState.emails.slice(value + 1)]
      }));
    }
    
    if(name === "change-phone") {
      const { index, target, val } = value;
      updateState(prevState => ({
        ...prevState,
        phones: [
          ...prevState.phones.slice(0, index),
          {
            ...prevState.phones[index],
            [target]: val
          },
          ...prevState.phones.slice(index + 1)
        ]
      }))
    }
  
    if(name === "remove-phone") {
      updateState(prevState => ({
        ...prevState,
        phones: [...prevState.phones.slice(0, value), ...prevState.phones.slice(value + 1)]
      }));
    }

    if(name === "location") {
      const clearLocation = () => {
        updateState((prevState) => ({
          ...prevState,
          city: "",
          address: "",
          location: {}
        }));
      } 
  
      if(value === null) {
        clearLocation();
      }
  
      if((!value?.city || !value?.address || !value?.place_id) && value !== null) {
        clearLocation();
        toast.error("La ricerca effettuata non ha prodotto i risultati desiderati");
      } else {
        updateState((prevState) => ({
          ...prevState,
          city: value?.city,
          address: value?.address,
          location: value
        }))
      }
    }

    if(name === "customCheckpoints") {
      updateState((prevState) => ({
        ...prevState,
        customCheckpoints: value
      }))
    }
  
  
    if(name === "override") {
      const validData = Object.fromEntries(Object.entries(value).filter(([_, v]) => v != null));
      updateState(({
        trades: validData?.customTrades || [],
        uniqueCode: validData?.customUniqueCode || "",
        customCheckpoints: validData?.customCheckpoints?.length > 0
          ? validData?.customCheckpoints.map(chk => ({
            ...chk,
            windows: reformattedWindows(chk.windows)
          }))
          : [],
        pec: validData?.customPec || "",
        relationships: validData?.relationships || [],
        emails: validData?.emails?.length > 0
          ?  validData.emails
          : [],
        phones: validData?.phones?.length > 0
          ?  validData.phones
          : [],
        checkpoints: validData?.checkpoints?.length > 0
          ? validData.checkpoints.map(chk =>  ({
            ...chk,
            contacts: chk.contacts?.length > 0
              ? chk.contacts
              : [],
            windows: chk.windows,
            location: {
              ...chk.location,
              coordinate: { 
                lat: chk.location.coordinate[0], 
                lng: chk.location.coordinate[1]
              }
            }
          }))
          : []
      }))
  
      return;
    }
  }

  return;
}

// Windows and checkpoints starter
export const reformattedWindows = (windows) => windows.length > 0
  ? windows.reduce((acc, val) => {
    return ({ 
      ...acc, 
      [val?.type || "CARICO"]: acc[val?.type || "CARICO"] 
        ? [...acc[val?.type || "CARICO"], val] 
        : [val]
    })
  }, {})
  : [];

// Checkpoint formatters
export const formatCustomCheckpointsBeforeSave = (customer) => {
  console.log("leggo formatCustomCheckpointsBeforeSave inizio:", customer)

  // Mappo i custom checkpoints qualora vi fosse la presenza di punti gestiti da terze parti
  let customCheckpoints = [];
  if(customer?.customCheckpoints?.length > 0) {
    console.log("entro perché ci sono i custom checkpoints");
    for(let checkpoint of customer.customCheckpoints){
      console.log("visualizzo il singolo checkpoint", checkpoint);
      if(checkpoint?.thirdCompany) {
        const { thirdCompany } = checkpoint;
        let checkpointToPush = { ...checkpoint };
        checkpointToPush.companyId = thirdCompany.company.id;
        checkpointToPush.companyOwner = thirdCompany.company.owner;
        checkpointToPush.companyName = thirdCompany.name;
        checkpointToPush.companyVatNumber = thirdCompany.company.vatNumber;
        delete checkpointToPush.thirdCompany;
        customCheckpoints.push(checkpointToPush);
      } else {
        customCheckpoints.push(checkpoint);
      }
    }
  }

  console.log("leggo formatCustomCheckpointsBeforeSave post:", customCheckpoints)
  
  return customCheckpoints;
}