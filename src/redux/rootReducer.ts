import { combineReducers } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import authReducer from "./slices/authSlice";


// export const reducer = {
//   [baseApi.reducerPath]: baseApi.reducer,
// };


// Combine all  reducers
export const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  auth: authReducer, // this is the Persisted reducer
});
