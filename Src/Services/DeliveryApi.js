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
    dispatchErrorAction(dispatch, error.message);
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
    dispatchErrorAction(dispatch, error.message);
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
    dispatchErrorAction(dispatch, error.message);
  }
};

export const addDriver = (postObj, onSuccess) => async (dispatch) => {
  dispatch({ type: "PRE_LOADER_DELIVERY", payload: true });

  const url = delivery_url + "/addDriver";
  try {
    const data = await POST(dispatch, url, postObj);
    if (data.status == true) {
      dispatch(getDrivers());
      onSuccess();
      dispatchSuccessAction(dispatch, data.result);
    } else {
      dispatchErrorAction(dispatch, data.result);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, error.message);
  }
};

export const updateDriverStatus = (postObj) => async (dispatch) => {
  dispatch({ type: "PRE_LOADER_DELIVERY", payload: true });

  const url = delivery_url + "/updateDriverStatus";
  try {
    const data = await POST(dispatch, url, postObj);
    if (data.status == true || data.error == "false") {
      dispatchAction(dispatch, "UPDATE_DRIVER_STATUS", postObj);
      dispatchSuccessAction(dispatch, data.message);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, error.message);
  }
};

export const deleteDriver = (postObj) => async (dispatch) => {
  dispatch({ type: "PRE_LOADER_DELIVERY", payload: true });

  const url = delivery_url + "/deleteDriver";
  try {
    const data = await POST(dispatch, url, postObj);
    if (data.status == true || data.error == "false") {
      dispatchAction(dispatch, "DELETE_DRIVER", postObj);
      dispatchSuccessAction(dispatch, data.message);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, error.message);
  }
};
export const updateDriver = (postObj, navigation) => async (dispatch) => {
  dispatch({ type: "PRE_LOADER_DELIVERY", payload: true });

  const url = delivery_url + "/updateDriver";
  try {
    const data = await POST(dispatch, url, postObj);
    if (data.status == true) {
      navigation.goBack();
      dispatchSuccessAction(dispatch, data.result);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, error.message);
  }
};

export const assignDriver = (postObj, onSuccess) => async (dispatch) => {
  dispatch({ type: "PRE_LOADER_DELIVERY", payload: true });

  const url = delivery_url + "/assignDriver";
  try {
    const data = await POST(dispatch, url, postObj);
    if (data.status == true) {
      onSuccess(data.message);
      // dispatchSuccessAction(dispatch, data.result);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, error.message);
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
      dispatchAction(dispatch, "SET_SETTELED_REPORT_COMPANY", data.result);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, error.message);
  }
};

export const getCompanyUnSettledReports = (postObj) => async (dispatch) => {
  dispatch({ type: "PRE_LOADER_DELIVERY", payload: true });

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
      dispatchAction(dispatch, "SET_UNSETTELED_REPORT_COMPANY", data.result);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, error.message);
  }
};

export const getDeliveredOrders = (page) => async (dispatch) => {
  let token = await getToken();
  const url =
    delivery_url + "/getDeliveredOrders?auth_token=" + token + "&page=" + page;
  try {
    const data = await GET(dispatch, url);
    if (data.status == true) {
      dispatchAction(dispatch, "SET_DELIVERED_ORDERS", data);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, error.message);
  }
};

export const getPickupOrders = (page) => async (dispatch) => {
  let token = await getToken();
  const url =
    delivery_url + "/getPickupOrders?auth_token=" + token + "&page=" + page;
  try {
    const data = await GET(dispatch, url);
    if (data.status == true) {
      dispatchAction(dispatch, "SET_PICKUP_ORDERS", data);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, error.message);
  }
};

export const getActiveOrders = (page) => async (dispatch) => {
  let token = await getToken();
  const url =
    delivery_url + "/getActiveOrders?auth_token=" + token + "&page=" + page;
  try {
    const data = await GET(dispatch, url);
    if (data.status == true) {
      dispatchAction(dispatch, "SET_ACTIVE_ORDERS", data);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, error.message);
  }
};

export const getCancelledOrders = (page) => async (dispatch) => {
  let token = await getToken();
  const url =
    delivery_url + "/getCancelledOrders?auth_token=" + token + "&page=" + page;
  try {
    const data = await GET(dispatch, url);
    if (data.status == true) {
      dispatchAction(dispatch, "SET_CANCELLED_ORDERS", data);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, error.message);
  }
};

export const changeOrderStatus = (postObj, onSuccess) => async (dispatch) => {
  dispatch({ type: "PRE_LOADER_DELIVERY", payload: true });

  const url = delivery_url + "/changeOrderStatus";
  try {
    const data = await POST(dispatch, url, postObj);
    if (data.status == true || data.error == "false") {
      onSuccess(data.message);
      // dispatchSuccessAction(dispatch, data.message);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    console.log(error);
    dispatchErrorAction(dispatch, error.message);
  }
};
