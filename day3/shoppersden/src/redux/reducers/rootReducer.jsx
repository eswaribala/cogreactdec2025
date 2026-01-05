import { combineReducers } from "redux";
import productReducer   from "./productReducer.jsx";
const rootReducer = combineReducers({
    product: productReducer
});
export default rootReducer;