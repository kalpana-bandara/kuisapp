import { thunk } from "redux-thunk";
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";

import { composeWithDevTools } from "@redux-devtools/extension";

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk))); // Create Redux store with rootReducer

export default store;
