import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authSlice from '../features/authSlice'
import counterSlice from '../features/counterSlice';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { mainApi } from '@/api';


const persistConfig = { key: "root", storage, version: 1 };

const rootReducer = combineReducers({
    [mainApi.reducerPath]: mainApi.reducer,
    authSlice : authSlice  ,
    counter : counterSlice
});


const persistedReducer = persistReducer(persistConfig, rootReducer);



const middlewareHandler = (getDefaultMiddleware: any) => {
  const middlewareList = [
      ...getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
      }),
      mainApi.middleware,
  ];
  
  return middlewareList;
};




export const store = configureStore({
  reducer: persistedReducer ,
  middleware: (getDefaultMiddleware) => middlewareHandler(getDefaultMiddleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch