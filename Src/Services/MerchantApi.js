import { merchant_url } from "../Config/AppConfig";
import { getToken } from "./asyncStorage";
import {
  dispatchAction,
  dispatchErrorAction,
  dispatchSuccessAction,
} from "./CommonFunctions";
import { GET, POST } from "./ResponseHandler";

export const getOrders = () => async (dispatch) => {
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
