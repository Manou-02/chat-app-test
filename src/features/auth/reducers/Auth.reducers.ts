import { createAction, createReducer } from "@reduxjs/toolkit";
import { ActionReducer } from "../constants/Constants";

const initialState = {
     userProfile: {

     }
}


export const setUserProfileData = createAction<any>(ActionReducer.SET_CURRENT_USER)
export const resetUserProfileData = createAction<any>(ActionReducer.RESET_CURRENT_USER)
export const authReducer = createReducer(
     initialState.userProfile,
     (builder) => {
          return builder
               .addCase(setUserProfileData, (_draft: any, action) => {
                    return action.payload;
               })
               .addCase(resetUserProfileData, (_draft: any) => {
                    return {};
               })
     }
);