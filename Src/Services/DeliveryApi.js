import { delivery_url } from "../Config/AppConfig";
import { getToken } from "./asyncStorage";
import {
  dispatchAction,
  dispatchErrorAction,
  dispatchSuccessAction,
} from "./CommonFunctions";
import { GET, POST } from "./ResponseHandler";

export const getDeliveryDashboardReports = () => async (dispatch) => {
  let token = await getToken();
  const url = delivery_url + "/getDashboardReports?auth_token=" + token;
  try {
    const data = await GET(dispatch, url);
    if (data.status == true) {
      dispatchAction(dispatch, "SET_D_DASHBOARD_DATA", data.result);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, "Something went wrong!");
  }
};

export const getCompanyProfile = () => async (dispatch) => {
  let token = await getToken();
  const url = delivery_url + "/getCompanyProfile?auth_token=" + token;
  try {
    const data = await GET(dispatch, url);
    if (data.status == true) {
      dispatchAction(dispatch, "SET_COMPANY_PROFILE", data.result);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, "Something went wrong!");
  }
};

export const getDrivers = () => async (dispatch) => {
  let token = await getToken();
  const url = delivery_url + "/getDrivers?auth_token=" + token;
  try {
    const data = await GET(dispatch, url);
    if (data.status == true) {
      dispatchAction(dispatch, "SET_DRIVERS", data.result);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, "Something went wrong!");
  }
};

export const getPickupOrders = () => async (dispatch) => {
  let token = await getToken();
  const url = delivery_url + "/getPickupOrders?auth_token=" + token;
  try {
    const data = await GET(dispatch, url);
    if (data.status == true) {
      dispatchAction(dispatch, "SET_PICKUP_ORDERS", data.result);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, "Something went wrong!");
  }
};

export const getCompanySettledReports = (postObj) => async (dispatch) => {
  let token = await getToken();
  let url = "";
  if (postObj) {
    url =
      delivery_url +
      "/getSettledReports?auth_token=" +
      token +
      "&language=en&startDate=" +
      postObj.startDate +
      "&endDate=" +
      postObj.endDate;
  } else {
    url = delivery_url + "/getSettledReports?auth_token=" + token;
  }

  // const url = delivery_url + "/getSettledReports?auth_token=" + token;
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

export const getCompanyUnSettledReports = (postObj) => async (dispatch) => {
  dispatch({ type: "PRE_LOADER", payload: true });

  let token = await getToken();
  let url = "";
  if (postObj) {
    url =
      delivery_url +
      "/getUnSettledReports?auth_token=" +
      token +
      "&language=en&startDate=" +
      postObj.startDate +
      "&endDate=" +
      postObj.endDate;
  } else {
    url = delivery_url + "/getUnSettledReports?auth_token=" + token;
  }

  // const url = delivery_url + "/getUnSettledReports?auth_token=" + token;
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

export const getDeliveredOrders = () => async (dispatch) => {
  let token = await getToken();
  const url = delivery_url + "/getDeliveredOrders?auth_token=" + token;
  try {
    const data = await GET(dispatch, url);
    if (data.status == true) {
      dispatchAction(dispatch, "SET_DELIVERED_ORDERS", data.result);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, "Something went wrong!");
  }
};
