import { createSlice } from "@reduxjs/toolkit";
import localStorageService from "../services/localStorage.service";

const tabRecordSlice = createSlice({
  name: "records",
  initialState: {
    entities: null,
    isLoading: true,
  },
  reducers: {
    recordsRecived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: tabRecordReducer, actions } = tabRecordSlice;
const { recordsRecived } = actions;

export const setTabRecord = () => (dispatch) => {
  const userName = localStorageService.getUserName();
  const userPoints = localStorageService.getUserPoints();
  const tabs = {
    name: userName,
    points: userPoints,
  };
  dispatch(recordsRecived(tabs));
};

export const getTabRecords = () => (state) => state.records.entities;

export default tabRecordReducer;
