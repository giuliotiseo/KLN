import { getThunkStatus } from "../../globals/libs/helpers";

export function isStorekeeperDeleted(action) {
  if(action.type.includes('contacts/delete') && getThunkStatus(action.type) === 'fulfilled') {
    return action.payload.changes.warehouses.length > 0;
  }
}
