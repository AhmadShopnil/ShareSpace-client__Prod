import {  configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import { baseApi } from "./api/baseApi";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 



// // Configuration for persisting the auth state in localStorage
// const persistConfig = {
//   key: "auth",
//   storage,
//   whitelist: ["auth"], 
// };
// // Wrap  rootReducer with persistReducer
// const persistedReducer = persistReducer(persistConfig, rootReducer);




// Configure  Redux store
export const store = configureStore({
  reducer: rootReducer, 
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }).concat(baseApi.middleware),
});


export const persistor = persistStore(store);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
