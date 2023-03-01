import { merchant_url } from "../Config/AppConfig";
import { getLanguage, getToken } from "./asyncStorage";
import {
  dispatchAction,
  dispatchErrorAction,
  dispatchSuccessAction,
} from "./CommonFunctions";
import { GET, POST } from "./ResponseHandler";

export const getCities = () => async (dispatch) => {
  let lang = await getLanguage();
  const url = merchant_url + "/getCities?language=" + lang;
  try {
    const data = await GET(dispatch, url);
    if (data.status == true) {
      dispatchAction(dispatch, "SET_CITIES", data.result);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, error.message);
  }
};

export const getCuisines = () => async (dispatch) => {
  let lang = await getLanguage();
  const url = merchant_url + "/getCuisines?language=" + lang;
  try {
    const data = await GET(dispatch, url);
    if (data.status == true) {
      dispatchAction(dispatch, "SET_CUISINES", data.result);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, error.message);
  }
};

export const getCategories = () => async (dispatch) => {
  let lang = await getLanguage();
  const url = merchant_url + "/getCategories?language=" + lang;
  try {
    const data = await GET(dispatch, url);
    if (data.status == true) {
      dispatchAction(dispatch, "SET_CATEGORIES", data.result);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, error.message);
  }
};

export const getUsers = () => async (dispatch) => {
  let lang = await getLanguage();
  const url = merchant_url + "/getUsers?language=" + lang;
  try {
    const data = await GET(dispatch, url);
    if (data.status == true) {
      dispatchAction(dispatch, "SET_USERS", data.result);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, error.message);
  }
};

export const getOrders = (page, status, search) => async (dispatch) => {
  let token = await getToken();
  let url = "";
  if (page) {
    if (status == "ALL") {
      if (search) {
        url =
          merchant_url +
          "/getOrders?auth_token=" +
          token +
          "&page=" +
          page +
          "&search=" +
          search;
      } else {
        url = merchant_url + "/getOrders?auth_token=" + token + "&page=" + page;
      }
    } else {
      if (search) {
        url =
          merchant_url +
          "/getOrders?auth_token=" +
          token +
          "&page=" +
          page +
          "&status=" +
          status +
          "&search=" +
          search;
      } else {
        url =
          merchant_url +
          "/getOrders?auth_token=" +
          token +
          "&page=" +
          page +
          "&status=" +
          status;
      }
    }
  } else {
    url = merchant_url + "/getOrders?auth_token=" + token;
  }

  try {
    const data = await GET(dispatch, url);
    if (data.status == true) {
      dispatchAction(dispatch, "SET_ORDERS", data);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, error.message);
  }
};

export const getStatitics = (postObj) => async (dispatch) => {
  let token = await getToken();
  let url = "";
  if (postObj) {
    url =
      merchant_url +
      "/getStatitics?auth_token=" +
      token +
      "&language=en&startDate=" +
      postObj.startDate +
      "&endDate=" +
      postObj.endDate;
  } else {
    url = merchant_url + "/getStatitics?auth_token=" + token;
  }
  try {
    const data = await GET(dispatch, url);
    if (data.status == true) {
      // onSuccess();
      dispatchAction(dispatch, "SET_STATISTICS", data.result);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, error.message);
  }
};

export const getSettledReports = (postObj) => async (dispatch) => {
  let token = await getToken();
  let url = "";
  if (postObj) {
    url =
      merchant_url +
      "/getSettledReports?auth_token=" +
      token +
      "&language=en&startDate=" +
      postObj.startDate +
      "&endDate=" +
      postObj.endDate;
  } else {
    url = merchant_url + "/getSettledReports?auth_token=" + token;
  }

  // const url = merchant_url + "/getSettledReports?auth_token=" + token;
  try {
    const data = await GET(dispatch, url);
    if (data.status == true) {
      // onSuccess();
      dispatchAction(dispatch, "SET_SETTELED_REPORT", data.result);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, error.message);
  }
};

