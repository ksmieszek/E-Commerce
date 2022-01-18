import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import sortReducer from "./sortSlice";
import gridReducer from "./gridSlice";
import unauthUserReducer from "./unauthUserSlice";

const persistConfigUnauthUser = {
  key: "unauthUser",
  storage: storage,
};

const persistConfigGrid = {
  key: "grid",
  storage: storage,
};

const persistedUnauthUserReducer = persistReducer(persistConfigUnauthUser, unauthUserReducer);
const persistedGridReducer = persistReducer(persistConfigGrid, gridReducer);

const rootReducer = combineReducers({
  unauthUser: persistedUnauthUserReducer,
  grid: persistedGridReducer,
  sort: sortReducer,
});

export const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export const persistor = persistStore(store);

export default store;
