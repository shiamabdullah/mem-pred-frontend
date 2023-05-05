import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  saveResult: []
};


export const resultSlice = createSlice({
  name: 'result',
  initialState,

  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    updateSaveResult: (state, action) => {
      const temp = JSON.parse(JSON.stringify(state.saveResult));
      const findExist = temp.find((item)=> item?.name === action.payload.name)
      if (!findExist){
        temp.push(action.payload)
      }
      state.saveResult = temp;
    },

    removeSavedResult: (state, action) =>{
      const temp = JSON.parse(JSON.stringify(state.saveResult));
      temp.splice(action.payload, 1);
      state.saveResult = temp;
    }
  },
});

export const { updateSaveResult , removeSavedResult} = resultSlice.actions;

export const selectOutputResult = (state) => state.result.saveResult;

export default resultSlice.reducer;