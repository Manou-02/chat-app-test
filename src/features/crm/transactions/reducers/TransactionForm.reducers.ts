import { createSlice } from "@reduxjs/toolkit"


const initialState = {
      transactionForm: {}
}


const transactionFormSlice = createSlice({
      name: "transactionFormReducer",
      initialState,
      reducers: {
            setTransactionForm: (state, action) => {
                  state.transactionForm = {
                        ...state.transactionForm,
                        ...action.payload
                  }
            },
            resetTransactionForm: (state) => {
                  state.transactionForm = initialState.transactionForm
            }
      }
})


export const { resetTransactionForm, setTransactionForm } = transactionFormSlice.actions;
export const transactionFormReducer = transactionFormSlice.reducer