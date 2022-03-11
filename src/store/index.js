import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import gridReducer from "./gridSlice";
import unauthUserReducer from "./unauthUserSlice";

const persistedUnauthUserReducer = persistReducer(
  {
    key: "unauthUser",
    storage: storage,
  },
  unauthUserReducer
);

const persistedGridReducer = persistReducer(
  {
    key: "grid",
    storage: storage,
  },
  gridReducer
);

export const store = configureStore({
  reducer: {
    unauthUser: persistedUnauthUserReducer,
    grid: persistedGridReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
