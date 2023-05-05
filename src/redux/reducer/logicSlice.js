import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  logicInput: {
    model: 'basic'
  },
  logicOutput: {}
};


export const logicSlice = createSlice({
  name: 'memory',
  initialState,

  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    updateLogicInput: (state, action) => {
      state.logicInput = action.payload;
    },

    resetLogicInput: (state, action) => {
      state.logicInput = {};
    },

    updateLogicOutput: (state, action) => {
      state.logicOutput = action.payload;
    }
  },
});

export const { updateLogicInput, resetLogicInput, updateLogicOutput } = logicSlice.actions;

export const selectLogicInput = (state, action) => state.logic.logicInput;
export const selectLogicOutput = (state, action) => state.logic.logicOutput;

export default logicSlice.reducer;