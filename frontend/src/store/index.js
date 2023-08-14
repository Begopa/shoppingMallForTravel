import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REHYDRATE,
} from "redux-persist/es/constants";

export const rootReducer = combineReducers({
  user: userReducer,
});

const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PURGE, PERSIST],
      },
    }),
});

export const persistor = persistStore(store);
