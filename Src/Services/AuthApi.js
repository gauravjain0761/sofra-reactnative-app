import { company_url, delivery_url, merchant_url } from "../Config/AppConfig";
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
    dispatchErrorAction(dispatch, error.message);
  }
};

export const getDeliveryLogin = (postObj, onSuccess) => async (dispatch) => {
  dispatchAction(dispatch, "PRE_LOADER", true);
  const url = delivery_url + "/loginCompany";
  try {
    const data = await POST(dispatch, url, postObj);
    if (data.status == true) {
      onSuccess();
      dispatchAction(dispatch, "D_LOGIN", data.result);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, error.message);
  }
};

export const register = (postObj, onSuccess) => async (dispatch) => {
  dispatchAction(dispatch, "PRE_LOADER", true);
  const url = merchant_url + "/register";
  try {
    const data = await POST(dispatch, url, postObj);
    if (data.status == true) {
      onSuccess();
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, error.message);
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
    dispatchErrorAction(dispatch, error.message);
  }
};

export const getDeliveryLogout = (onSuccess) => async (dispatch) => {
  dispatchAction(dispatch, "PRE_LOADER", true);
  const url = delivery_url + "/logout";
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
    dispatchErrorAction(dispatch, error.message);
  }
};

export const updatePassword =
  (postObj, link, onSuccess) => async (dispatch) => {
    dispatchAction(dispatch, "PRE_LOADER", true);
    const url = link + "/updatePassword";
    try {
      const data = await POST(dispatch, url, postObj);
      if (data.status == true) {
        onSuccess();
        dispatchSuccessAction(dispatch, data.message);
        // dispatchAction(dispatch, "LOGOUT", "");
      } else {
        dispatchErrorAction(dispatch, data.message);
      }
    } catch (error) {
      dispatchErrorAction(dispatch, error.message);
    }
  };

export const forgotPassword = (postObj, onSuccess) => async (dispatch) => {
  dispatchAction(dispatch, "PRE_LOADER", true);
  const url = merchant_url + "/forgotPassword";
  try {
    const data = await POST(dispatch, url, postObj);
    if (data.status == true) {
      onSuccess();
      dispatchSuccessAction(dispatch, data.message);
      // dispatchAction(dispatch, "LOGOUT", "");
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, error.message);
  }
};

export const deliveryRegistaer = (postObj, onSuccess) => async (dispatch) => {
  dispatchAction(dispatch, "PRE_LOADER", true);
  const url = delivery_url + "/register";
  try {
    const data = await POST(dispatch, url, postObj);
    if (data.status == true) {
      onSuccess();
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, error.message);
  }
};
