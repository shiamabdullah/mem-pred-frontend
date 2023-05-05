import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentState: 'memory',
  outputResult: null,
  loading: false,
};


export const layoutSlice = createSlice({
  name: 'layout',
  initialState,

  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    updateOutputResult: (state, action) => {
      state.outputResult = action.payload;
    },

    updateCurrentState: (state, action) => {
      state.currentState = action.payload;
    },

    updateLoading: (state, action) => {
      state.loading = action.payload;
    }
  },
});

export const { updateCurrentState, updateOutputResult, updateLoading } = layoutSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCurrentState = (state) => state.layout.currentState;
export const selectOutputResult = (state) => state.layout.outputResult;
export const selectLoading = (state) => state.layout.loading;

export default layoutSlice.reducer;