import { getThunkStatus } from "../../globals/libs/helpers";

// Mathcers -----------------------------------------------------------------------------------------------------------------------------------------------------
export function isEmployeeCreated(action) {
  if(action.type.includes('contacts/create') && getThunkStatus(action.type) === 'fulfilled') {
    console.log(action);
    return action.payload.employee;
  }
}

export function isEmployeeCreatedFromXls(action) {
  if(action.type.includes('contacts/create/xls') && getThunkStatus(action.type) === 'fulfilled') {
    let controller = false;
    for(let i = 0; i < action.payload.ids.length; i++) {
      if(controller === false && action.payload.entities[action.payload.ids[i]].employee === 1) {
        controller = true;
        break;
      } else {
        continue;
      }
    }

    return controller;
  }
}

export function isEmployeeDeleted(action) {
  if(action.type.includes('contacts/delete') && getThunkStatus(action.type) === 'fulfilled') {
    return parseInt(action.payload.contact.employee) === 1;
  }
}