import produce from "immer";
import { set, has } from "lodash";
import { toast } from "react-toastify";
import { ROLES } from "../../globals/libs/helpers";

// Reducer for main state in CreateContactContainer ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export const initialState = {
  // Company
  companyName: "",
  vatNumber: "",
  companyType: "TRANSPORT",
  companyFiscalCode: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  location: {},
  // Admin profile
  profileName: "",
  profileFiscalCode: "",
  profileSurname: "",
  profileRole: ROLES.ADMIN,
  // Account
  username: "",
  password: "",
  confirmPassword: "",
};

export function enhancedUserReducer(state, updateArg) {
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

export function updateUserSignUpFormLogic ({ name, type, value, updateUserState }) {
  const updatePath = name.split(".");

  // if the input is a checkbox then use callback function to update
  // the toggle state based on previous state
  if (type === 'checkbox') {
    updateUserState((prevState) => ({
      [name]: !prevState[name]
    }))

    return;
  }

  if(type === "location") {
    const clearLocation = () => {
      updateUserState((prevState) => ({
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
      updateUserState((prevState) => ({
        ...prevState,
        city: value?.city,
        address: value?.address,
        location: value
      }))
    }
  }

  // if we have to update the root level nodes in the form
  if (updatePath.length === 1) {
    const [key] = updatePath;
    let outputValue = value && value.constructor === Object ? { ...value } : value;
    updateUserState({ [key]: outputValue });
  }

  // use _path and _value to update them.
  if (updatePath.length === 2) {
    updateUserState({
      _path: updatePath,
      _value: value
    });
  }
}