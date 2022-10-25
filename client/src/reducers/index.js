import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import fileReducer from "./fileReducer";
import userReducer from "./userReducer";
import themeReducer from "./themeReducer";
import actionModalReducer from "./actionModalReducer";
import alertReducer from "./AlertReducer";
import uploadReducer from "./uploadReducer";


const rootReducer = combineReducers({
	user: userReducer,
	file: fileReducer,
	theme: themeReducer,
	actionModal: actionModalReducer,
	alert: alertReducer,
	upload: uploadReducer
});

export const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk))
);
