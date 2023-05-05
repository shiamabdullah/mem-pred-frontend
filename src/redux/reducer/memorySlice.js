import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  memoryInput: {
    model: 'basic',
    tech: '12LPP',
  },
  memoryOutput: {},
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
      state.memoryInput = {
        model: 'basic',
        tech: '12LPP',
      }
    },

    updateMemoryOutput: (state, action) => {
      state.memoryOutput = action.payload;
    }
  },
});

export const { updateMemoryInput, resetMemoryInput, updateMemoryOutput } = memorySlice.actions;

export const selectMemoryInput = (state, action) => state.memory.memoryInput;
export const selectMemoryOutput = (state, action) => state.memory.memoryOutput;


export default memorySlice.reducer;