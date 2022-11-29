import { createSlice } from "@reduxjs/toolkit";
import { addFileToCheckCreatorThunk, addImageToCheckCreatorThunk } from "../api/check-thunks";
import { isCheckDateChangedFromCreator, isCheckIbanChangedFromCreator } from "./matchers";
import { checkIbanValidity, checkValidityDate } from "./validation";

// Slice reducer -----------------------------------------------------------------------------------------------------------------------------------------------------
const initialContentState = {
  issuingDate: null,
  pickupDate: null,
  checkInDate: null,
  checkOutDate: null,
  deliveryDate: null,
  checkNum: "",
  iban: "",
  status: "PENDING",
  expiration: null,
  beneficiary: "",
  amount: "",
  image: null,
  files: [],
  status: "PENDING",
  note: "",
}

const initialState = {
  order: null,
  keyDocNum: "",
  docsRef: [],
  ...initialContentState,
}

export const checkCreatorSlice = createSlice({
  name: "checkCreatorSlice",
  initialState,
  reducers: {
    // Order refs
    changeCheckCreatorCheckOrder(state, { payload }) {
      if(!payload) return;
      state.order = payload;
    },
    changeCheckCreatorDocsRef(state, { payload }) {
      const ids = state.docsRef?.length > 0 ? state.docsRef.map(doc => doc.id) : [];
      if(ids.length > 0) {
        if(ids.includes(payload.id)) {
          state.docsRef = state.docsRef.filter(({ id }) => id !== payload.id);
          state.keyDocNum = payload.id.includes(state.keyDocNum) 
            ? state.docsRef?.[0]?.number || null
            : state.keyDocNum;
        } else {
          state.docsRef = state.docsRef.concat(payload);
        }
      } else {
        state.docsRef = [payload];
        state.keyDocNum = payload.number; 
      }
    },
    changeCheckCreatorKeyDocNum(state, { payload }) {
      const validKeyDocNum = state.docsRef?.length > 0 
        ? state.docsRef.filter(doc => doc.id.includes(payload)).length 
        : false;

        if(validKeyDocNum) {
          state.keyDocNum = payload;
        }
    },
    changeCheckCreatorForm(state, { payload: { id, value }}) {
      state[id] = value
    },
    // Dates
    changeCheckCreatorIssuingDate(state, { payload }) {
      state.issuingDate = payload;
    },
    changeCheckCreatorPickupDate(state, { payload }) {
      state.pickupDate = payload;
    },
    changeCheckCreatorCheckInDate(state, { payload }) {
      state.checkInDate = payload;
    },
    changeCheckCreatorCheckOutDate(state, { payload }) {
      state.checkOutDate = payload;
    },
    changeCheckCreatorDeliveryDate(state, { payload }) {
      state.deliveryDate = payload;
    },
    // Content
    changeCheckCreatorExpiration(state, { payload }) {
      state.expiration = payload;
    },
    changeCheckCreatorCheckNum(state, { payload }) {
      state.checkNum = payload;
    },
    changeCheckCreatorAmount(state, { payload }) {
      state.amount = payload;
    },
    changeCheckCreatorIban(state, { payload }) {
      state.iban = payload;
    },
    changeCheckCreatorBeneficiary(state, { payload }) {
      state.beneficiary = payload;
    },
    changeCheckCreatorCheckNote(state, { payload }) {
      state.note = payload;
    },
    // Attachements
    removeCheckCreatorImage(state, { payload }) {
      state.image = {
        keyToRemove: payload.db_format.key,
        raw_format: null,
        db_format: null,
        online: false,
      }
    },
    removeCheckCreatorFile(state, { payload: { indexToRemove }}) {
      state.files = [...state.files.slice(0, indexToRemove), ...state.files.slice(indexToRemove, state.files.length - 1)]
      // state.files = files.reduce((acc, val, index) => {
      //   if(index === indexToRemove) {
      //     return val.online
      //     ? [
      //         ...acc ,
      //         { ...val, keyToRemove: val.db_format.key }
      //       ]
      //     : [ ...acc ]
      //   } else {
      //     return [...acc, { ...val }]
      //   }
      // }, [])
    },
    // Reset fields
    resetCheckCreatorOrder: () => initialState,
    resetCheckCreatorContent: (state) => ({
      ...initialContentState,
      order: state.order,
      keyDocNum: state.keyDocNum,
      docsRef: state.docsRef,
    }),
  },
  extraReducers(builder) {
    builder
    .addCase(addImageToCheckCreatorThunk.fulfilled, (state, { payload }) => {
      if(!payload) return null;
      state.image = { ...payload }
    })
    .addCase(addFileToCheckCreatorThunk.fulfilled, (state, { payload }) => {
      if(!payload) return null;
      state.files = state.files.concat(payload)
    })
    // Matchers for validations -----------------------------------------------------------------------------------------------------------------------------------------------------
    .addMatcher(isCheckDateChangedFromCreator, (state, { payload }) => {
      const result = checkValidityDate(payload);
      state.validation = { ...state?.validation, [result.id]: result }
    })
    .addMatcher(isCheckIbanChangedFromCreator, (state, { payload }) => {
      const result = checkIbanValidity(payload);
      state.validation = { ...state?.validation, [result.id]: result }
    })
  }
})

