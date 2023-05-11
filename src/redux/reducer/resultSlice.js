import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  saveResult: [],
  saveMultipleResults: [],
};


export const resultSlice = createSlice({
  name: 'result',
  initialState,

  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    updateSaveResult: (state, action) => {
      const temp = JSON.parse(JSON.stringify(state.saveResult));
      const findExist = temp.find((item) => item?.name === action.payload.name)
      if (!findExist) {
        temp.push(action.payload)
      }
      state.saveResult = temp;
    },

    removeSavedResult: (state, action) => {
      const temp = JSON.parse(JSON.stringify(state.saveResult));
      temp.splice(action.payload, 1);
      state.saveResult = temp;
    },

    updateSaveMultipleResults: (state, action) => {
      const temp = JSON.parse(JSON.stringify(state.saveMultipleResults));
      const findExist = temp.find((item) => item?.name === action.payload.name)
      if (!findExist) {
        temp.push(action.payload)
      }
      state.saveMultipleResults = temp;
    },

    removeSavedMultipleResults: (state, action) => {
      const temp = JSON.parse(JSON.stringify(state.saveMultipleResults));
      temp.splice(action.payload, 1);
      state.saveMultipleResults = temp;
    }
  },
});

export const {
  updateSaveResult,
  removeSavedResult,
  updateSaveMultipleResults,
  removeSavedMultipleResults
} = resultSlice.actions;

export const selectSavedResult = (state) => state.result.saveResult;
export const selectMultipleSavedResult = (state) => state.result.saveMultipleResults;

export default resultSlice.reducer;