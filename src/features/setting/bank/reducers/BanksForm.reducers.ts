import { createSlice } from "@reduxjs/toolkit"


const initialState = {
      state: {}
}



const banksFormSlice = createSlice({
      name: "banksForm",
      initialState,
      reducers: {
            setBanksFormData: (state, action) => {
                  state.state = {
                        ...state.state,
                        ...action.payload
                  }
            },
            resetBanksFormData: (state) => {
                  state.state = initialState.state
            }
      }
});


export const { resetBanksFormData, setBanksFormData } = banksFormSlice.actions;

export const banksFormReducer = banksFormSlice.reducer;