export const getUnSettledReports = (postObj) => async (dispatch) => {
  dispatch({ type: "PRE_LOADER", payload: true });

  let token = await getToken();
  let url = "";
  if (postObj) {
    url =
      merchant_url +
      "/getUnSettledReports?auth_token=" +
      token +
      "&language=en&startDate=" +
      postObj.startDate +
      "&endDate=" +
      postObj.endDate;
  } else {
    url = merchant_url + "/getUnSettledReports?auth_token=" + token;
  }

  // const url = merchant_url + "/getUnSettledReports?auth_token=" + token;
  try {
    const data = await GET(dispatch, url);
    if (data.status == true) {
      // onSuccess();
      dispatchAction(dispatch, "SET_UNSETTELED_REPORT", data.result);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, error.message);
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
    dispatchErrorAction(dispatch, error.message);
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
    dispatchErrorAction(dispatch, error.message);
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
    dispatchErrorAction(dispatch, error.message);
  }
};

export const updateAvailbility = (postObj) => async (dispatch) => {
  dispatch({ type: "PRE_LOADER", payload: true });

  const url = merchant_url + "/updateAvailbility";
  try {
    const data = await POST(dispatch, url, postObj);
    if (data.status == true) {
      dispatchSuccessAction(dispatch, data.message);
      // dispatchAction(dispatch, "DELETE_OFFER", postObj);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, error.message);
  }
};

export const getOffers = () => async (dispatch) => {
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
    dispatchErrorAction(dispatch, error.message);
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
    dispatchErrorAction(dispatch, error.message);
  }
};

export const AddOffer = (postObj, onSuccess) => async (dispatch) => {
  dispatch({ type: "PRE_LOADER", payload: true });

  const url = merchant_url + "/AddOffer";
  try {
    const data = await POST(dispatch, url, postObj);
    if (data.status == true) {
      onSuccess();
      dispatch(getOffers());
      dispatchSuccessAction(dispatch, data.message);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, error.message);
  }
};

export const getDashboardReports = () => async (dispatch) => {
  // dispatch({ type: "PRE_LOADER", payload: true });

  let token = await getToken();
  let lang = await getLanguage();
  const url =
    merchant_url +
    "/getDashboardReports?auth_token=" +
    token +
    "&language=" +
    lang;
  try {
    const data = await GET(dispatch, url);
    if (data.status == true) {
      dispatchAction(dispatch, "SET_DASHBOARD_DATA", data.result);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, error.message);
  }
};

export const getMenuCategories = () => async (dispatch) => {
  let token = await getToken();
  let lang = await getLanguage();
  const url =
    merchant_url +
    "/getMenuCategories?auth_token=" +
    token +
    "&language=" +
    lang;
  try {
    const data = await GET(dispatch, url);
    if (data.status == true) {
      dispatchAction(dispatch, "SET_MENU_CATEGORIES", data.result);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, error.message);
  }
};

export const EditMenuCategory = (postObj, navigation) => async (dispatch) => {
  dispatch({ type: "PRE_LOADER", payload: true });

  const url = merchant_url + "/EditMenuCategory";
  try {
    const data = await POST(dispatch, url, postObj);
    if (data.status == true) {
      dispatchSuccessAction(dispatch, data.message);
      navigation.goBack();
      dispatchAction(dispatch, "SET_MENU_CATEGORIES", data.result);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, error.message);
  }
};

export const DeleteMenuCategory = (postObj) => async (dispatch) => {
  dispatch({ type: "PRE_LOADER", payload: true });
  const url = merchant_url + "/DeleteMenuCategory";
  try {
    const data = await POST(dispatch, url, postObj);
    if (data.status == true) {
      dispatchSuccessAction(dispatch, data.message);
      dispatchAction(dispatch, "DELETE_CATEGORIES", postObj);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, error.message);
  }
};

export const AddMenuCategory = (postObj, onSuccess) => async (dispatch) => {
  dispatch({ type: "PRE_LOADER", payload: true });

  const url = merchant_url + "/AddMenuCategory";
  try {
    const data = await POST(dispatch, url, postObj);
    if (data.status == true) {
      dispatchSuccessAction(dispatch, data.message);
      dispatchAction(dispatch, "SET_MENU_CATEGORIES", data.result);
      onSuccess();
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, error.message);
  }
};

export const getMenuItems = () => async (dispatch) => {
  let token = await getToken();
  const url = merchant_url + "/getMenuItems?auth_token=" + token;
  try {
    const data = await GET(dispatch, url);
    if (data.status == true) {
      dispatchAction(dispatch, "SET_MENU_ITEMS", data.result);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, error.message);
  }
};

