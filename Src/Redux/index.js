import { combineReducers } from "redux";
import merchant from "./MerchantReducer";
import auth from "./Auth";
import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
const reducers = combineReducers({ auth, merchant });
const middleware = [thunk];
const store = configureStore({ reducer: reducers, middleware });

export default store;
