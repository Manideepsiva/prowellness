import { createSlice } from "@reduxjs/toolkit";

export const booknameslice = createSlice({
    name:'Bookdetails',
    initialState:{
        nameofhospital : "",
        hospitaladdress:"",
        testprice:"",
        notification:"",
        hospitalid:"",
    },

    reducers:{
        setHospName:(state,action)=>{
            console.log('Setting hosp name:', action.payload);
            state.nameofhospital = action.payload;

        },

        setHospAdd : (state,action) =>{
            console.log('Setting hosp add:', action.payload);
            state.hospitaladdress = action.payload;

        },
        setHospTestPrice : (state,action) =>{
            console.log('Setting hosp price:', action.payload);
            state.testprice = action.payload;

        },
        setNotification:(state,action)=>{
            state.notification = action.payload;
        },
        removeNotification:(state,action)=>{
            state.notification = "";
        },
        setHospitalId :(state,action)=>{
            state.hospitalid = action.payload;

        }
    }
})


export const {setHospName,setHospAdd,setHospTestPrice,setNotification,removeNotification,setHospitalId} = booknameslice.actions;
export default booknameslice.reducer;
