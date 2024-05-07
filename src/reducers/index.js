import { combineReducers } from "redux";
import userReducer from "./userReducer";
import resultsReducer from "./resultsReducer";
import reviewsReducer from "./reviewsReducer";

const rootReducer = combineReducers({
  user: userReducer,
  results: resultsReducer,
  reviews: reviewsReducer,
});

export default rootReducer;
