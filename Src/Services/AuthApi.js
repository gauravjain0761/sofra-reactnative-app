import { company_url, merchant_url } from "../Config/AppConfig";
import {
  dispatchAction,
  dispatchErrorAction,
  dispatchSuccessAction,
} from "./CommonFunctions";
import { POST } from "./ResponseHandler";

export const getLogin = (postObj, onSuccess) => async (dispatch) => {
  dispatchAction(dispatch, "PRE_LOADER", true);
  const url = merchant_url + "/loginMerchant";
  try {
    const data = await POST(dispatch, url, postObj);
    if (data.status == true) {
      onSuccess();
      dispatchAction(dispatch, "LOGIN", data.result);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, "Something went wrong!");
  }
};

export const getDeliveryLogin = (postObj, onSuccess) => async (dispatch) => {
  dispatchAction(dispatch, "PRE_LOADER", true);
  const url = merchant_url + "/loginMerchant";
  try {
    const data = await POST(dispatch, url, postObj);
    if (data.status == true) {
      onSuccess();
      dispatchAction(dispatch, "D_LOGIN", data.result);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, "Something went wrong!");
  }
};

export const register = (postObj, navigation) => async (dispatch) => {
  dispatchAction(dispatch, "PRE_LOADER", true);
  const url = merchant_url + "/register";
  try {
    const data = await POST(dispatch, url, postObj);
    if (data.status == true) {
      // onSuccess();
      dispatchSuccessAction(dispatch, data.message);
      navigation.goBack();
      // dispatchAction(dispatch, "LOGIN", data.result);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, "Something went wrong!");
  }
};

export const getLogout = (onSuccess) => async (dispatch) => {
  dispatchAction(dispatch, "PRE_LOADER", true);
  const url = merchant_url + "/logout";
  try {
    const data = await POST(dispatch, url);
    if (data.status == true) {
      onSuccess();
      dispatchSuccessAction(dispatch, data.message);
      dispatchAction(dispatch, "LOGOUT", "");
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, "Something went wrong!");
  }
};

export const getDeliveryLogout = (onSuccess) => async (dispatch) => {
  dispatchAction(dispatch, "PRE_LOADER", true);
  const url = merchant_url + "/logout";
  try {
    const data = await POST(dispatch, url);
    if (data.status == true) {
      onSuccess();
      dispatchSuccessAction(dispatch, data.message);
      dispatchAction(dispatch, "LOGOUT", "");
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, "Something went wrong!");
  }
};
