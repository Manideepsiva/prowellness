import { createSlice } from "@reduxjs/toolkit";

export const patientDetailsSlice = createSlice({
    name:'patientdetails',
    initialState:{
        patientName : "",
        gender:"",
        email:"",
        phoneNo:"",
        Area:"",
        city:"",
        patstate:"",
        postalcode:"",
        appdate:"",
        slot:"",
        additionalinfo:"",

    },

    reducers:{
        setPatientName: (state, action) => {
            console.log('Setting test name:', action.payload);
            state.patientName = action.payload;
        },
        setGender: (state, action) => {
            console.log('Setting test name:', action.payload);
            state.gender = action.payload;
        },
        setEmail: (state, action) => {
            console.log('Setting test name:', action.payload);
            state.email = action.payload;
        },
        setPhoneNo: (state, action) => {
            console.log('Setting test name:', action.payload);
            state.phoneNo = action.payload;
        },
        setArea: (state, action) => {
            console.log('Setting test name:', action.payload);
            state.Area = action.payload;
        },
        setCity: (state, action) => {
            console.log('Setting test name:', action.payload);
            state.city = action.payload;
        },
        setPatState: (state, action) => {
            console.log('Setting test name:', action.payload);
            state.patstate = action.payload;
        },
        setPostalCode: (state, action) => {
            console.log('Setting test name:', action.payload);
            state.postalcode = action.payload;
        },
        setAppDate: (state, action) => {
            console.log('Setting test name:', action.payload);
            state.appdate = action.payload;
        },
        setSlot: (state, action) => {
            console.log('Setting test name:', action.payload);
            state.slot = action.payload;
        },
        setAdditionalInfo: (state, action) => {
            console.log('Setting test name:', action.payload);
            state.additionalinfo = action.payload;
        },
    }
})


export const {
    setPatientName,
    setGender,
    setEmail,
    setPhoneNo,
    setArea,
    setCity,
    setPatState,
    setPostalCode,
    setAppDate,
    setSlot,
    setAdditionalInfo,
} = patientDetailsSlice.actions;
export default patientDetailsSlice.reducer;
