import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  memoryInput: {
    model: 'basic',
    tech: '12LPP',
    banksType: 'specific',
    muxType: 'specific',
  },
  memoryOutput: {},
  multipleOutput: [],
};


export const memorySlice = createSlice({
  name: 'memory',
  initialState,

  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    updateMemoryInput: (state, action) => {
      state.memoryInput = action.payload;
    },

    resetMemoryInput: (state, action) => {
      state.memoryInput = initialState.memoryInput;
    },

    updateMemoryOutput: (state, action) => {
      state.memoryOutput = action.payload;
    },

    updateMultipleOutput: (state, action) => {
      state.multipleOutput = action.payload;
    }
  },
});

export const {
  updateMemoryInput,
  resetMemoryInput,
  updateMemoryOutput,
  updateMultipleOutput
} = memorySlice.actions;

export const selectMemoryInput = (state, action) => state.memory.memoryInput;
export const selectMemoryOutput = (state, action) => state.memory.memoryOutput;
export const selectMultipleOutput = (state, action) => state.memory.multipleOutput;


export default memorySlice.reducer;