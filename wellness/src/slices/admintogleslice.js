import {  createSlice } from '@reduxjs/toolkit'

// Initial state
const initialState = {
  sidebarShow: true,
  theme: 'light',
  sidebarUnfoldable:true,
}

// Create a slice
const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSidebarShow: (state, action) => {
      state.sidebarShow = action.payload
    },
    setTheme: (state, action) => {
      state.theme = action.payload
    },
    setsidebarUnfoldable: (state, action) => {
     state.sidebarUnfoldable = action.payload // Handles setting multiple properties
    },
  },
})

// Export actions
export const { setSidebarShow, setTheme, setsidebarUnfoldable } = uiSlice.actions

export default  uiSlice.reducer;