export const getMenuDescriptors = () => async (dispatch) => {
  let token = await getToken();
  const url = merchant_url + "/getMenuDescriptors?auth_token=" + token;
  try {
    const data = await GET(dispatch, url);
    if (data.status == true) {
      dispatchAction(dispatch, "SET_MENU_DESCRIPTORS", data.result);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, error.message);
  }
};

export const AddMenuItem = (postObj, onSuccess) => async (dispatch) => {
  dispatch({ type: "PRE_LOADER", payload: true });

  const url = merchant_url + "/AddMenuItem";
  try {
    const data = await POST(dispatch, url, postObj);
    if (data.status == true) {
      onSuccess();
      dispatch(getMenuItems());
      dispatchSuccessAction(dispatch, data.message);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, error.message);
  }
};

export const EditMenuItem = (postObj, navigation) => async (dispatch) => {
  dispatch({ type: "PRE_LOADER", payload: true });

  const url = merchant_url + "/EditMenuItem";
  try {
    const data = await POST(dispatch, url, postObj);
    if (data.status == true) {
      navigation.navigate("M_MenuItemScreen");
      dispatch(getMenuItems());
      dispatchSuccessAction(dispatch, data.message);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, error.message);
  }
};

export const DeleteMenuItem = (postObj) => async (dispatch) => {
  dispatch({ type: "PRE_LOADER", payload: true });
  const url = merchant_url + "/DeleteMenuItem";
  try {
    const data = await POST(dispatch, url, postObj);
    if (data.status == true) {
      dispatchSuccessAction(dispatch, data.message);
      dispatchAction(dispatch, "DELETE_MENUITEMS", postObj);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, error.message);
  }
};

export const enableDisableMenues = (postObj) => async (dispatch) => {
  dispatch({ type: "PRE_LOADER", payload: true });
  const url = merchant_url + "/enableDisableMenues";
  try {
    const data = await POST(dispatch, url, postObj);
    if (data.status == true) {
      dispatchSuccessAction(dispatch, data.message);
      dispatchAction(dispatch, "STATUS_UPDATE_MENU_ITEMS", postObj);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, error.message);
  }
};

export const changePromoCodeStatus = (postObj) => async (dispatch) => {
  dispatch({ type: "PRE_LOADER", payload: true });
  const url = merchant_url + "/changePromoCodeStatus";
  try {
    const data = await POST(dispatch, url, postObj);
    if (data.error == "false" || data.status == true) {
      dispatchSuccessAction(dispatch, data.message);
      dispatchAction(dispatch, "PROMOCODE_STATUS_UPDATE", postObj);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, error.message);
  }
};

export const getPromoCodes = () => async (dispatch) => {
  let token = await getToken();
  const url = merchant_url + "/getPromoCodes?auth_token=" + token;
  try {
    const data = await GET(dispatch, url);
    if (data.status == true) {
      dispatchAction(dispatch, "SET_PROMO_CODES", data.result);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, error.message);
  }
};

