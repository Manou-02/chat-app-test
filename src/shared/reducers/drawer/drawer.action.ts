import { createAction } from "@reduxjs/toolkit";
import { DrawerType } from "./drawer.type";

export class ActionReducer {
      static setShowDrawer = createAction<any>(DrawerType.SET_SHOW_DRAWER)
}