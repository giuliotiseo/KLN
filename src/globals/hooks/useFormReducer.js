import { useCallback, useReducer } from "react";
import produce from "immer";
import { set, has } from "lodash";

// Functions -------------------------------------------------------------------------------------------------------------------------------------
function enhancedReducer(state, updateArg) {
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

function updateFormLogic({ initialState, name, type, value, updateState, customFormLogic, state }) {
  const updatePath = name.split(".");

  // if the input is a checkbox then use callback function to update
  // the toggle state based on previous state
  if (type === 'checkbox') {
    updateState((prevState) => ({
      [name]: !prevState[name]
    }))

    return;
  }

  if(type === "reset") {
    updateState({ ...initialState });
    return;
  }

  // Custom form logic
  if(customFormLogic && type === "custom") {
    customFormLogic({ name, type, value, updateState, state });
    return;
  }

  // if we have to update the root level nodes in the form
  if (updatePath.length === 1) {
    const [key] = updatePath;
    let outputValue = value && value.constructor === Object ? { ...value } : value;
    updateState({ [key]: outputValue });
  }

  // use _path and _value to update them.
  if (updatePath.length === 2) {
    updateState({
      _path: updatePath,
      _value: value
    });
  }
}

// Main hook ------------------------------------------------------------------------------------------------------------------------------------------------
const useFormReducer = (initialState, customFormLogic = null) => {
  const [ state, updateState ] = useReducer(enhancedReducer, initialState);

  //  Global form update
  const updateForm = useCallback(({ value, name, type }) => {
    updateFormLogic({ initialState, name, type, value, updateState, customFormLogic });
  }, []); 

  return [ state, updateForm ];
}

export default useFormReducer;