export const AddPromoCode = (postObj) => async (dispatch) => {
  dispatch({ type: "PRE_LOADER", payload: true });

  const url = merchant_url + "/AddPromoCode";
  try {
    const data = await POST(dispatch, url, postObj);
    if (data.status == true) {
      dispatchSuccessAction(dispatch, data.message);
      dispatch(getPromoCodes());
      // dispatchAction(dispatch, "ADD_OFF_SLOT", data.result);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, error.message);
  }
};

export const getOffSlots = () => async (dispatch) => {
  let token = await getToken();
  const url = merchant_url + "/getOffSlots?auth_token=" + token;
  try {
    const data = await GET(dispatch, url);
    if (data.status == true) {
      dispatchAction(dispatch, "SET_OFF_SLOT", data.result);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, error.message);
  }
};

export const deleteOffSlot = (postObj) => async (dispatch) => {
  dispatch({ type: "PRE_LOADER", payload: true });

  const url = merchant_url + "/deleteOffSlot";
  try {
    const data = await POST(dispatch, url, postObj);
    if (data.status == true) {
      dispatchSuccessAction(dispatch, data.message);
      dispatchAction(dispatch, "DELETE_SLOT", postObj);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, error.message);
  }
};

export const addOffSlot = (postObj) => async (dispatch) => {
  dispatch({ type: "PRE_LOADER", payload: true });

  const url = merchant_url + "/addOffSlot";
  try {
    const data = await POST(dispatch, url, postObj);
    if (data.status == true) {
      dispatchSuccessAction(dispatch, data.message);
      dispatchAction(dispatch, "ADD_OFF_SLOT", data.result);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, error.message);
  }
};

export const getRestaurnatDetails = () => async (dispatch) => {
  let token = await getToken();
  const url = merchant_url + "/getRestaurnatDetails?auth_token=" + token;
  try {
    const data = await GET(dispatch, url);
    if (data.status == true) {
      dispatchAction(dispatch, "SET_RESTAURANT", data.result);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, error.message);
  }
};

export const updateProfile = (postObj) => async (dispatch) => {
  dispatch({ type: "PRE_LOADER", payload: true });

  const url = merchant_url + "/updateProfile";
  try {
    const data = await POST(dispatch, url, postObj);
    if (data.status == true) {
      dispatchSuccessAction(dispatch, data.message);
      dispatch(getRestaurnatDetails());
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, error.message);
  }
};

export const getDocuments = () => async (dispatch) => {
  let token = await getToken();
  const url = merchant_url + "/getDocuments?auth_token=" + token;
  try {
    const data = await GET(dispatch, url);
    if (data.status == true) {
      dispatchAction(dispatch, "SET_DOCUMENTS", data.result);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, error.message);
  }
};

export const AddDocument = (postObj, onSuccess) => async (dispatch) => {
  dispatch({ type: "PRE_LOADER", payload: true });

  const url = merchant_url + "/AddDocument";
  try {
    const data = await POST(dispatch, url, postObj);
    if (data.status == true) {
      dispatchSuccessAction(dispatch, data.message);
      onSuccess();
      dispatch(getDocuments());
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, error.message);
  }
};

export const deleteDocument = (postObj) => async (dispatch) => {
  dispatch({ type: "PRE_LOADER", payload: true });

  const url = merchant_url + "/deleteDocument";
  try {
    const data = await POST(dispatch, url, postObj);
    if (data.status == true) {
      dispatchSuccessAction(dispatch, data.message);
      dispatchAction(dispatch, "DELETE_DOCUMENT", postObj);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, error.message);
  }
};

export const changeStatus =
  (postObj, selectedStatus, onSuccess) => async (dispatch) => {
    dispatch({ type: "PRE_LOADER", payload: true });

    const url = merchant_url + "/changeStatus";
    try {
      const data = await POST(dispatch, url, postObj);
      if (data.status == true) {
        // dispatchSuccessAction(dispatch, data.message);
        onSuccess(data.message);
      } else {
        dispatchErrorAction(dispatch, data.message);
      }
    } catch (error) {
      dispatchErrorAction(dispatch, error.message);
    }
  };

export const updateNotificationSetting = (postObj) => async (dispatch) => {
  dispatch({ type: "PRE_LOADER", payload: true });

  const url = merchant_url + "/updateNotificationSetting";
  try {
    const data = await POST(dispatch, url, postObj);
    if (data.status == true) {
      dispatch(getRestaurnatDetails());
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, error.message);
  }
};

export const getNotifications = () => async (dispatch) => {
  let token = await getToken();
  let lang = await getLanguage();
  const url =
    merchant_url +
    "/getNotifications?auth_token=" +
    token +
    "&language=" +
    lang;
  try {
    const data = await GET(dispatch, url);
    if (data.status == true) {
      dispatchAction(dispatch, "SET_NOTIFICATIONS", data.result);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, error.message);
  }
};

export const dashboardSearch = (query) => async (dispatch) => {
  let token = await getToken();
  let lang = await getLanguage();
  const url =
    merchant_url +
    "/dashboardSearch?auth_token=" +
    token +
    "&query=" +
    query +
    "&language=" +
    lang;
  try {
    const data = await GET(dispatch, url);
    if (data.status == true) {
      dispatchAction(dispatch, "SET_DASHBOARD_SEARCH_DATA", data.result);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, error.message);
  }
};

export const getOrderDetail = (query, onSuccess) => async (dispatch) => {
  let token = await getToken();
  const url =
    merchant_url + "/getOrderDetails?auth_token=" + token + "&orderId=" + query;
  try {
    const data = await GET(dispatch, url);
    if (data.status == true) {
      onSuccess(data.result[0]);
      // dispatchAction(dispatch, "SET_DASHBOARD_SEARCH_DATA", data.result);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error) {
    dispatchErrorAction(dispatch, error.message);
  }
};
