import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from './features/auth-slice';

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
});

// Configuration de redux-persist
const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configuration du store avec gestion des actions non sérialisables
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
    }),
});

// Crée le persistor pour la persistance
export const persistor = persistStore(store);

// Types pour Redux
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
