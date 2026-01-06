import { combineReducers } from "redux";
import productReducer   from "./productReducer.jsx";
import registerReducer from "./registerReducer.jsx";
const rootReducer = combineReducers({
    productState: productReducer,
    registerState: registerReducer
});
export default rootReducer;