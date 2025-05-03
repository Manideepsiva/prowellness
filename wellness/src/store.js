import { configureStore } from '@reduxjs/toolkit';
import { persistStore,persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default is localStorage for web
import rootReducer from "./rootreducer" // Combines all reducers
import { combineReducers } from 'redux';
import {thunk} from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage,
};





const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export default store;
