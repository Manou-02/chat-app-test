import { createSlice } from "@reduxjs/toolkit"


const initialState = {
      selected: null
}

const tableSlice = createSlice({
      name: "tableReducer",
      initialState,
      reducers: {
            setSelectedItemTable: (state, action) => {
                  state.selected = action.payload;
            },
            editSelectedItemTable: (state, action) => {
                  state.selected = {
                        ...(state.selected as any),
                        ...action.payload
                  }
            },
            resetSelectedItemTable: (state) => {
                  state.selected = initialState.selected
            }
      }
})


export const { resetSelectedItemTable, setSelectedItemTable, editSelectedItemTable } = tableSlice.actions;

export const tableReducer = tableSlice.reducer