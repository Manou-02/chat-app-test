import { createSlice } from "@reduxjs/toolkit";


const initialState = {
      formState: {},
}


const createUserSlice = createSlice({
      name: "createUserReducer",
      initialState,
      reducers: {

            setCreateUserForm: (state, action) => {
                  state.formState = {
                        ...state.formState,
                        ...action.payload
                  }
            },

            resetCreateUserForm: (state) => {
                  state.formState = initialState.formState;
            },

      }
})


export const { setCreateUserForm, resetCreateUserForm } = createUserSlice.actions;

export const createUserReducer = createUserSlice.reducer;