import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  EqualityFn,
  useDispatch as useDispatchBase,
  useSelector as useSelectorBase,
} from 'react-redux';

import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'reduxjs-toolkit-persist';
import storage from 'reduxjs-toolkit-persist/lib/storage';
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { appReducer } from "./appReducer";
// import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
//import { appReducer } from "./appReducer";

export const reducer = combineReducers(appReducer);

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([]),
  devTools: true
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export const useDispatch = () => useDispatchBase<AppDispatch>();

export const useSelector = <TSelected = RootState>(
  selector: (state: RootState) => TSelected,
  equalityFn?: EqualityFn<TSelected> | undefined
): TSelected => useSelectorBase<RootState, TSelected>(selector, equalityFn);

setupListeners(store.dispatch);
