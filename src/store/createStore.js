import { combineReducers, configureStore } from "@reduxjs/toolkit";
import tabRecordReducer from "./tabRecord";

const rootReducer = combineReducers({
  records: tabRecordReducer,
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
