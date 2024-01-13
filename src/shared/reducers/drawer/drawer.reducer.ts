import { createReducer } from "@reduxjs/toolkit";
import { ActionReducer } from "./drawer.action";

const initialState = {
      isShow: false
}

export const drawerReducer = createReducer(
      initialState.isShow,
      (builder) => {
            return builder
                  .addCase(ActionReducer.setShowDrawer, (_draft: any, action) => {
                        return action.payload;
                  })
      }
);