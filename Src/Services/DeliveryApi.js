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
      dispatchAction(dispatch, "SET_D_DASHBOARD_DATA", data.result);
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
      dispatchAction(dispatch, "SET_D_DASHBOARD_DATA", data.result);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, "Something went wrong!");
  }
};
