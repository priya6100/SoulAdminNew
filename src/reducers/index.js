import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import userReducer from "./user.reducer";
import productReducer from "./products.reducer";
import orderReducer from "./orders.reducer";
import categoryReducer from "./category.reducer";
import pageReducer from "./page.reducer";
const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    category: categoryReducer,
    product: productReducer,
    order: orderReducer,
    page:pageReducer
});

export default rootReducer;