import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// import storageSession from "redux-persist/lib/storage/session";
import { combineReducers } from "redux";
import sortReducer from "./sortSlice";
import gridReducer from "./gridSlice";
import unauthUserReducer from "./unauthUserSlice";
import authUserReducer from "./authUserSlice";
import { setAutoFreeze } from "immer";

// Fixes "Cannot assign to read only property" error message
// when modifying objects from Redux state directly.
setAutoFreeze(false);

const persistConfigUnauthUser = {
  key: "unauthUser",
  storage: storage,
};

const persistConfigAuthUser = {
  key: "authUser",
  storage: storage,
};

const persistConfigGrid = {
  key: "grid",
  storage: storage,
};

const persistedUnauthUserReducer = persistReducer(persistConfigUnauthUser, unauthUserReducer);
const persistedAuthUserReducer = persistReducer(persistConfigAuthUser, authUserReducer);
const persistedGridReducer = persistReducer(persistConfigGrid, gridReducer);

const rootReducer = combineReducers({
  authUser: persistedAuthUserReducer,
  unauthUser: persistedUnauthUserReducer,
  grid: persistedGridReducer,
  sort: sortReducer,
});

export const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export const persistor = persistStore(store);

export default store;
