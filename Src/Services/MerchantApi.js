import { merchant_url } from "../Config/AppConfig";
import { getToken } from "./asyncStorage";
import {
  dispatchAction,
  dispatchErrorAction,
  dispatchSuccessAction,
} from "./CommonFunctions";
import { GET, POST } from "./ResponseHandler";

export const getOrders = () => async (dispatch) => {
  dispatch({ type: "PRE_LOADER", payload: true });

  let token = await getToken();
  const url = merchant_url + "/getOrders?auth_token=" + token;
  try {
    const data = await GET(dispatch, url);
    if (data.status == true) {
      // onSuccess();
      dispatchAction(dispatch, "SET_ORDERS", data.result);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, "Something went wrong!");
  }
};

export const getStatitics = () => async (dispatch) => {
  dispatch({ type: "PRE_LOADER", payload: true });

  let token = await getToken();
  const url = merchant_url + "/getStatitics?auth_token=" + token;
  try {
    const data = await GET(dispatch, url);
    if (data.status == true) {
      // onSuccess();
      dispatchAction(dispatch, "SET_STATISTICS", data.result);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, "Something went wrong!");
  }
};

export const getSettledReports = () => async (dispatch) => {
  dispatch({ type: "PRE_LOADER", payload: true });

  let token = await getToken();
  const url = merchant_url + "/getSettledReports?auth_token=" + token;
  try {
    const data = await GET(dispatch, url);
    if (data.status == true) {
      // onSuccess();
      dispatchAction(dispatch, "SET_SETTELED_REPORT", data.result);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, "Something went wrong!");
  }
};

export const getUnSettledReports = () => async (dispatch) => {
  dispatch({ type: "PRE_LOADER", payload: true });

  let token = await getToken();
  const url = merchant_url + "/getUnSettledReports?auth_token=" + token;
  try {
    const data = await GET(dispatch, url);
    if (data.status == true) {
      // onSuccess();
      dispatchAction(dispatch, "SET_UNSETTELED_REPORT", data.result);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, "Something went wrong!");
  }
};

export const getAppSetting = () => async (dispatch) => {
  dispatch({ type: "PRE_LOADER", payload: true });

  let token = await getToken();
  const url = merchant_url + "/getAppSetting?auth_token=" + token;
  try {
    const data = await GET(dispatch, url);
    if (data.status == true) {
      dispatchAction(dispatch, "SET_APP_SETTING", data);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, "Something went wrong!");
  }
};

export const UpdateAppSetting = (postObj) => async (dispatch) => {
  dispatch({ type: "PRE_LOADER", payload: true });

  const url = merchant_url + "/UpdateAppSetting";
  try {
    const data = await POST(dispatch, url, postObj);
    if (data.status == true) {
      dispatchSuccessAction(dispatch, data.message);
      dispatchAction(dispatch, "SET_APP_SETTING", data);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, "Something went wrong!");
  }
};

export const getAvailbility = () => async (dispatch) => {
  dispatch({ type: "PRE_LOADER", payload: true });

  let token = await getToken();
  const url = merchant_url + "/getAvailbility?auth_token=" + token;
  try {
    const data = await GET(dispatch, url);
    if (data.status == true) {
      dispatchAction(dispatch, "SET_AVAILABILITY", data.result);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, "Something went wrong!");
  }
};

export const getOffers = () => async (dispatch) => {
  dispatch({ type: "PRE_LOADER", payload: true });

  let token = await getToken();
  const url = merchant_url + "/getOffers?auth_token=" + token;
  try {
    const data = await GET(dispatch, url);
    if (data.status == true) {
      dispatchAction(dispatch, "SET_OFFERS", data.result);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, "Something went wrong!");
  }
};

export const DeleteOffer = (postObj) => async (dispatch) => {
  dispatch({ type: "PRE_LOADER", payload: true });

  const url = merchant_url + "/DeleteOffer";
  try {
    const data = await POST(dispatch, url, postObj);
    if (data.status == true) {
      dispatchSuccessAction(dispatch, data.message);
      dispatchAction(dispatch, "DELETE_OFFER", postObj);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, "Something went wrong!");
  }
};
