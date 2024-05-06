import { thunk } from "redux-thunk";
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { composeWithDevTools } from "@redux-devtools/extension";

const persistConfig = {
  key: "persist-login",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk))); // Create Redux store with rootReducer

const persistor = persistStore(store);

export default store;
export { persistor };
