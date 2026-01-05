import { combineReducers } from "redux";
import productReducer   from "./productReducer.jsx";
const rootReducer = combineReducers({
    productState: productReducer
});
export default rootReducer;