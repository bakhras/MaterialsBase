<<<<<<< Updated upstream
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
=======
import { legacy_createStore, applyMiddleware} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
>>>>>>> Stashed changes
import thunk from "redux-thunk";
import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];

const store = legacy_createStore(
	rootReducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
