import { createSlice } from '@reduxjs/toolkit';

export const testnameslice = createSlice({
  name: 'TestName',
  initialState: {
    testName: "",
    testState:"",
    testLocation:"",
  },
  reducers: {
    setDiaTestName: (state, action) => {
        console.log('Setting test name:', action.payload);
      state.testName = action.payload;
    },

    setDiaState:(state,action)=>{
        console.log("setting state name",action.payload)
        state.testState = action.payload;
    },
    setDiaLocation:(state,action)=>{
        console.log("setting location name",action.payload)
        state.testLocation = action.payload;
    },


  },
});

export const { setDiaTestName,setDiaState,setDiaLocation } = testnameslice.actions;
export default testnameslice.reducer;
