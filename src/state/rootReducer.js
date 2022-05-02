import { combineReducers } from 'redux';
import { authReducer } from './reducers/authReducer';
import { cartReducer } from './reducers/cartReducer';
import { locationsReducer } from './reducers/locationReducer';
import { productsReducer } from './reducers/productReducer';
import { promotionsReducer } from './reducers/promotionReducer';

const rootReducer = combineReducers({
    products: productsReducer,
    promotions: promotionsReducer,
    auth: authReducer,
    locations: locationsReducer,
    cart: cartReducer
});

export { rootReducer };