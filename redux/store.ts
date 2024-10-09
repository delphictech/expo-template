import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ConfigApi } from '~/redux/services/config-api';
// import { StripeApi } from 'src/services/stripe';
import userReducer from '~/redux/slices/user-slice';
import { pokemonApi } from './services/test';

/**
 * @remarks
 * set the persist configuration
 *
 * @resources
 * Usage with redux persist: https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist
 * Helpful tutorial: https://edvins.io/how-to-use-redux-persist-with-redux-toolkit
 * Splitting the rtk-query api: https://stackoverflow.com/questions/71466817/splitting-api-definitions-with-rtk-query
 */
const persistConfig = {
    key: 'root',
    version: 1,
    storage: AsyncStorage,
};

// combine reducers
const reducers = combineReducers({
    user: userReducer,
    [ConfigApi.reducerPath]: ConfigApi.reducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
});

// set the persisting reducers
const persistedReducers = persistReducer(persistConfig, reducers);

// configure the store
export const store = configureStore({
    reducer: persistedReducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })
            .concat(ConfigApi.middleware)
            .concat(pokemonApi.middleware),
});

// export the redux dispatch and root states
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