// Export actions -----------------------------------------------------------------------------------------------------------------------------------------------------
export const {
  changeCheckCreatorCheckOrder,
  changeCheckCreatorDocsRef,
  changeCheckCreatorKeyDocNum,
  changeCheckCreatorForm,
  changeCheckCreatorIssuingDate,
  changeCheckCreatorPickupDate,
  changeCheckCreatorCheckInDate,
  changeCheckCreatorCheckOutDate,
  changeCheckCreatorDeliveryDate,
  changeCheckCreatorExpiration,
  changeCheckCreatorCheckNum,
  changeCheckCreatorAmount,
  changeCheckCreatorIban,
  changeCheckCreatorBeneficiary,
  changeCheckCreatorNote,
  removeCheckCreatorImage,
  removeCheckCreatorFile,
  resetCheckCreatorOrder,
  resetCheckCreatorContent,
} = checkCreatorSlice.actions;

// Export selectors -----------------------------------------------------------------------------------------------------------------------------------------------------
export const selectCheckCreator = ({ checks: { creator } }) => creator;
// export const selectCheckCreatorCheckIn = ({ checks: { creator } }) => creator;
export const selectCheckCreatorOrderRef = ({ checks: { creator } }) => creator?.order;
export const selectCheckCreatorOrderDocsRef = ({ checks: { creator } }) => creator?.docsRef;
export const selectCheckCreatorKeyDocNum = ({ checks: { creator } }) => creator.keyDocNum;
export const selectCheckCreatorIssuingDate = ({ checks: { creator } }) => creator.issuingDate;
export const selectCheckCreatorPickupDate = ({ checks: { creator } }) => creator.pickupDate;
export const selectCheckCreatorCheckInDate = ({ checks: { creator } }) => creator.checkInDate;
export const selectCheckCreatorCheckOutDate = ({ checks: { creator } }) => creator.checkOutDate;
export const selectCheckCreatorDeliveryDate = ({ checks: { creator } }) => creator.deliveryDate;
export const selectCheckCreatorExpiration = ({ checks: { creator } }) => creator.expiration;
export const selectCheckCreatorCheckNum = ({ checks: { creator } }) => creator.checkNum;
export const selectCheckCreatorAmount = ({ checks: { creator } }) => creator.amount;
export const selectCheckCreatorIban = ({ checks: { creator } }) => creator.iban;
export const selectCheckCreatorBeneficiary = ({ checks: { creator } }) => creator.beneficiary;
export const selectCheckCreatorNote = ({ checks: { creator } }) => creator.note;
export const selectCheckCreatorImage = ({ checks: { creator } }) => creator.image?.raw_format;
export const selectCheckCreatorFiles = ({ checks: { creator } }) => creator.files.map(file => file.raw_format);
export const selectCheckCreatorFields = ({ checks: { creator } }) => {
  return {
    issuingDate: creator.issuingDate,
    pickupDate: creator.pickupDate,
    checkInDate: creator.checkInDate,
    checkOutDate: creator.checkOutDate,
    deliveryDate: creator.deliveryDate,
    checkNum: creator.checkNum,
    iban: creator.iban,
    expiration: creator.expiration,
    beneficiary: creator.beneficiary,
    amount: creator.amount,
    note: creator.note,
    iban_status: creator.iban_status,
    image: creator.image?.raw_format,
    files: creator.files.map(file => file.raw_format)
  }
};


// Reducer export -----------------------------------------------------------------------------------------------------------------------------------------------------
export default checkCreatorSlice.reducer;