import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// import storageSession from "redux-persist/lib/storage/session";
import { combineReducers } from "redux";
import sortReducer from "./sortSlice";
import gridReducer from "./gridSlice";
import { setAutoFreeze } from "immer";

// Fixes "Cannot assign to read only property" error message
// when modifying objects from Redux state directly.
setAutoFreeze(false);

const persistConfigGrid = {
  key: "grid",
  storage: storage,
  // whitelist: ["gridClass"],
};

const persistedGridReducer = persistReducer(persistConfigGrid, gridReducer);

const rootReducer = combineReducers({
  grid: persistedGridReducer,
  sort: sortReducer,
});

export const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export const persistor = persistStore(store);

export default store;
