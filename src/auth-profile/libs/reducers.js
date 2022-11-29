import produce from "immer";
import { set, has } from "lodash";
import { ROLES } from "../../globals/libs/helpers";

// Reducer for main state in AddProfileContainer ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export const initialState = {
  avatar: null,
  name: "",
  surname: "",
  email: "",
  phone: "",
  fiscalCode: "",
  roleIds: [ROLES.ADMIN]
};

export function enhancedProfileReducer(state, updateArg) {
  // check if the type of update argument is a callback function
  if (updateArg.constructor === Function) {
    return { ...state, ...updateArg(state) };
  }

  // if the type of update argument is an object
  if (updateArg.constructor === Object) {
    // does the update object have _path and _value as it's keys
    // if yes then use them to update deep object values
    if (has(updateArg, "_path") && has(updateArg, "_value")) {
      const { _path, _value } = updateArg;
      return produce(state, draft => {
        set(draft, _path, _value);
      });
    } else {
      return { ...state, ...updateArg };
    }
  }
};

export function updateAddProfileFormLogic ({ name, type, value, updateProfileState }) {
  const updatePath = name.split(".");
  if(type === 'initialSet') {
    updateProfileState(() => ({
      name: value.name,
      surname: value.surname,
      avatar: value?.avatar,
      email: value.email,
      phone: value?.phone,
      fiscalCode: value?.fiscalCode,
      roleIds: value.roleIds,
      isPsw: value?.psw ? true : false
    }))

    return;
  }


  // if the input is a checkbox then use callback function to update
  // the toggle state based on previous state
  if (type === 'checkbox') {
    updateProfileState((prevState) => ({
      roleIds: prevState.roleIds.includes(value) 
        ? prevState.roleIds.filter(el => el !== value) 
        : prevState.roleIds.concat(value)
    }))

    return;
  }

  // if we have to update the root level nodes in the form
  if (updatePath.length === 1) {
    const [key] = updatePath;
    let outputValue = value && value.constructor === Object ? { ...value } : value;
    updateProfileState({ [key]: outputValue });
  }

  // use _path and _value to update them.
  if (updatePath.length === 2) {
    updateProfileState({
      _path: updatePath,
      _value: value
    });
  }
}