import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist' 
import storage from 'redux-persist/lib/storage' 

import allReducers from "./index"

const persistConfig = { 
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, allReducers) 

const store = createStore(
    persistedReducer, 
    applyMiddleware() 
)

const  persistor = persistStore(store); // membuat persisted store

export {store, persistor}