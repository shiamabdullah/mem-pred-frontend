import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import layoutReducer from "../reducer/layoutSlice";
import logicReducer from "../reducer/logicSlice";
import memoryReducer from "../reducer/memorySlice";
import resultReducer from "../reducer/resultSlice";

const reducers = combineReducers({
  layout: layoutReducer,
  result: resultReducer,
  memory: memoryReducer,
  logic: logicReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["result"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
