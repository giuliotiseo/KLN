import { createSlice } from "@reduxjs/toolkit";
import { capitalize } from "../../globals/libs/helpers";

const initialState = {}
export const customerEditorSlice = createSlice({
  name: "customerEditorSlice",
  initialState,
  reducers: {
    // Reset
    resetCustomerEditor: () => initialState,
    // Basic changes related to order
    changeCustomerEditorWindows(state, { payload }) {
      const { index, windowType, value, name } = payload;
      let windows = { ...payload.windows };
      if(name === "days") {
        windows[windowType] = [
          ...windows[windowType].slice(0, index),
          {
            ...windows[windowType][index],
            [name]: windows[windowType][index].days.includes(value)
              ? windows[windowType][index].days.filter(day => day !== value)
              : windows[windowType][index].days.concat(value)
          },
          ...windows[windowType].slice(index + 1)
        ];
      } else {
        windows[windowType] = [
          ...windows[windowType].slice(0, index),
          {
            ...windows[windowType][index],
            [name]: value
          },
          ...windows[windowType].slice(index + 1)
        ];
      }

      state.windows = windows;
    },
    changeCustomerEditorJob(state, { payload }) {
      if(state.jobId === payload.id) {
        state.job = {}
        state.jobId = "";
      } else {
        state.jobId = payload.id;
        state.job = {
          id: payload.id,
          name: payload.name
        }
      }
    },
    changeCustomerEditorEmployee(state, { payload }) {
      state.employee = payload.employee;
      state.job = payload.job
      state.jobId = payload?.job?.id || "";
    },
    changeCustomerRelationships(state, { payload }) {
      console.log("Posso vedere payload", payload);
      console.log(typeof payload);

      state.relationships = new Array(payload);
    },
    // Content editor
    changeCustomerEditorForm(state, { payload }) {
      if(payload.type === "custom") {
        if(payload.name === "trades") {
          state.trades = payload.value.map(val => val.text);
        }

        if(payload.name === "relationships") {
          const { value, customer } = payload;
          let relationships = customer?.relationships && customer?.relationships?.length > 0
            ? [...customer.relationships ]
            : [];
          
          if(relationships.includes(value)) {
            const indexToExclude = relationships.indexOf(value);
            relationships.splice(indexToExclude, 1);
          } else {
            relationships.push(value);
          }
  
          state.relationships = relationships;
        }

        if(payload.name === "add-email") {
          const { customer } = payload;
          let emails = customer?.emails && customer?.emails?.length > 0
            ? [...customer.emails ]
            : [];

          emails.push({ name: "", value: "" });
          state.emails = emails;
        }

        if(payload.name === "add-phone") {
          const { customer } = payload;
          let phones = customer?.phones && customer?.phones?.length > 0
            ? [...customer.phones ]
            : [];

          phones.push({ name: "", value: "" });
          state.phones = phones;
        }

        if(payload.name === "change-email") {
          const { customer } = payload;
          const { index, target, val } = payload.value;
          state.emails = [
            ...customer.emails.slice(0, index),
            {
              ...customer.emails[index],
              [target]: val
            }, 
            ...customer.emails.slice(index + 1)
          ]
        }

        if(payload.name === "change-phone") {
          const { customer } = payload;
          const { index, target, val } = payload.value;
          state.phones = [
            ...customer.phones.slice(0, index),
            {
              ...customer.phones[index],
              [target]: val
            }, 
            ...customer.phones.slice(index + 1)
          ]
        }

        if(payload.name === "remove-email") {
          let emails = payload.customer.emails;
          emails = [...emails.slice(0, payload.value), ...emails.slice(payload.value + 1)];
          state.emails = emails;
        }

        if(payload.name === "remove-phone") {
          let phones = payload.customer.phones;
          phones = [...phones.slice(0, payload.value), ...phones.slice(payload.value + 1)];
          state.phones = phones;
        }

        if(payload.name === "customCheckpoints") {
          state.customCheckpoints = payload.value;
        }

        // exit from custom code (react reducer legacy)
        return
      }


      if(payload.type !== "custom") {
        state[payload.name] = payload.value 
      }
    },
  },
})

// Export actions -----------------------------------------------------------------------------------------------------------------------------------------------------
export const {
  resetCustomerEditor,
  changeCustomerEditorJob,
  changeCustomerEditorEmployee,
  changeCustomerEditorWindows,
  changeCustomerRelationships,
  changeCustomerEditorForm,
} = customerEditorSlice.actions;

// Export selectors -----------------------------------------------------------------------------------------------------------------------------------------------------
export const selectCustomerEditor = ({ customers: { editor }}) => editor;
export const selectCustomerEditedAttributes = ({ customers: { editor }}) => {
  let dataToSend = { ...editor }

  const keys = Object.keys(dataToSend);
  const attrToRearrange = ["trades", "pec", "uniqueCode"];
  const attrToFilterFromImported = ["emails", "phones"];

  for(let attr of attrToRearrange) {
    if(keys.includes(attr)) {
      dataToSend[`custom${capitalize(attr)}`] = editor[attr];
      delete dataToSend[attr]; 
    }
  }

  for(let attr of attrToFilterFromImported) {
    if(keys.includes(attr)) {
      dataToSend[`custom${capitalize(attr)}`] = editor[attr].filter(item => !item.imported);
      delete dataToSend[attr]; 
    }
  }

  if(editor?.relationships) {
    dataToSend.isSender = editor.relationships.includes("SENDER") ? 1 : 0;
    dataToSend.isReceiver = editor.relationships.includes("RECEIVER") ? 1 : 0;
    dataToSend.isCarrier = editor.relationships.includes("CARRIER") ? 1 : 0;
  }

  if(dataToSend?.customCheckpoints?.length > 0) {
    let chks = [];

    dataToSend.customCheckpoints.forEach((checkpoint) => {  
      if(checkpoint?.thirdCompany?.company?.owner) {
        checkpoint = {
          ...checkpoint,
          thirdCompanyId: checkpoint.thirdCompany.company.id,
          thirdCompanyOwner: checkpoint.thirdCompany.company.owner,
          thirdCompanyName: checkpoint.thirdCompany.name,
          thirdCompanyVat: checkpoint.thirdCompany.vatNumber,
        }

        delete checkpoint.thirdCompany;
      } else if(checkpoint?.thirdCompany === null) {
        checkpoint = {
          ...checkpoint,
          thirdCompanyId: "",
          thirdCompanyOwner: "",
          thirdCompanyName: "",
          thirdCompanyVat: "",
        }
      }

      chks.push(checkpoint);
    });

    dataToSend.customCheckpoints = chks;
  }

  return dataToSend;
} 

// Reducer export -----------------------------------------------------------------------------------------------------------------------------------------------------
export default customerEditorSlice.reducer;